import React, { useState, useEffect } from 'react';
import { hostname, POINT, POINT_DIFFERENTIAL, SCORE, NO_SCORE, EXTRA_POINT } from '../../utils/global';
import { getTotalPPD } from '../../utils/getTotalPPD';
import { handleScoreChange, handleExtraWinningPointChange } from '../../utils/inputChange';
import { playersExtraPoint, playersPoint, playersPointDifferential, playersScore } from '../../utils/allPerformers';
import { arrangingPerformer, serializePerformer } from "../../utils/arrangePerformer";
import { tabKeyFocusChange } from '../../utils/helpers';




function Round1(props) {
    const initialExtra = { team: null, g: null, r: null };
    // const [showInput, setShowInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedExtra, setSelectedExtra] = useState(initialExtra);
    const [winningExtraPoint, setWinningExtraPoint] = useState([]);
    const [updateScore, setUpdateScore] = useState([]);



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


    // console.log(props);
    const { nets } = props.round;

    const beforeUnloadListener = (event) => {
        event.preventDefault();
        // alert("hi");
        // console.log("hi");
        return;
    };



    useEffect(() => {
        tabKeyFocusChange();
    }, [])


    useEffect(() => {
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




    // props.initialize
    // ⛏️⛏️ INITIALIZE TO NEW NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const initializeNetHandler = async () => {
        // console.log("Initialize nets");
        setIsLoading(true);
        // http://localhost:4000/api/event/assign-initial-net/611c978ef047ea50e9798039
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            credentials: "include"
        };
        // console.log(props.eventID);

        const response = await fetch(`${hostname}/api/net/assign-initial-net/${props.eventID}`, requestOptions);
        console.log("Initialize net - ", response);
        props.updateNets(true);
        setIsLoading(false);
    }
    // console.log(props.nets);







    // ⛏️⛏️ UPDATE GAME POINT AND POINT DIFfERENTIAL ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // const uniqueData = [...updateScore.reduce((map, obj) => map.set(obj.performanceID, obj), new Map()).values()];
            // reduce(function callbackFn(previousValue, currentValue) { ... })
            // const uniqueData = updateScore.reduce((previousValue, currentValue) => {
            //     console.log("Previous - ",previousValue);
            //     console.log("Current - ",currentValue);
            // });
            // http://localhost:4000/api/event/assign-initial-net/611c978ef047ea50e9798039
            const requestOptions = {
                method: 'PUT',
                headers: { "Content-Type": 'application/json' },
                credentials: "include",
                body: JSON.stringify({ updateScore, winningExtraPoint })
            };
            // console.log(props.eventID);


            // console.log(props.round._id);
            // console.log("Update team - ", updateScore);
            // console.log("Update Performance - ", updatePerformance);

            // CHANGE REQUEST BODY 
            const response = await fetch(`${hostname}/api/performance/update-performance/${props.eventID}/${props.roundNum}`, requestOptions);
            console.log("Update - ", response);
            setUpdateScore([]);
            props.updateNets(true);
        } catch (error) {
            console.log(error);
        }
    }









    return (
        <div className="Round1">
            {props.initialize && <button className="btn btn-primary" onClick={initializeNetHandler} >Initialize net for first round</button>}
            <br />
            {isLoading ? (
                <div className="text-center spinner-parent">
                    <div className="spinner-border text-danger spinner-child" role="status">
                    </div>
                </div>
            ) : (
                <div className="show-all-nets">
                    {!props.initialize && (
                        <div className="table-responsive">
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

                                        {/* Total  */}
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

                                            <td>{arrangingPerformer(net.performance, 1, props.game[0], POINT_DIFFERENTIAL, props.roundNum)} </td>
                                            {/* SCORE  */}
                                            <td >{playersScore(net, props.game[0], SCORE, 1, handleScoreChange, props.roundNum, updateScore, setUpdateScore)} </td>
                                            <td >{playersExtraPoint(net, props.game[0], EXTRA_POINT, 1, handleExtraWinningPointChange, addExtra, showInput, props.roundNum, winningExtraPoint, setWinningExtraPoint)} </td>
                                            <td >{playersPoint(net, props.game[0], POINT, 1, props.roundNum)} </td>

                                            <td>{playersPointDifferential(net, props.game[0], POINT_DIFFERENTIAL, 1, props.roundNum)}</td>







                                            <td>{arrangingPerformer(net.performance, 2, props.game[1], POINT_DIFFERENTIAL, props.roundNum)} </td>
                                            {/* SCORE  */}
                                            <td >{playersScore(net, props.game[1], SCORE, 2, handleScoreChange, props.roundNum, updateScore, setUpdateScore)} </td>
                                            <td >{playersExtraPoint(net, props.game[1], EXTRA_POINT, 2, handleExtraWinningPointChange, addExtra, showInput, props.roundNum, winningExtraPoint, setWinningExtraPoint)} </td>
                                            <td >{playersPoint(net, props.game[1], POINT, 2, props.roundNum)} </td>
                                            <td>{playersPointDifferential(net, props.game[1], POINT_DIFFERENTIAL, 2, props.roundNum)}</td>






                                            <td>{arrangingPerformer(net.performance, 3, props.game[2], POINT_DIFFERENTIAL, props.roundNum)} </td>
                                            {/* SCORE  */}
                                            <td >{playersScore(net, props.game[2], SCORE, 1, handleScoreChange, props.roundNum, updateScore, setUpdateScore)} </td>
                                            <td >{playersExtraPoint(net, props.game[2], EXTRA_POINT, 3, handleExtraWinningPointChange, addExtra, showInput, props.roundNum, winningExtraPoint, setWinningExtraPoint)} </td>
                                            <td >{playersPoint(net, props.game[2], POINT, 3, props.roundNum)} </td>
                                            <td>{playersPointDifferential(net, props.game[2], POINT_DIFFERENTIAL, 3, props.roundNum)}</td>




                                            {/* AVERAGE  */}
                                            <td> {serializePerformer(net.performance, props.roundNum, NO_SCORE)} </td>
                                            <td >  {getTotalPPD(net, POINT, props.roundNum)} </td>
                                            <td >{getTotalPPD(net, POINT_DIFFERENTIAL, props.roundNum)}</td>
                                            {/* <td > <div className="players-in-net"> {getTotalPPD(net, POINT, 4)}</div></td>
                                            <td > <div className="players-in-net"> {getTotalPPD(net, POINT_DIFFERENTIAL, 4)}</div></td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    )}
                    <button onClick={handleUpdate} className="btn btn-primary">Submit</button>
                </div>
            )}
        </div>
    )
}

export default Round1;


