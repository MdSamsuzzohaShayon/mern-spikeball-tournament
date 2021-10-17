import React, { useState, useEffect } from 'react';
import { hostname, POINT, POINT_DIFFERENTIAL, SCORE, NO_SCORE } from '../../utils/global';
import { getTotalPPD } from '../../utils/getTotalPPD';
import getDefaultValue from '../../utils/defaultValue';
import inputChange from '../../utils/inputChange';
import allPerformers from '../../utils/allPerformers';
import { arrangingPerformer, serializePerformer } from "../../utils/arrangePerformer";



function Round1(props) {
    const initialExtra = { pid: null, g: null, r: null };
    // const [showInput, setShowInput] = useState(false);
    const [selectedExtra, setSelectedExtra] = useState(initialExtra);
    const [isLoading, setIsLoading] = useState(false);
    const [updateTeam, setUpdateTeam] = useState([]);
    const [updatePerformance, setUpdatePerformance] = useState([]);



    const addExtra = (e, pid, g, r) => {
        // E = EVENT, PID = PREFORMANCE ID, G = GAME, R = ROUND 
        setSelectedExtra({ pid, g, r });
    }

    const showInput = (pid, g, r) => {
        if (pid === selectedExtra.pid && g === selectedExtra.g && r === selectedExtra.r) {
            return "block";
        } else {
            return "none";
        }
    }


    // console.log(props);
    const { nets } = props.round;


    /*
    useEffect(() => {
        console.log("update state");
        const t_p_input = document.querySelectorAll(".two-p-input");
        const points = document.querySelectorAll('.got-point');
        const no_point = document.querySelectorAll('.no-point');
        // points.forEach((point, i) => {
        //     point.parentElement.parentElement.style.backgroundColor = "blue";

        //     if (point.parentElement.parentElement.nextElementSibling) point.parentElement.parentElement.nextElementSibling.style.backgroundColor = "blue";
        //     console.log("Parent element of point - ", point.parentElement.parentElement);
        // });

        t_p_input.forEach((tp, i)=> {
            // console.log(tp);
            if(tp.hasChildNodes()){
                if(tp.childNodes[0].classList.contains('point-extra')){
                    // tp.style.backgroundColor = "blue";
                    console.log(tp);
                    // console.log(tp.parentElement.parentElement.previousElementSibling);
   
                    // if(tp.previousElementSibling) tp.previousElementSibling.style.backgroundColor = "blue";
                    // if(tp.nextElementSibling){
                    //     tp.nextElementSibling.style.backgroundColor = "blue";
                    // }

                }
            }
        });
    });
    */
    // }, [updateTeam, updatePerformance]);


    // ⛏️⛏️ SETTING DEFAULT VALUE AND UNMOUNT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    useEffect(() => {
        // console.log("All nets - ", props.nets);
        // console.log("Round - ", props.round);
        return () => {
            console.log("Unmount component [Round1.jsx]");
            setUpdateTeam([]);
        }
    }, []);


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

        // const uniqueData = [...updateTeam.reduce((map, obj) => map.set(obj.performanceID, obj), new Map()).values()];
        // reduce(function callbackFn(previousValue, currentValue) { ... })
        // const uniqueData = updateTeam.reduce((previousValue, currentValue) => {
        //     console.log("Previous - ",previousValue);
        //     console.log("Current - ",currentValue);
        // });
        // http://localhost:4000/api/event/assign-initial-net/611c978ef047ea50e9798039
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": 'application/json' },
            credentials: "include",
            body: JSON.stringify({ updatePerformance, updateTeam })
        };
        // console.log(props.eventID);


        // console.log(props.round._id);
        // console.log("Update team - ", updateTeam);
        // console.log("Update Performance - ", updatePerformance);

        const response = await fetch(`${hostname}/api/performance/update-performance/${props.eventID}/${props.roundNum}`, requestOptions);
        console.log("Update - ", response);
        setUpdateTeam([]);
        props.updateNets(true);
    }








    // ⛏️⛏️ INPUT VALUE CHANGE  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖        
    const handleInputChange = (e, team, game, scoreType, netID, isExtra, oponent, extraPlayer, individual, teamNum) => {
        e.preventDefault();
        // console.log("team1 - ",team);
        // console.log("Change - ", e.target.checked);
        // console.log("Performance ID - ", id);
        // console.log("round - ", round);
        // console.log("score - ", score);
        // console.log("Net ID - ", netID);
        // console.log(updateTeam);
        // inputChange(updateTeam, id, game, isExtra, scoreType, e, setUpdateTeam, netID, partner);
        // console.log("Team 1 ",team);
        // console.log("Team 2 ",oponent);
        inputChange(e, netID, game, scoreType, isExtra, team, oponent, updateTeam, setUpdateTeam, extraPlayer, individual, teamNum, updatePerformance, setUpdatePerformance);
    }









    // ⛏️⛏️ SETTING DEFAULT VALUE OF INPUT  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    /*
    const getDefaultValue = (p, scoreType, gameNum) => {
        if (scoreType === POINT) {
            switch (gameNum) {
                case 1:
                    if (p.game1 && p.game1 !== undefined) { return p.game1.point } else { return null };
                case 2:
                    if (p.game2 && p.game2 !== undefined) { return p.game2.point } else { return null };
                case 3:
                    if (p.game3 && p.game3 !== undefined) { return p.game3.point } else { return null };
            }
        }

        if (scoreType === POINT_DIFFERENTIAL) {
            // console.log(p, round2.pointDeferential);
            switch (gameNum) {
                case 1:
                    if (p.game1 && p.game1 !== undefined) { return p.game1.pointDeferential } else { return null };
                case 2:
                    if (p.game2 && p.game2 !== undefined) { return p.game2.pointDeferential } else { return null };
                case 3:
                    if (p.game3 && p.game3 !== undefined) { return p.game3.pointDeferential } else { return null };
            }
        }
    }
    */







    /*
    const getTotal = (net, round, score) => {
        // console.log(score);
        if (score === POINT) {
            return net.performance.map((p, j) => (
                <div style={{ width: "100%", height: "100%" }} className="mt-4" key={j}>
                    <div className="total">{round1Total(p)}</div>
                </div>
            ));
        }
        if (score === POINT_DIFFERENTIAL) {
            return net.performance.map((p, j) => (
                <div style={{ width: "100%", height: "100%" }} className="mt-4" key={j}>
                    <div className="total">{round1TD(p)}</div>
                </div>
            ));
        }
    }
    */









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
                            <table className="table r-table table-bordered  table-striped">
                                <thead className="r-thead bg-dark text-light text-center">
                                    <tr>
                                        <th colSpan="1" scope="colgroup"></th>
                                        <th colSpan="4" scope="colgroup">Game {props.game[0]}</th>
                                        <th colSpan="4" scope="colgroup">Game {props.game[1]}</th>
                                        <th colSpan="4" scope="colgroup">Game {props.game[2]}</th>
                                        <th colSpan="3" scope="colgroup">Total</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">Net</th>

                                        <th scope="col">Team</th>
                                        <th scope="col">Score</th>
                                        <th scope="col">point</th>
                                        <th scope="col">point differential</th>


                                        <th scope="col">Team</th>
                                        <th scope="col">Score</th>
                                        <th scope="col">point</th>
                                        <th scope="col">point differential</th>


                                        <th scope="col">Team</th>
                                        <th scope="col">Score</th>
                                        <th scope="col">point</th>
                                        <th scope="col">point differential</th>

                                        {/* Total  */}
                                        <th scope="col">Participant</th>
                                        <th scope="col">point</th>
                                        <th scope="col">point differential</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nets && nets.map((net, i) => (
                                        <tr key={i}>
                                            <th scope="row">Net {net.sl || i + 1}</th>
                                            {/* {console.log("net performance - ", net.performance)} */}

                                            <td>{arrangingPerformer(net.performance, 1, props.game[0], POINT, props.roundNum)} </td>
                                            <td >{allPerformers(net, props.game[0], SCORE, 1, handleInputChange, getDefaultValue, addExtra, showInput, props)} </td>
                                            <td >{allPerformers(net, props.game[0], POINT, 1, handleInputChange, getDefaultValue, addExtra, showInput, props)} </td>
                                            <td>{allPerformers(net, props.game[0], POINT_DIFFERENTIAL, 1, handleInputChange, getDefaultValue, addExtra, showInput, props)}</td>



                                            <td>{arrangingPerformer(net.performance, 2, props.game[1], POINT, props.roundNum)} </td>
                                            <td >{allPerformers(net, props.game[1], SCORE, 2, handleInputChange, getDefaultValue, addExtra, showInput, props)} </td>
                                            <td >{allPerformers(net, props.game[1], POINT, 2, handleInputChange, getDefaultValue, addExtra, showInput, props)} </td>
                                            <td>{allPerformers(net, props.game[1], POINT_DIFFERENTIAL, 2, handleInputChange, getDefaultValue, addExtra, showInput, props)}</td>

                                            <td>{arrangingPerformer(net.performance, 3, props.game[2], POINT, props.roundNum)} </td>
                                            <td >{allPerformers(net, props.game[2], SCORE, 3, handleInputChange, getDefaultValue, addExtra, showInput, props)} </td>
                                            <td >{allPerformers(net, props.game[2], POINT, 3, handleInputChange, getDefaultValue, addExtra, showInput, props)} </td>
                                            <td>{allPerformers(net, props.game[2], POINT_DIFFERENTIAL, 3, handleInputChange, getDefaultValue, addExtra, showInput, props)}</td>


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
