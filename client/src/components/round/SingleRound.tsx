// @ts-nocheck

import React, { useRef, useState, useEffect } from "react";
import {
  hostname,
  POINT,
  POINT_DIFFERENTIAL,
  SCORE,
} from "../../utils/global";
import Loader from "../elements/Loader";
import { getTotalPPD } from "../../utils/getTotalPPD";
import AddParticipant from "../participant/AddParticipant";
import {
  getTotalPointOfARound,
  getTDRound,
} from "../../utils/tptd";
import { showLiftedPefrormance } from "../../utils/performance";
import {
  handleScoreChange,
  handleExtraWinningPointChange,
} from "../../utils/inputChange";
import {
  playersExtraPoint,
  playersPoint,
  playersPointDifferential,
  playersScore,
} from "../../utils/allPerformers";
import {
  arrangingPerformer,
  serializePerformer,
} from "../../utils/arrangePerformer";
import { tabKeyFocusChange } from "../../utils/helpers";
import { AgGridReact } from "ag-grid-react";
import { Modal, Button, ToastBody } from "react-bootstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CustomCellRenderer from "./CustomCellRenderer";

const RANK_ASSIGN = "RANK_ASSIGN",
  PRERANK_ASSIGN = "PRERANK_ASSIGN",
  PACK_ASSIGN = "PACK_ASSIGN";

