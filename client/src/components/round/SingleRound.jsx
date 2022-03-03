import React, { useState, useEffect, useLayoutEffect } from 'react';
import { hostname, POINT, POINT_DIFFERENTIAL, SCORE, NO_SCORE, EXTRA_POINT } from '../../utils/global';
import Loader from '../elements/Loader';
import { getTotalPPD } from '../../utils/getTotalPPD';
import AddParticipant from '../participant/AddParticipant';
import { getTotalPointOfARound, getTDRound, getRankingNumber } from '../../utils/tptd';
import { showLiftedPefrormance } from '../../utils/performance';
import { handleScoreChange, handleExtraWinningPointChange } from '../../utils/inputChange';
import { playersExtraPoint, playersPoint, playersPointDifferential, playersScore } from '../../utils/allPerformers';
import { arrangingPerformer, serializePerformer } from "../../utils/arrangePerformer";
import { tabKeyFocusChange } from '../../utils/helpers';
// import { rankingRound1, rankingRound2, rankingRound3, rankingRound4, rankingRound5 } from "../../utils/ranking";

import { Modal, Button } from 'react-bootstrap';


const RANK_ASSIGN = "RANK_ASSIGN", RANDOM_ASSIGN = "RANDOM_ASSIGN", PACK_ASSIGN = "PACK_ASSIGN";



