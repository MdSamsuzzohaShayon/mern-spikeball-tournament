import React, { useState, useEffect } from 'react';
import { hostname } from '../../utils/global';
import { getDefaultValue, serializePerformer, arrangingPerformer, getTotalPPD } from '../../utils/helpers';
import allPerformers from '../../utils/allPerformers';
import AddParticipant from '../participant/AddParticipant';
import { getTotalPointOfARound, getTDRound } from '../../utils/tptd';
import { showLiftedPefrormance } from '../../utils/performance';
import inputChange from '../../utils/inputChange';


function SingleRound(props) {
    const initialExtra = { pid: null, g: null, r: null };
    // const [showInput, setShowInput] = useState(false);
    const [selectedExtra, setSelectedExtra] = useState(initialExtra);
    // const [expandExtra, setExpandExtra] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [performances, setPerformances] = useState([]); // PARTICIPANTS
    const [updateTeam, setUpdateTeam] = useState([]);
    const [updatePerformance, setUpdatePerformance] = useState([]);
    const [showPerformances, setShowPerformances] = useState(true);
    const [leftedPerformance, setLeftedPerformance] = useState([]);

    let rank = 0;




    // console.log(props);
    const { nets } = props.round;
    // console.log("Found Round");
    // console.log(nets);





    let controller = new AbortController();

    // ⛏️⛏️ GET ALL PERFORMERS FROM THIS CURRENT ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const getAllPerformance = async () => {
        console.log("-------------------");
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
        const response = await fetch(`${hostname}/api/performance/get-performance/${props.eventID}/${props.roundNum}`, requestOptions);
        console.log("Get nets from round - ", response);
        const text = await response.text();
        const jsonRes = await JSON.parse(text);
        setPerformances([...jsonRes.rankingPerformance]);
        // console.log("JSON");
        // console.log(jsonRes);
        setIsLoading(false);
        controller = null
    }









    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    // ⛏️⛏️ SETTING DEFAULT VALUE AND UNMOUNT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    useEffect(() => {
        console.log("Component did mount [SingleRound.jsx]");
        rank = 0;
        // console.log("All nets - ", props.nets);
        // console.log("Round - ", props.round);
        // console.log(props.leftRound);
        // IF THIS IS NOT INITIALIZEABLE
        if (!props.initialize) {
            setLeftedPerformance(props.leftRound);
        }
        // console.log(leftedPerformance);
        if (props.round.length === 0) {
            getAllPerformance();
        } else {
            setShowPerformances(false);
            setPerformances([]);
        }
        setUpdateTeam([]);
    }, []);










    // useEffect(() => {
    //     return () => {
    //         console.log("Component unmount [SingleRound.jsx]");
    //         // setIsLoading(false);
    //         // setPerformances([]); // PARTICIPANTS
    //         // setUpdateTeam([]);
    //         // setShowPerformances(true);
    //         // setLeftedPerformance([]);
    //         // return controller?.abort();
    //         // rank = 0;

    //     };
    // });







    // ⛏️⛏️ SET LIST FOR WHO LEFT THE NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const leftNet = (e, pId) => {
        // console.log(e);
        // console.log(pId);
        e.preventDefault();
        // console.log(performances);
        // console.log(leftedPerformance);
        setPerformances(performances.filter(p => p._id !== pId));
        setLeftedPerformance((prevState) => {
            // console.log(prevState);
            if (leftedPerformance) {
                return [...leftedPerformance, ...performances.filter(p => p._id === pId)]
            } else {
                return [...performances.filter(p => p._id === pId)]
            }
        });
        // const newElement = performances.filter(p => p._id === pId)[0];
        // setLeftedPerformance(prevState => [...prevState, newElement])
        //setLeftedPerformance([...leftedPerformance, ...performances.filter(p => p._id === pId)]);
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

        const response = await fetch(`${hostname}/api/net/assign-net/${props.eventID}/${props.roundNum}`, requestOptions);
        console.log("Initialize net - ", response);
        props.updateNets(true);
        setIsLoading(false);
    }
    // console.log(props.nets);




    const randomAssign = async (e) => {
        e.preventDefault();
        // console.log("random");
        setIsLoading(true);
        // http://localhost:4000/api/event/assign-initial-net/611c978ef047ea50e9798039
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            credentials: "include",
            body: JSON.stringify({ performances, leftedPerformance })
        };
        // console.log(props.eventID);

        const response = await fetch(`${hostname}/api/net/random-assign-net/${props.eventID}/${props.roundNum}`, requestOptions);
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
            body: JSON.stringify({updatePerformance, updateTeam})
        };
        // console.log(props.eventID);


        // console.log(props.round._id);


        const response = await fetch(`${hostname}/api/performance/update-performance/${props.eventID}/${props.roundNum}`, requestOptions);
        console.log("Update - ", response);
        setUpdateTeam([]);
        props.updateNets(true);
    }








    // ⛏️⛏️ INPUT VALUE CHANGE  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const handleInputChange = (e, team, game, scoreType, netID, isExtra, oponent, extraPlayer, individual, teamNum) => {
        e.preventDefault();
        // console.log("Change - ", e.target.checked);
        // console.log("Performance ID - ", id);
        // console.log("round - ", round);
        // console.log("score - ", score);
        // console.log("Net ID - ", netID);
        // console.log("PointType isExtra - ", isExtra); // true or false

        // console.log(e.target.checked);
        // console.log(e.target.value);

        inputChange(e, netID, game, scoreType, isExtra, team, oponent, updateTeam, setUpdateTeam, extraPlayer, individual, teamNum, updatePerformance, setUpdatePerformance);
        // inputChange(updateTeam, team, game, isExtra, scoreType, e, setUpdateTeam, netID, oponent);


        // console.log(updateTeam);
    }










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












    // ⛏️⛏️ THIS IS MAIN RETURN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    return (
        <div className="SingleRound">
            <div className="d-flex my-3 justify-content-start align-items-center">
                {props.initialize && <button className="btn btn-primary" onClick={assignNetHandler} >Assign Nets</button>}
                {!props.initialize && <button className="btn btn-primary mx-3" onClick={assignNetHandler} >Rank Assign</button>}
                <button className="btn btn-primary" onClick={randomAssign} >Random Assign</button>
            </div>
            {showPerformances ? (<React.Fragment>
                {isLoading ? (
                    <div className="text-center spinner-parent">
                        <div className="spinner-border text-danger spinner-child" role="status">
                        </div>
                    </div>
                ) : (<React.Fragment>
                    <h2 className="h2">All players in the tournament</h2>
                    <table className="table table-bordered">
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
                                <td>{getTotalPointOfARound(p, props.roundNum)}</td>
                                {Math.sign(getTDRound(p, props.roundNum)) === -1 ? <td className="text-danger">{getTDRound(p, props.roundNum)}</td> : <td className="text-success">{getTDRound(p, props.roundNum)}</td>}
                                <td><button className="btn btn-danger" onClick={e => leftNet(e, p._id)}>Left</button></td>
                            </tr>))}
                        </tbody>
                    </table>
                    <br /><br />
                </React.Fragment>)}
                {showLiftedPefrormance(leftedPerformance, props.roundNum, recoverLeftedPerformance, true)}
                <br />
                <br />

                <AddParticipant
                    roundNum={props.roundNum}
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
                        <div className="show-all-nets">
                            {!props.initialize && (
                                <table className="table r-table table-bordered">
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

                                            {/* AVERAGE  */}
                                            {/* <th scope="col">Rank</th> */}
                                            <th scope="col">Participant</th>
                                            <th scope="col">point</th>
                                            <th scope="col">point deferential</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nets && nets.map((net, i) => (
                                            <tr key={i}>
                                                <th scope="row">Net {net.sl || i + 1}</th>

                                                <td>{arrangingPerformer(net.performance, 1)} </td>
                                                <td >{allPerformers(net, props.game[0], "score", 1, handleInputChange, getDefaultValue, addExtra, showInput, props)} </td>
                                                <td >{allPerformers(net, props.game[0], "point", 1, handleInputChange, getDefaultValue, addExtra, showInput, props)} </td>
                                                <td>{allPerformers(net, props.game[0], "pointDeferential", 1, handleInputChange, getDefaultValue, addExtra, showInput, props)}</td>


                                                <td>{arrangingPerformer(net.performance, 2)} </td>
                                                <td >{allPerformers(net, props.game[1], "point", 2, handleInputChange, getDefaultValue, addExtra, showInput, props)} </td>
                                                <td >{allPerformers(net, props.game[1], "score", 2, handleInputChange, getDefaultValue, addExtra, showInput, props)} </td>
                                                <td>{allPerformers(net, props.game[1], "pointDeferential", 2, handleInputChange, getDefaultValue, addExtra, showInput, props)}</td>

                                                <td>{arrangingPerformer(net.performance, 3)} </td>
                                                <td >{allPerformers(net, props.game[2], "score", 3, handleInputChange, getDefaultValue, addExtra, showInput, props)} </td>
                                                <td >{allPerformers(net, props.game[2], "point", 3, handleInputChange, getDefaultValue, addExtra, showInput, props)} </td>
                                                <td>{allPerformers(net, props.game[2], "pointDeferential", 3, handleInputChange, getDefaultValue, addExtra, showInput, props)}</td>


                                                {/* AVERAGE  */}
                                                {/* <td>{i+1} </td> */}
                                                {/* <td>{rankLoop(net, i + 1, rank)} </td> */}
                                                <td>{serializePerformer(net.performance)} </td>
                                                <td >{getTotalPPD(net, "point", 4)}</td>
                                                <td >{getTotalPPD(net, "pointDeferential", 4)}</td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            <button onClick={handleUpdate} className="btn btn-primary">Submit</button>
                            <br />
                        </div>
                    )}


                    {showLiftedPefrormance(leftedPerformance, props.roundNum, null, false)}
                </div>
            )}
            <br />

        </div>
    )
}

export default SingleRound;