function SingleRound(props) {
  const { nets } = props.round;
  const { roundNum, rankPerformanceInNet } = props;

  const [parent, setParent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateScore, setUpdateScore] = useState([]);
  const [performances, setPerformances] = useState([]); // PARTICIPANTS
  const [showPerformances, setShowPerformances] = useState(true);
  const [leftedPerformance, setLeftedPerformance] = useState([]);
  const [token, setToken] = useState<string | null>(null)


  const gridRef = useRef();

  const [assignType, setAssignType] = useState(null);

  // SMS ON ASSIGN NET
  const [openSMS, setOpenSMS] = useState(false);
  const [negativeSMS, setNegativeSMS] = useState(false);

  // MODAL
  const [assignNetShow, setAssignNetShow] = useState(false);
  const handleNetClose = (e, update) => {
    try {
      setOpenSMS(true);
      if (update === true) {
        setNegativeSMS(false);
        switch (assignType) {
          case RANK_ASSIGN:
            assignNetHandler();
            break;
          case PRERANK_ASSIGN:
            Assign();
            break;
          case PACK_ASSIGN:
            packAssign();
            break;
          default:
            break;
        }
      } else {
        setNegativeSMS(true);
      }
      setAssignNetShow(false);
    } catch (error) {
      console.log(error);
    }
  };


  const listener = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleUpdate(e);
    }
  };

  // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  // ⛏️⛏️ SETTING DEFAULT VALUE AND UNMOUNT
  useEffect(() => {
    // STYLE GOT POINT

    const t = localStorage.getItem("token");
    if(t){
      setToken(t);
    }
    setPerformances([...props.performances]);
    // IF THIS IS NOT INITIALIZEABLE
    setLeftedPerformance(props.leftRound);
    if (props.round.length === 0) {
    } else {
      setShowPerformances(false);
    }
    setTimeout(() => {
      tabKeyFocusChange();
    }, 1000);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", listener);
    return () => {
      console.log("Component unmount [SingleRound.jsx]");
      document.removeEventListener("keydown", listener);
    };
  });

  
  useEffect(() => {
    let timer;
    if (openSMS === true) {
      timer = setTimeout(() => {
        setOpenSMS(false);
        setNegativeSMS(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [assignNetShow, openSMS, negativeSMS]);

  // ⛏️⛏️ SET LIST FOR WHO LEFT THE NET
  const leftNet = (e, pId) => {
    e.preventDefault();
    setPerformances(performances.filter((p) => p._id !== pId));
    setLeftedPerformance((prevState) => {
      if (leftedPerformance) {
        return [
          ...leftedPerformance,
          ...performances.filter((p) => p._id === pId),
        ];
      } else {
        return [...performances.filter((p) => p._id === pId)];
      }
    });
  };

  const recoverLeftedPerformance = (e, pId) => {
    e.preventDefault();
    setPerformances((prevState) => [
      ...prevState,
      ...leftedPerformance.filter((p, i) => p._id === pId),
    ]);
    setLeftedPerformance((prevState) => {
      return [...prevState.filter((p, i) => p._id !== pId)];
    });
  };

  // ⛏️⛏️ ADD A PARTICIPANT
  const handleSaveParticipant = (res) => {
    try {
      const new_performance = {
        event: props.eventID,
        participant: {
          _id: res.participant._id,
          firstname: res.participant.firstname,
          lastname: res.participant.lastname,
        },
        _id: res.performance._id,
      };
      setPerformances([...performances, new_performance]);
    } catch (error) {
      console.log(error);
    }
  };

  // ⛏️⛏️ INITIALIZE TO NEW NET
  const assignNetHandler = async () => {
    setIsLoading(true);
    try {
      // http://localhost:4000/api/event/assign-initial-net/611c978ef047ea50e9798039
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ performances, leftedPerformance }),
      };

      const response = await fetch(
        `${hostname}/api/net/assign-net/${props.eventID}/${roundNum}`,
        requestOptions
      );
      console.log("Initialize net - ", response);
      props.updateNets(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };


  const Assign = async () => {
    let result = [];
    console.log("Game Rule");
    const { api, columnApi } = gridRef.current || {};
    if (api == null || columnApi == null) {
      return;
    }
    console.log("api: ", api.getModel().rowsToDisplay);
    //access the Grid API
    const data = api?.getModel()?.rowsToDisplay;
    data.forEach((node) => {
      let rowNode = node?.data;
      let rowData = performances.find((one) => one?._id === rowNode?._id);
      result.push(rowData);
    });
    setIsLoading(true);
    try {
      // http://localhost:4000/api/event/assign-initial-net/611c978ef047ea50e9798039
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json",  "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ performances: result, leftedPerformance }),
      };
      const assignUrls = [
        "pre-rank-assign-net",
        "assign-net",
        "twoU-twoD-assign-net",
        "oneU-oneD-assign-net",
        "oneU-oneD-assign-net",
      ];
      console.log(props.eventID);

      const response = await fetch(
        `${hostname}/api/net/${assignUrls[roundNum - 1]}/${
          props.eventID
        }/${roundNum}`,
        requestOptions
      );
      console.log("Random assign net - ", response);
      props.updateNets(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const packAssign = async () => {
    setIsLoading(true);
    try {
      // http://localhost:4000/api/event/assign-initial-net/611c978ef047ea50e9798039

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json",  "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ performances, leftedPerformance }),
      };

      const response = await fetch(
        `${hostname}/api/net/pack-assign-net/${props.eventID}/${roundNum}`,
        requestOptions
      );

      console.log("Pack assign net - ", response);
      props.updateNets(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  // ⛏️⛏️ UPDATE GAME POINT AND POINT DIFERENTIAL
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json",  "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ updateScore }),
      };
      const response = await fetch(
        `${hostname}/api/performance/update-performance/${props.eventID}/${roundNum}`,
        requestOptions
      );
      console.log("Update - ", response);
      setUpdateScore([]);
      props.updateNets(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextRound = async (e) => {
    e.preventDefault();
    try {
      props.activeItemHandler(e, roundNum + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleGameParticipant = (e) => {
    e.preventDefault();
    setShowPerformances((prevState) => !prevState);
  };

  const showMessage = () => {
    if (assignNetShow === false && openSMS === true) {
      if (negativeSMS === true) {
        return (
          <div className="alert alert-danger">
            You can't reassign once the score is inputed
          </div>
        );
      } else {
        return (
          <div className="alert alert-success">
            You can't reassign once the score is inputed
          </div>
        );
      }
    }
    return null;
  };
  const columnDefs = [
    { field: "_id", hide: true },
    { field: "Name", width: 280 },
    {
      field: "Ranking",
      cellRenderer: roundNum <= 1 && CustomCellRenderer,
    },
    { field: "Point" },
    { field: "Point Diffential" },
    {
      field: "Action",
      cellRenderer: (params) => {
        return params.value;
      },
    },
  ];
  //drag event
  const ondragend = (e) => {
    console.log(e);
  };

  const processPerformanceData = (data) => {
    let rowData = [];
    data.forEach((one, index) => {
      let row = {};
      row._id = one._id;
      row.Name = `${one.participant.firstname} ${one.participant.lastname}`;
      row.Ranking = index + 1; //getRankingNumber(index, performances, roundNum);
      row.Point = getTotalPointOfARound(one, roundNum)
        ? getTotalPointOfARound(one, roundNum).toFixed(2)
        : "";
      row["Point Diffential"] = getTDRound(one, roundNum)
        ? Math.sign(getTDRound(one, roundNum)) === -1
          ? getTDRound(one, roundNum).toFixed(2)
          : getTDRound(one, roundNum).toFixed(2)
        : "";
      row.Action = (
        <button className="btn btn-danger" onClick={(e) => leftNet(e, one._id)}>
          Left
        </button>
      );
      rowData.push(row);
    });
    
    return rowData;
  };

  const assignBtnNames = [
    "Assign",
    "Assign",
    "2 Up 2 Down",
    "1 Up 1 Down",
    "1 Up 1 Down",
  ];


  // ⛏️⛏️ THIS IS MAIN RETURN
  return (
    <div className="SingleRound">
      <div className="all-btns-message-modal">
        <div className="rank-n-group my-3 w-full">
          <div>
              <button
                className="btn btn-primary"
                disabled={!showPerformances}
                onClick={(e) => {
                  Assign();
                }}
              >
                {assignBtnNames[roundNum - 1]}
              </button>
          </div>

          <div className="btn-group">
            {showPerformances === true ? (
              <button
                onClick={toggleGameParticipant}
                className="btn btn-primary"
              >
                Participants
              </button>
            ) : (
              <button onClick={toggleGameParticipant} className="btn btn-light">
                Participants
              </button>
            )}
            {showPerformances === true ? (
              <button onClick={toggleGameParticipant} className="btn btn-light">
                Game
              </button>
            ) : (
              <button
                onClick={toggleGameParticipant}
                className="btn btn-primary"
              >
                Game
              </button>
            )}
          </div>
        </div>

        {showMessage()}

        <Modal show={assignNetShow} onHide={handleNetClose}>
          <Modal.Header closeButton>
            <Modal.Title>Report score</Modal.Title>
          </Modal.Header>
          <Modal.Body>Did you report any score in this round?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) => handleNetClose(e, false)}
            >
              Yes
            </Button>
            <Button variant="primary" onClick={(e) => handleNetClose(e, true)}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {showPerformances ? (
        <React.Fragment>
          {isLoading ? (
            <Loader />
          ) : (
            <React.Fragment>
              <h2 className="h2">All players in the tournament</h2>
              <div className="ag-theme-alpine" style={{ height: "600px" }}>
                <AgGridReact
                  ref={gridRef}
                  columnDefs={columnDefs}
                  rowDragManaged={true}
                  animateRows={true}
                  onRowDragEnd={ondragend}
                  rowData={processPerformanceData(performances)}
                  pagination={false}
                />
              </div>
              <br />
              <br />
            </React.Fragment>
          )}
          {showLiftedPefrormance(
            leftedPerformance,
            roundNum,
            recoverLeftedPerformance,
            true
          )}
          <br />
          <br />
          <AddParticipant
            roundNum={roundNum}
            eventID={props.eventID}
            handleSaveParticipant={handleSaveParticipant}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {!props.initialize && (
            <div className="submit-btn-wrap">
              <div className="submit-btn">
                <button onClick={handleUpdate} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <div className="nets-table-wrapper">
              <div className="show-all-nets">
                {!props.initialize && (
                  <React.Fragment>
                    {/* PLAYER GAME, SCORE, POINT, POINT DIFFRENTIAL  */}
                    <div className="table-responsive-lg net-table">
                      <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                          <tr className="header-group-1">
                            <th colSpan="2" scope="colgroup"></th>
                            <th colSpan="4" scope="colgroup">
                              Game {props.game[0]}
                            </th>
                            <th colSpan="4" scope="colgroup">
                              Game {props.game[1]}
                            </th>
                            <th colSpan="4" scope="colgroup">
                              Game {props.game[2]}
                            </th>
                            <th colSpan="3" scope="colgroup">
                              Total
                            </th>
                          </tr>
                          <tr className="header-group-2">
                            <th scope="col">Net</th>
                            <th>
                              <button
                                type="button"
                                className="btn btn-secondary p-0 m-0 bg-transparent text-white border-0 btn-outline-transparent"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Winning point"
                                onClick={(e) => e.preventDefault()}
                              >
                                W/P
                              </button>
                            </th>
                            <th scope="col">Team</th>
                            <th scope="col">Score</th>
                            <th scope="col">Point</th>
                            <th scope="col">point differential</th>
                            <th scope="col">Team</th>
                            <th scope="col">Score</th>
                            <th scope="col">Point</th>
                            <th scope="col">point differential</th>
                            <th scope="col">Team</th>
                            <th scope="col">Score</th>
                            <th scope="col">Point</th>
                            <th scope="col">point differential</th>
                            <th scope="col">Participant</th>
                            <th scope="col">point</th>
                            <th scope="col">point differential</th>
                          </tr>
                        </thead>
                        <tbody>
                          {nets &&
                            nets.map((net, i) => (
                              <tr key={i} className="horizontal-border">
                                <th scope="row">Net {net.sl || i + 1}</th>
                                <td>
                                  {playersExtraPoint(
                                    net,
                                    handleExtraWinningPointChange,
                                    roundNum,
                                    updateScore,
                                    setUpdateScore,
                                    net.wp
                                  )}
                                </td>

                                <td>
                                  {arrangingPerformer(
                                    net.performance,
                                    1,
                                    props.game[0],
                                    POINT_DIFFERENTIAL,
                                    roundNum
                                  )}
                                </td>
                                {/* SCORE  */}
                                <td>
                                  {playersScore(
                                    net,
                                    props.game[0],
                                    SCORE,
                                    1,
                                    handleScoreChange,
                                    roundNum,
                                    updateScore,
                                    setUpdateScore
                                  )}
                                </td>
                                <td>
                                  {playersPoint(
                                    net,
                                    props.game[0],
                                    POINT,
                                    1,
                                    roundNum
                                  )}
                                </td>
                                <td>
                                  {playersPointDifferential(
                                    net,
                                    props.game[0],
                                    POINT_DIFFERENTIAL,
                                    1,
                                    roundNum
                                  )}
                                </td>
                                <td>
                                  {arrangingPerformer(
                                    net.performance,
                                    2,
                                    props.game[1],
                                    POINT_DIFFERENTIAL,
                                    roundNum
                                  )}
                                </td>
                                {/* SCORE  */}
                                <td>
                                  {playersScore(
                                    net,
                                    props.game[1],
                                    SCORE,
                                    2,
                                    handleScoreChange,
                                    roundNum,
                                    updateScore,
                                    setUpdateScore
                                  )}
                                </td>
                                <td>
                                  {playersPoint(
                                    net,
                                    props.game[1],
                                    POINT,
                                    2,
                                    roundNum
                                  )}
                                </td>
                                <td>
                                  {playersPointDifferential(
                                    net,
                                    props.game[1],
                                    POINT_DIFFERENTIAL,
                                    2,
                                    roundNum
                                  )}
                                </td>
                                <td>
                                  {arrangingPerformer(
                                    net.performance,
                                    3,
                                    props.game[2],
                                    POINT_DIFFERENTIAL,
                                    roundNum
                                  )}
                                </td>
                                {/* SCORE  */}
                                <td>
                                  {playersScore(
                                    net,
                                    props.game[2],
                                    SCORE,
                                    3,
                                    handleScoreChange,
                                    roundNum,
                                    updateScore,
                                    setUpdateScore
                                  )}
                                </td>
                                <td>
                                  {playersPoint(
                                    net,
                                    props.game[2],
                                    POINT,
                                    3,
                                    roundNum
                                  )}
                                </td>
                                <td>
                                  {playersPointDifferential(
                                    net,
                                    props.game[2],
                                    POINT_DIFFERENTIAL,
                                    3,
                                    roundNum
                                  )}
                                </td>
                                <td>
                                  
                                  {serializePerformer(
                                    rankPerformanceInNet[i]
                                  )}
                                </td>
                                <td>
                                  
                                  {getTotalPPD(
                                    rankPerformanceInNet[i],
                                    POINT,
                                    roundNum
                                  )}
                                </td>
                                <td>
                                  {getTotalPPD(
                                    rankPerformanceInNet[i],
                                    POINT_DIFFERENTIAL,
                                    roundNum
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          )}
          {roundNum <= 4 && (
            <>
              {props.incomepleteMessage !== null && (
                <div className="alert alert-danger mt-3">
                  {props.incomepleteMessage}
                </div>
              )}
              <div className="text-md-center">
                
                <button onClick={handleNextRound} className="btn btn-warning">
                  Next Round
                </button>
              </div>
            </>
          )}
          <div className="show table">
            {showLiftedPefrormance(leftedPerformance, roundNum, null, false)}
          </div>
        </React.Fragment>
      )}
      <br />
    </div>
  );
  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }
}

export default SingleRound;