function SingleRound(props) {
    const { nets } = props.round;
    const { roundNum, rankPerformanceInNet } = props;
    // console.log("Found Round");
    // console.log(nets);



    const [isLoading, setIsLoading] = useState(false);


    const [updateScore, setUpdateScore] = useState([]);



    const [performances, setPerformances] = useState([]); // PARTICIPANTS
    const [showPerformances, setShowPerformances] = useState(true);
    const [leftedPerformance, setLeftedPerformance] = useState([]);


    // const [assignNet, setAssignNet] = useState(false);
    const [assignType, setAssignType] = useState(null);


    // SMS ON ASSIGN NET 
    const [openSMS, setOpenSMS] = useState(false);
    const [negativeSMS, setNegativeSMS] = useState(false);

    // MODAL 
    const [assignNetShow, setAssignNetShow] = useState(false);
    const handleNetClose = (e, update) => {
        // console.log("Update - ", update);
        try {

            // e.preventDefault();
            // console.log("UPdate - ", update);
            setOpenSMS(true);
            if (update === true) {
                setNegativeSMS(false);
                // if (randomNet === true) {
                //     randomAssign();
                // } else {
                //     assignNetHandler();
                // }


                switch (assignType) {
                    case RANK_ASSIGN:
                        assignNetHandler();
                        break;
                    case RANDOM_ASSIGN:
                        randomAssign();
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
    const handleNetShow = (e, getAssignType) => {
        try {
            setAssignNetShow(true);
            setAssignType(getAssignType);
        } catch (error) {
            console.log(error);
        }
    };












    const listener = e => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            // e.preventDefault();
            // console.log("Enter key was pressed. Run your function.");
            handleUpdate(e);
            // callMyFunction();
        }
    };







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
        setTimeout(() => {
            tabKeyFocusChange();
        }, 1000);
        // setUpdateScore([]);
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", listener);
        // // window.addEventListener('beforeunload', beforeUnloadListener, { capture: true });
        // // alert("hi");
        // if (winningExtraPoint.length > 0 || updateScore.length > 0) {
        //     window.addEventListener('beforeunload', beforeUnloadListener, { capture: true });
        // }
        return () => {
            console.log("Component unmount [SingleRound.jsx]");
            document.removeEventListener("keydown", listener);
            // window.addEventListener('unload', beforeUnloadListener, { capture: true });
        };
    });
    // useLayoutEffect(() => {
    //     tabKeyFocusChange();
    // }, []);



    useEffect(() => {
        let timer;
        if (openSMS === true) {
            timer = setTimeout(() => {
                setOpenSMS(false);
                setNegativeSMS(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [assignNetShow, openSMS, negativeSMS])


















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
        // handleNetShow(e, true);

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



    const packAssign = async () => {
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
        // // console.log(props.eventID);

        const response = await fetch(`${hostname}/api/net/pack-assign-net/${props.eventID}/${roundNum}`, requestOptions);

        console.log("Pack assign net - ", response);
        props.updateNets(true);
        setIsLoading(false);
    }







    // ⛏️⛏️ UPDATE GAME POINT AND POINT DIFERENTIAL ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { "Content-Type": 'application/json' },
                credentials: "include",
                body: JSON.stringify({ updateScore })
            };
            // console.log(props.eventID);


            // console.log(props.round._id);


            const response = await fetch(`${hostname}/api/performance/update-performance/${props.eventID}/${roundNum}`, requestOptions);
            console.log("Update - ", response);
            setUpdateScore([]);
            props.updateNets(true);
        } catch (error) {
            console.log(error);
        }
    }




    const handleNextRound = async (e) => {
        e.preventDefault();
        try {
            props.activeItemHandler(e, roundNum + 1);
        } catch (error) {
            console.log(error);
        }
    }
















    const toggleGameParticipant = (e) => {
        e.preventDefault();
        setShowPerformances(prevState => !prevState);
    }






    {/* <button onClick={handleUpdate} onKeyPress={handleKeyPress} className="btn btn-primary sticky-top align-items-start justify-content-start">Submit</button> */ }


    const showMessage = () => {
        // {assignNetShow === false && <div className="alert alert-success">You can't reassign once the score is inputed</div> }
        if (assignNetShow === false && openSMS === true) {
            if (negativeSMS === true) {
                return <div className="alert alert-danger">You can't reassign once the score is inputed</div>;
            } else {
                return <div className="alert alert-success">You can't reassign once the score is inputed</div>
            }
        }
        return null;
    }

    // ⛏️⛏️ THIS IS MAIN RETURN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    return (
        <div className="SingleRound">


            <div className="all-btns-message-modal">
                <div className="rank-n-group my-3 w-full">
                    <div >
                        {roundNum === 1 ? <React.Fragment>
                            <button className="btn btn-primary" onClick={e => handleNetShow(e, RANDOM_ASSIGN)} >Random Assign</button>
                        </React.Fragment> : <React.Fragment>
                            <button className="btn btn-primary" onClick={e => handleNetShow(e, RANK_ASSIGN)} >Rank Assign</button>
                            {/* {!props.initialize && <button className="btn btn-primary" onClick={e => handleNetShow(e, false)} >Rank Assign</button>} */}
                            <button className="btn btn-primary" onClick={e => handleNetShow(e, RANDOM_ASSIGN)} >Random Assign</button>
                            {roundNum > 1 && <button className="btn btn-primary" onClick={e => handleNetShow(e, PACK_ASSIGN)} >Pack Assign</button>}
                        </React.Fragment>}
                    </div>

                    <div className="btn-group">
                        {showPerformances === true ? <button onClick={toggleGameParticipant} className="btn btn-primary" >Participants</button> : <button onClick={toggleGameParticipant} className="btn btn-light" >Participants</button>}
                        {showPerformances === true ? <button onClick={toggleGameParticipant} className="btn btn-light" >Game</button> : <button onClick={toggleGameParticipant} className="btn btn-primary" >Game</button>}
                    </div>
                </div>

                {showMessage()}



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
                {isLoading ? <Loader /> : (<React.Fragment>
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
                                <td>{getRankingNumber(i, performances, roundNum)}</td>
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



            </React.Fragment>) : (<React.Fragment>
                {!props.initialize && <div className="submit-btn-wrap">
                    <div className="submit-btn">
                        <button onClick={handleUpdate} className="btn btn-primary">Submit</button>
                        {/* <div className="btn-group">
                            <button onClick={handleNextRound} className="btn btn-primary">Next Round</button>
                        </div> */}
                    </div>
                </div>}

                {isLoading ? <Loader /> : (
                    <div className="nets-table-wrapper">
                        <div className="show-all-nets">
                            {!props.initialize && (<React.Fragment>
                                {/* PLAYER GAME, SCORE, POINT, POINT DIFFRENTIAL  */}
                                <div className="table-responsive-lg net-table">
                                    <table className="table table-striped table-bordered">
                                        <thead className="table-dark">
                                            <tr className="header-group-1">
                                                <th colSpan="2" scope="colgroup"></th>
                                                <th colSpan="4" scope="colgroup">Game {props.game[0]}</th>
                                                <th colSpan="4" scope="colgroup">Game {props.game[1]}</th>
                                                <th colSpan="4" scope="colgroup">Game {props.game[2]}</th>
                                                <th colSpan="3" scope="colgroup">Total</th>
                                            </tr>
                                            <tr className="header-group-2">
                                                <th scope="col">Net</th>
                                                <th><button type="button" className="btn btn-secondary p-0 m-0 bg-transparent text-white border-0 btn-outline-transparent" data-bs-toggle="tooltip" data-bs-placement="top" title="Winning point" onClick={e => e.preventDefault()}>W/P</button></th>

                                                <th scope="col">Team</th>
                                                <th scope="col">Score</th>
                                                {/* <th scope="col"><button type="button" className="btn btn-secondary p-0 m-0 bg-transparent text-white border-0 btn-outline-transparent" data-bs-toggle="tooltip" data-bs-placement="top" title="Winning point" onClick={e => e.preventDefault()}>W/P</button></th> */}
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
                                            {nets && nets.map((net, i) => (
                                                <tr key={i} className="horizontal-border">
                                                    <th scope="row">Net {net.sl || i + 1}</th>
                                                    {/* {console.log(net)} */}
                                                    <td >{playersExtraPoint(net, handleExtraWinningPointChange, roundNum, updateScore, setUpdateScore, net.wp)} </td>
                                                    {/* {console.log("net performance - ", net.performance)} */}

                                                    <td>{arrangingPerformer(net.performance, 1, props.game[0], POINT_DIFFERENTIAL, roundNum)} </td>
                                                    {/* SCORE  */}
                                                    <td >{playersScore(net, props.game[0], SCORE, 1, handleScoreChange, roundNum, updateScore, setUpdateScore)} </td>
                                                    <td >{playersPoint(net, props.game[0], POINT, 1, roundNum)} </td>

                                                    <td>{playersPointDifferential(net, props.game[0], POINT_DIFFERENTIAL, 1, roundNum)}</td>







                                                    <td>{arrangingPerformer(net.performance, 2, props.game[1], POINT_DIFFERENTIAL, roundNum)} </td>
                                                    {/* SCORE  */}
                                                    <td >{playersScore(net, props.game[1], SCORE, 2, handleScoreChange, roundNum, updateScore, setUpdateScore)} </td>
                                                    <td >{playersPoint(net, props.game[1], POINT, 2, roundNum)} </td>
                                                    <td>{playersPointDifferential(net, props.game[1], POINT_DIFFERENTIAL, 2, roundNum)}</td>






                                                    <td>{arrangingPerformer(net.performance, 3, props.game[2], POINT_DIFFERENTIAL, roundNum)} </td>
                                                    {/* SCORE  */}
                                                    <td >{playersScore(net, props.game[2], SCORE, 3, handleScoreChange, roundNum, updateScore, setUpdateScore)} </td>
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
                    </div>
                )}
                {roundNum <= 4 && <>
                    {props.incomepleteMessage !== null && <div className='alert alert-danger mt-3'>{props.incomepleteMessage}</div>}
                    <div className="text-md-center"> <button onClick={handleNextRound} className="btn btn-warning">Next Round</button> </div>
                </>}
                <div className="show table">
                    {showLiftedPefrormance(leftedPerformance, roundNum, null, false)}
                </div>
            </React.Fragment>
            )}
            <br />

        </div>
    )
}

export default SingleRound;




