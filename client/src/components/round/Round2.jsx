import React, { useState, useEffect } from 'react';
import { hostname } from '../../utils/global';
import { getDefaultValue, getTotal, arrangingPerformer } from '../../utils/helpers';
import AddParticipant from '../participant/AddParticipant';


function Round2(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [performances, setPerformances] = useState([]); // PARTICIPANTS
    const [updatePerformance, setUpdatePerformance] = useState([]);
    const [showPerformances, setShowPerformances] = useState(true);
    const [leftedPerformance, setLeftedPerformance] = useState([]);




    // console.log(props);
    const { nets } = props.round;
    // console.log("Found Round");
    // console.log(props);






    // ⛏️⛏️ GET ALL PERFORMERS FROM THIS CURRENT ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const getAllPerformance = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": 'application/json' },
            credentials: "include"
        };
        // console.log(props.eventID);
        setIsLoading(true);
        // console.log("Loading - ",isLoading);
        // console.log(r);
        const response = await fetch(`${hostname}/api/event/get-performance/${props.eventID}`, requestOptions);
        console.log("Get nets from round - ", response);
        const text = await response.text();
        const jsonRes = await JSON.parse(text);
        setPerformances([...jsonRes.rankingPerformance]);
        // console.log("JSON");
        // console.log(jsonRes);
        setIsLoading(false);
    }










    // ⛏️⛏️ SETTING DEFAULT VALUE AND UNMOUNT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    useEffect(() => {
        // console.log("All nets - ", props.nets);
        // console.log("Round - ", props.round);
        setLeftedPerformance(props.leftRound);
        // console.log(leftedPerformance);
        if (props.round.length === 0) {
            getAllPerformance();
        } else {
            setShowPerformances(false);
            setPerformances([]);
        }
        setUpdatePerformance([]);
    }, []);







    // ⛏️⛏️ SET LIST FOR WHO LEFT THE NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const leftNet = (e, pId) => {
        // console.log(e);
        // console.log(pId);
        e.preventDefault();
        // console.log(performances);
        // console.log();
        setPerformances(performances.filter(p => p._id !== pId));
        setLeftedPerformance([...leftedPerformance, ...performances.filter(p => p._id === pId)]);
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
        console.log("random");
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
        console.log("Initialize net - ", response);
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
            body: JSON.stringify(updatePerformance)
        };
        // console.log(props.eventID);


        // console.log(props.round._id);

        const response = await fetch(`${hostname}/api/event/update-performance/${props.eventID}/${props.roundNum}`, requestOptions);
        console.log("Update - ", response);
        console.log("Update Performance - ", updatePerformance);
        setUpdatePerformance([]);
        props.updateNets(true);
    }








    // ⛏️⛏️ INPUT VALUE CHANGE  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const handleInputChange = (e, id, game, scoreType, netID) => {
        // e.preventDefault();
        // console.log("Change - ", e.target.checked);
        // console.log("Performance ID - ", id);
        // console.log("round - ", round);
        // console.log("score - ", score);
        // console.log("Net ID - ", netID);

        console.log(e.target.checked);


        const findItem = updatePerformance.find((elm, i) => elm.performanceID === id && elm.game === game);
        if (findItem) {
            // console.log("Find Item - ", findItem);
            updatePerformance.forEach((up, i) => {
                if (up.performanceID === id && up.game === game && scoreType === "pointDeferential") up.score.pointDeferential = e.target.value;
                if (up.performanceID === id && up.game === game && scoreType === "point") {
                    let point = null;
                    e.target.checked || e.target.checked == "on" ? point = 1 : point = 0;
                    up.score.point = point
                };
            });
        } else {
            // CREATE NEW ONE 
            if (scoreType === "point") {
                let point = null;
                e.target.checked || e.target.checked == "on" ? point = 1 : point = 0;
                setUpdatePerformance(oldState => [...oldState, { performanceID: id, game, score: { point }, netID }]);
            }
            if (scoreType === "pointDeferential") {
                setUpdatePerformance(oldState => [...oldState, { performanceID: id, game, score: { pointDeferential: e.target.value }, netID }]);

            }
        }

        console.log(updatePerformance);
    }

















    // ⛏️⛏️ INPUT FIELD FOR ALL PARTICIPANT OR PERFORMANCE  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const allPerformers = (net, game, score) => {
        // console.log(net.performance);
        // console.log("s - ", score);
        // console.log(props.round);
        if (score === "point") {
            if (net.performance.length < 4) {
                return net.performance.map((p, j) => (
                    <div className="f-point d-flex flex-column" key={j}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={e => handleInputChange(e, p._id, game, score, net._id)}
                            defaultChecked={getDefaultValue(p, score, game) === 1 ? true : false}
                        />

                    </div>
                ));
            } else {
                return (<div className="f-point d-flex flex-column">
                    <div className="two-participant">
                        <input className="form-check-input" type="checkbox"
                            onChange={e => handleInputChange(e, net.performance[0]._id, game, score, net._id)}
                            defaultChecked={getDefaultValue(net.performance[0], score, game) === 1 ? true : false} />

                        <div className="vs"></div>

                        <input className="form-check-input" type="checkbox"
                            onChange={e => handleInputChange(e, net.performance[3]._id, game, score, net._id)}
                            defaultChecked={getDefaultValue(net.performance[3], score, game) === 1 ? true : false} />
                    </div>

                    <div className="two-participant">
                        <input className="form-check-input" type="checkbox"
                            onChange={e => handleInputChange(e, net.performance[1]._id, game, score, net._id)}
                            defaultChecked={getDefaultValue(net.performance[1], score, game) === 1 ? true : false} />
                        <div className="vs"></div>
                        <input className="form-check-input" type="checkbox"
                            onChange={e => handleInputChange(e, net.performance[2]._id, game, score, net._id)}
                            defaultChecked={getDefaultValue(net.performance[2], score, game) === 1 ? true : false} />
                    </div>
                </div>);
            }
        }
        if (score === "pointDeferential") {
            if (net.performance.length < 4) {
                return net.performance.map((p, j) => (
                    <div className="f-point-differential" key={j}>
                        <input
                            type="text"
                            className="form-control my-3"
                            defaultValue={getDefaultValue(p, score, game)}
                            style={{ width: "80px" }} name={net.sl}
                            onChange={e => handleInputChange(e, p._id, game, score, net._id)} />
                    </div>
                ));
            } else {
                return (<div className="f-point d-flex flex-column">
                    <div className="two-participant">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[0]._id, game, score, net._id)}
                            defaultValue={getDefaultValue(net.performance[0], score, game)} />
                        <div className="vs"></div>
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[3]._id, game, score, net._id)}
                            defaultValue={getDefaultValue(net.performance[3], score, game)} />
                    </div>

                    <div className="two-participant">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[1]._id, game, score, net._id)}
                            defaultValue={getDefaultValue(net.performance[1], score, game)} />
                        <div className="vs"></div>
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[2]._id, game, score, net._id)}
                            defaultValue={getDefaultValue(net.performance[2], score, game)} />
                    </div>
                </div>);
            }
        }
    }













    // ⛏️⛏️ THIS IS MAIN RETURN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    return (
        <div className="Round2">
            <div className="d-flex">
                {props.initialize && <button className="btn btn-primary" onClick={assignNetHandler} >Assign Nets</button>}
                <button className="btn btn-primary" onClick={assignNetHandler} >Reassign</button>
                <button className="btn btn-primary" onClick={randomAssign} >Random Reassign</button>
            </div>
            {showPerformances ? (<React.Fragment>
                <h2 className="h2">All players in the tournament</h2>
                <div className="performance-list list-group">
                    {performances && performances.map((p, i) => (<div key={i} className="list-group-item d-flex justify-content-between align-items-center">
                        <p>{p.participant.firstname + " " + p.participant.lastname}</p>
                        <button className="btn btn-danger" onClick={e => leftNet(e, p._id)}>Left</button>
                    </div>))}
                </div>
                <br />
                <br />

                <AddParticipant
                    roundNum={props.roundNum}
                    eventID={props.eventID}
                    handleSaveParticipant={handleSaveParticipant}
                />

            </React.Fragment>) : (
                <div className="show table">
                    {isLoading ? <div className="spinner-border text-danger" role="status"></div> : (
                        <div className="show-all-nets">
                            {!props.initialize && (
                                <table className="table r-table table-bordered">
                                    <thead className="r-thead bg-dark text-light">
                                        <tr>
                                            <th colSpan="2" scope="colgroup"></th>
                                            <th colSpan="2" scope="colgroup">Game 4</th>
                                            <th colSpan="2" scope="colgroup">Game 5</th>
                                            <th colSpan="2" scope="colgroup">Game 6</th>
                                            <th colSpan="2" scope="colgroup">Total</th>
                                        </tr>
                                        <tr>
                                            <th scope="col">Net</th>
                                            <th scope="col">Participant</th>
                                            <th scope="col">point</th>
                                            <th scope="col">point deferential</th>
                                            <th scope="col">point</th>
                                            <th scope="col">point deferential</th>
                                            <th scope="col">point</th>
                                            <th scope="col">point deferential</th>
                                            <th scope="col">point</th>
                                            <th scope="col">point deferential</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nets && nets.map((net, i) => (
                                            <tr key={i}>
                                                <th scope="row">Net {net.sl || i + 1}</th>
                                                <td>
                                                    {arrangingPerformer(net.performance)}
                                                </td>


                                                {/* ROUND FOUR - POINT AND POINT DEFERENTIAL */}
                                                <td >{allPerformers(net, 4, "point")} </td>
                                                <td>{allPerformers(net, 4, "pointDeferential")}</td>


                                                <td >{allPerformers(net, 5, "point")} </td>
                                                <td>{allPerformers(net, 5, "pointDeferential")}</td>

                                                <td >{allPerformers(net, 6, "point")} </td>
                                                <td>{allPerformers(net, 6, "pointDeferential")}</td>



                                                {/* TWO IS THE ROUND NUMBER  */}
                                                <td >{getTotal(net, props.roundNum, "point")}</td>
                                                <td >{getTotal(net, props.roundNum, "pointDeferential")}</td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            <button onClick={handleUpdate} className="btn btn-primary">Submit</button>
                        </div>
                    )}

                    {leftedPerformance && leftedPerformance.length > 1 && (<React.Fragment>
                        <h2 className="h2">Players Who Leave</h2>
                        <div className="left-performance-list p-0 list-group">
                            {leftedPerformance.map((p, i) => (<div key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                <p>{p.participant.firstname + " " + p.participant.lastname}</p>
                            </div>))}
                        </div>
                    </React.Fragment>)}
                </div>
            )}
            <br />

        </div>
    )
}

export default Round2;
