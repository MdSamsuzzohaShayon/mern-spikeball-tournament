import React, { useState, useEffect } from 'react';
import { hostname, POINT, POINT_DIFFERENTIAL, SCORE, NO_SCORE, EXTRA_POINT } from '../../utils/global';
import { getTotalPPD } from '../../utils/getTotalPPD';
import AddParticipant from '../participant/AddParticipant';
import { getTotalPointOfARound, getTDRound } from '../../utils/tptd';
import { showLiftedPefrormance } from '../../utils/performance';
import { handleScoreChange, handleExtraWinningPointChange } from '../../utils/inputChange';
import { playersExtraPoint, playersPoint, playersPointDifferential, playersScore } from '../../utils/allPerformers';
import { arrangingPerformer, serializePerformer } from "../../utils/arrangePerformer";
import { tabKeyFocusChange } from '../../utils/helpers';
// import { rankingRound1, rankingRound2, rankingRound3, rankingRound4, rankingRound5 } from "../../utils/ranking";

import { Modal, Button } from 'react-bootstrap'


function SingleRound(props) {
    const initialExtra = { team: null, g: null, r: null };
    const { nets } = props.round;
    const { roundNum, rankPerformanceInNet } = props;
    // console.log("Found Round");
    // console.log(nets);



    const [isLoading, setIsLoading] = useState(false);


    const [selectedExtra, setSelectedExtra] = useState(initialExtra);
    const [winningExtraPoint, setWinningExtraPoint] = useState([]);
    const [updateScore, setUpdateScore] = useState([]);



    const [performances, setPerformances] = useState([]); // PARTICIPANTS
    const [showPerformances, setShowPerformances] = useState(true);
    const [leftedPerformance, setLeftedPerformance] = useState([]);


    // const [assignNet, setAssignNet] = useState(false);
    const [randomNet, setRandomNet] = useState(null);

    // MODAL 
    const [assignNetShow, setAssignNetShow] = useState(false);
    const handleNetClose = (e, update) => {
        // console.log("Update - ", update);
        try {

            // e.preventDefault();
            // console.log("UPdate - ", update);
            if (update === true) {
                if (randomNet === true) {
                    randomAssign();
                } else {
                    assignNetHandler();
                }
            }
            setAssignNetShow(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleNetShow = (e, random) => {
        try {
            setAssignNetShow(true);
            if (random === true) {
                setRandomNet(true);
            } else {
                setRandomNet(false);
            }
        } catch (error) {
            console.log(error);
        }
    };












    let controller = new AbortController();

    /*
    // ⛏️⛏️ GET ALL PERFORMERS FROM THIS CURRENT ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const getAllPerformance = async () => {
        try {
            // console.log("-------------------");
            const requestOptions = {
                method: 'GET',
                headers: { "Content-Type": 'application/json' },
                credentials: "include",
                signal: controller.signal
            };
            // console.log(props.eventID);
            setIsLoading(true);
            // console.log("Loading - ",isLoading);
            // console.log(r);
            const response = await fetch(`${hostname}/api/performance/get-performance/${props.eventID}/${roundNum}`, requestOptions);
            console.log("Get nets from round - ", response);
            const text = await response.text();
            const jsonRes = await JSON.parse(text);
            setPerformances([...jsonRes.rankingPerformance]);
            // console.log("JSON");
            // console.log(jsonRes);
            setIsLoading(false);
            controller = null
        } catch (error) {
            console.log(error);
        }
    }
    */







    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    // ⛏️⛏️ SETTING DEFAULT VALUE AND UNMOUNT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    useEffect(() => {
        // STYLE GOT POINT 


        console.log("Component did mount [SingleRound.jsx]");
        // console.log(props);

        // console.log(props.performances);
        setPerformances([...props.performances]);
        // IF THIS IS NOT INITIALIZEABLE
        setLeftedPerformance(props.leftRound);
        // if (!props.initialize) {
        // }
        // console.log(leftedPerformance);
        if (props.round.length === 0) {
            // getAllPerformance();
        } else {
            setShowPerformances(false);
            // setPerformances([]);
        }
        // setUpdateScore([]);
    }, []);

    useEffect(() => {
        tabKeyFocusChange();
        // window.addEventListener('beforeunload', beforeUnloadListener, { capture: true });
        // alert("hi");
        if (winningExtraPoint.length > 0 || updateScore.length > 0) {
            window.addEventListener('beforeunload', beforeUnloadListener, { capture: true });
        }
        return () => {
            console.log("Component unmount [SingleRound.jsx]");
            // window.addEventListener('unload', beforeUnloadListener, { capture: true });
        };
    });










    const beforeUnloadListener = (e) => {
        e.preventDefault();
        // alert("hi");
        // console.log("hi");
        return;
    };







    // ⛏️⛏️ SET LIST FOR WHO LEFT THE NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const leftNet = (e, pId) => {
        // console.log(e);
        // console.log(pId);
        e.preventDefault();
        setPerformances(performances.filter(p => p._id !== pId));
        setLeftedPerformance((prevState) => {
            // console.log(prevState);
            if (leftedPerformance) {
                return [...leftedPerformance, ...performances.filter(p => p._id === pId)]
            } else {
                return [...performances.filter(p => p._id === pId)]
            }
        });
    }


    const recoverLeftedPerformance = (e, pId) => {
        e.preventDefault();
        // console.log("Pid - ", pId);
        setPerformances((prevState => [...prevState, ...leftedPerformance.filter((p, i) => p._id === pId)]));
        setLeftedPerformance((prevState) => {
            // console.log("Previous state - ", prevState);
            // console.log("New State - ", newState);
            return [...prevState.filter((p, i) => p._id !== pId)]
        });
    }





    // ⛏️⛏️ ADD A PARTICIPANT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    const handleSaveParticipant = (res) => {
        try {
            const new_performance = {
                event: props.eventID,
                participant: {
                    _id: res.participant._id,
                    firstname: res.participant.firstname,
                    lastname: res.participant.lastname,
                },
                _id: res.performance._id
            }
            setPerformances([...performances, new_performance]);

        } catch (error) {
            console.log(error);
        }
    };




    // ⛏️⛏️ INITIALIZE TO NEW NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const assignNetHandler = async () => {
        // console.log("Initialize nets");
        setIsLoading(true);
        // http://localhost:4000/api/event/assign-initial-net/611c978ef047ea50e9798039
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            credentials: "include",
            body: JSON.stringify({ performances, leftedPerformance })
        };
        // console.log(props.eventID);

        const response = await fetch(`${hostname}/api/net/assign-net/${props.eventID}/${roundNum}`, requestOptions);
        console.log("Initialize net - ", response);
        props.updateNets(true);
        setIsLoading(false);
    }
    // console.log(props.nets);




    const randomAssign = async () => {
        // e.preventDefault();
        // console.log("random");
        // console.log({ performances, leftedPerformance });
        setIsLoading(true);
        // http://localhost:4000/api/event/assign-initial-net/611c978ef047ea50e9798039
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            credentials: "include",
            body: JSON.stringify({ performances, leftedPerformance })
        };
        // console.log(props.eventID);

        const response = await fetch(`${hostname}/api/net/random-assign-net/${props.eventID}/${roundNum}`, requestOptions);
        console.log("Random assign net - ", response);
        props.updateNets(true);
        setIsLoading(false);
    }







    // ⛏️⛏️ UPDATE GAME POINT AND POINT DIFERENTIAL ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const handleUpdate = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": 'application/json' },
            credentials: "include",
            body: JSON.stringify({ updateScore, winningExtraPoint })
        };
        // console.log(props.eventID);


        // console.log(props.round._id);


        const response = await fetch(`${hostname}/api/performance/update-performance/${props.eventID}/${roundNum}`, requestOptions);
        console.log("Update - ", response);
        setUpdateScore([]);
        props.updateNets(true);
    }















    const addExtra = (e, team, g, r) => {
        // E = EVENT, PID = PREFORMANCE ID, G = GAME, R = ROUND, TID = TEAM ID
        setSelectedExtra({ team, g, r });
    }

    const showInput = (team, g, r) => {
        // console.log("extra - ", selectedExtra);
        if (selectedExtra.team) {
            if (team[0] === selectedExtra.team[0] && g === selectedExtra.g && r === selectedExtra.r) {
                // console.log(selectedExtra);
                // console.log(team);
                return "block";
            } else {
                return "none";
            }
        }
        return "none";
    }






    const toggleGameParticipant = (e) => {
        e.preventDefault();
        setShowPerformances(prevState => !prevState);
    }










    // ⛏️⛏️ THIS IS MAIN RETURN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    return (
        <div className="SingleRound">
            <div className="d-flex align-items-center">
                <div className="d-flex my-3 justify-content-between w-full">
                    <div className="">
                        {roundNum === 1 ? <React.Fragment>
                            <button className="btn btn-primary" onClick={e => handleNetShow(e, true)} >Random Assign</button>
                        </React.Fragment> : <React.Fragment>
                            {props.initialize && <button className="btn btn-primary" onClick={assignNetHandler} >Assign Nets</button>}
                            {!props.initialize && <button className="btn btn-primary mx-3" onClick={e => handleNetShow(e, false)} >Rank Assign</button>}
                            <button className="btn btn-primary" onClick={e => handleNetShow(e, true)} >Random Assign</button>
                        </React.Fragment>}
                    </div>

                    <div className="btn-group">
                        {showPerformances === true ? <button onClick={toggleGameParticipant} className="btn btn-primary" >Participants</button> : <button onClick={toggleGameParticipant} className="btn btn-light" >Participants</button>}
                        {showPerformances === true ? <button onClick={toggleGameParticipant} className="btn btn-light" >Game</button> : <button onClick={toggleGameParticipant} className="btn btn-primary" >Game</button>}
                    </div>
                </div>



                <Modal show={assignNetShow} onHide={handleNetClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Report score</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Did you report any score in this round?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={e => handleNetClose(e, false)}>
                            Yes
                        </Button>
                        <Button variant="primary" onClick={e => handleNetClose(e, true)}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div>
            {showPerformances ? (<React.Fragment>
                {isLoading ? (
                    <div className="text-center spinner-parent">
                        <div className="spinner-border text-danger spinner-child" role="status">
                        </div>
                    </div>
                ) : (<React.Fragment>
                    <h2 className="h2">All players in the tournament</h2>
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Ranking</th>
                                <th scope="col">Point</th>
                                <th scope="col">Point Diferential</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {performances && performances.map((p, i) => (<tr key={i} >
                                <td>{p.participant.firstname + " " + p.participant.lastname}</td>
                                <td>{i + 1}</td>
                                {getTotalPointOfARound(p, roundNum) ? <td>{getTotalPointOfARound(p, roundNum).toFixed(2)}</td> : <td></td>}
                                {getTDRound(p, roundNum) ? <React.Fragment>
                                    {Math.sign(getTDRound(p, roundNum)) === -1 ? <td className="text-danger">{getTDRound(p, roundNum).toFixed(2)}</td> : <td className="text-success">{getTDRound(p, roundNum).toFixed(2)}</td>}
                                </React.Fragment> : <td></td>}
                                <td><button className="btn btn-danger" onClick={e => leftNet(e, p._id)}>Left</button></td>
                            </tr>))}
                        </tbody>
                    </table>
                    <br /><br />
                </React.Fragment>)}
                {showLiftedPefrormance(leftedPerformance, roundNum, recoverLeftedPerformance, true)}
                <br />
                <br />

                <AddParticipant
                    roundNum={roundNum}
                    eventID={props.eventID}
                    handleSaveParticipant={handleSaveParticipant}
                />

            </React.Fragment>) : (
                <div className="show table">
                    {isLoading ? (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    ) : (
                        <div className="nets-table-wrapper">
                            <div className="show-all-nets">
                                {!props.initialize && (<React.Fragment>
                                    {/* PLAYER GAME, SCORE, POINT, POINT DIFFRENTIAL  */}
                                    <div className="table-responsive left-table mx-0 px-0">
                                        <table className="table r-table table-bordered table-striped">
                                            <thead className="r-thead bg-dark text-light text-center">
                                                <tr>
                                                    <th colSpan="1" scope="colgroup"></th>
                                                    <th colSpan="5" scope="colgroup">Game {props.game[0]}</th>
                                                    <th colSpan="5" scope="colgroup">Game {props.game[1]}</th>
                                                    <th colSpan="5" scope="colgroup">Game {props.game[2]}</th>
                                                    <th colSpan="3" scope="colgroup">Total</th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">Net</th>

                                                    <th scope="col">Team</th>
                                                    <th scope="col">Score</th>
                                                    <th scope="col"><button type="button" className="btn btn-secondary p-0 m-0 bg-transparent text-white border-0 btn-outline-transparent" data-bs-toggle="tooltip" data-bs-placement="top" title="Winning point" onClick={e => e.preventDefault()}>W/P</button></th>
                                                    <th scope="col">Point</th>
                                                    <th scope="col">point differential</th>


                                                    <th scope="col">Team</th>
                                                    <th scope="col">Score</th>
                                                    <th scope="col"><button type="button" className="btn btn-secondary p-0 m-0 bg-transparent text-white border-0 btn-outline-transparent" data-bs-toggle="tooltip" data-bs-placement="top" title="Winning point" onClick={e => e.preventDefault()}>W/P</button></th>
                                                    <th scope="col">Point</th>
                                                    <th scope="col">point differential</th>


                                                    <th scope="col">Team</th>
                                                    <th scope="col">Score</th>
                                                    <th scope="col"><button type="button" className="btn btn-secondary p-0 m-0 bg-transparent text-white border-0 btn-outline-transparent" data-bs-toggle="tooltip" data-bs-placement="top" title="Winning point" onClick={e => e.preventDefault()}>W/P</button></th>
                                                    <th scope="col">Point</th>
                                                    <th scope="col">point differential</th>





                                                    <th scope="col">Participant</th>
                                                    <th scope="col">point</th>
                                                    <th scope="col">point differential</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {nets && nets.map((net, i) => (
                                                    <tr key={i} className="horizontal-border">
                                                        <th scope="row">Net {net.sl || i + 1}</th>
                                                        {/* {console.log("net performance - ", net.performance)} */}

                                                        <td>{arrangingPerformer(net.performance, 1, props.game[0], POINT_DIFFERENTIAL, roundNum)} </td>
                                                        {/* SCORE  */}
                                                        <td >{playersScore(net, props.game[0], SCORE, 1, handleScoreChange, roundNum, updateScore, setUpdateScore)} </td>
                                                        <td >{playersExtraPoint(net, props.game[0], EXTRA_POINT, 1, handleExtraWinningPointChange, addExtra, showInput, roundNum, winningExtraPoint, setWinningExtraPoint)} </td>
                                                        <td >{playersPoint(net, props.game[0], POINT, 1, roundNum)} </td>

                                                        <td>{playersPointDifferential(net, props.game[0], POINT_DIFFERENTIAL, 1, roundNum)}</td>







                                                        <td>{arrangingPerformer(net.performance, 2, props.game[1], POINT_DIFFERENTIAL, roundNum)} </td>
                                                        {/* SCORE  */}
                                                        <td >{playersScore(net, props.game[1], SCORE, 2, handleScoreChange, roundNum, updateScore, setUpdateScore)} </td>
                                                        <td >{playersExtraPoint(net, props.game[1], EXTRA_POINT, 2, handleExtraWinningPointChange, addExtra, showInput, roundNum, winningExtraPoint, setWinningExtraPoint)} </td>
                                                        <td >{playersPoint(net, props.game[1], POINT, 2, roundNum)} </td>
                                                        <td>{playersPointDifferential(net, props.game[1], POINT_DIFFERENTIAL, 2, roundNum)}</td>






                                                        <td>{arrangingPerformer(net.performance, 3, props.game[2], POINT_DIFFERENTIAL, roundNum)} </td>
                                                        {/* SCORE  */}
                                                        <td >{playersScore(net, props.game[2], SCORE, 3, handleScoreChange, roundNum, updateScore, setUpdateScore)} </td>
                                                        <td >{playersExtraPoint(net, props.game[2], EXTRA_POINT, 3, handleExtraWinningPointChange, addExtra, showInput, roundNum, winningExtraPoint, setWinningExtraPoint)} </td>
                                                        <td >{playersPoint(net, props.game[2], POINT, 3, roundNum)} </td>
                                                        <td>{playersPointDifferential(net, props.game[2], POINT_DIFFERENTIAL, 3, roundNum)}</td>






                                                        <td> {serializePerformer(rankPerformanceInNet[i])} </td>
                                                        <td >  {getTotalPPD(rankPerformanceInNet[i], POINT, roundNum)} </td>
                                                        <td >{getTotalPPD(rankPerformanceInNet[i], POINT_DIFFERENTIAL, roundNum)} </td>



                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </React.Fragment>
                                )}
                            </div>
                            <button onClick={handleUpdate} className="btn btn-primary">Submit</button>
                        </div>
                    )}


                    {showLiftedPefrormance(leftedPerformance, roundNum, null, false)}
                </div>
            )}
            <br />

        </div>
    )
}

export default SingleRound;




