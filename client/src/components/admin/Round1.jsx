import React, { useState, useEffect } from 'react';
import { hostname } from '../../utils/global';
import { round1Total } from '../../utils/addTotalPoint';
import {round1TD} from '../../utils/pointDeferential';


function Round1(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [updatePerformance, setUpdatePerformance] = useState([]);




    useEffect(() => {
        // console.log("All nets - ", props.nets);
        setUpdatePerformance([]);
        setIsLoading(false);
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

        const response = await fetch(`${hostname}/api/event/assign-initial-net/${props.eventID}`, requestOptions);
        console.log("Initialize net - ", response);
        props.updateNets(true);
        setIsLoading(false);
    }
    // console.log(props.nets);





    const handleUpdate = async (e) => {
        e.preventDefault();

        // const uniqueData = [...updatePerformance.reduce((map, obj) => map.set(obj.performanceID, obj), new Map()).values()];
        // reduce(function callbackFn(previousValue, currentValue) { ... })
        // const uniqueData = updatePerformance.reduce((previousValue, currentValue) => {
        //     console.log("Previous - ",previousValue);
        //     console.log("Current - ",currentValue);
        // });
        // http://localhost:4000/api/event/assign-initial-net/611c978ef047ea50e9798039
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": 'application/json' },
            credentials: "include",
            body: JSON.stringify(updatePerformance)
        };
        // console.log(props.eventID);

        const response = await fetch(`${hostname}/api/event/update-one-to-four/${props.eventID}/${props.round}`, requestOptions);
        console.log("Update - ", response);
        // console.log("Update - ", updatePerformance);
        setUpdatePerformance([]);
        props.updateNets(true);
    }


    const handleInputChange = (e, id, game, scoreType, netID) => {
        e.preventDefault();
        // console.log("Change - ", e);
        // console.log("Performance ID - ", id);
        // console.log("round - ", round);
        // console.log("score - ", score);
        // console.log("Net ID - ", netID);








        const findItem = updatePerformance.find((elm, i) => elm.performanceID === id && elm.game === game);
        if (findItem) {
            // console.log("Find Item - ", findItem);
            updatePerformance.forEach((up, i) => {
                if (up.performanceID === id && up.game === game && scoreType === "pointDeferential") up.score.pointDeferential = e.target.value;
                if (up.performanceID === id && up.game === game && scoreType === "point") up.score.point = e.target.value;
            });
        } else {
            // CREATE NEW ONE 
            if (scoreType === "point") {
                setUpdatePerformance(oldState => [...oldState, { performanceID: id, game, score: { point: e.target.value }, netID }]);
            }
            if (scoreType === "pointDeferential") {
                setUpdatePerformance(oldState => [...oldState, { performanceID: id, game, score: { pointDeferential: e.target.value }, netID }]);

            }
        }


        // console.log(updatePerformance);




        // SUBMIT AND SET TO DEFAULT STATE 
    }



    const getDefaultValue = (p, scoreType, gameNum) => {
        if (scoreType === "point") {
            switch (gameNum) {
                case 1:
                    if (p.game1 && p.game1 !== undefined) { return p.game1.point } else { return null };
                case 2:
                    if (p.game2 && p.game2 !== undefined) { return p.game2.point } else { return null };
                case 3:
                    if (p.game3 && p.game3 !== undefined) { return p.game3.point } else { return null };
            }
        }

        if (scoreType === "pointDeferential") {
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





    const allPerformers = (net, game, score) => {
        // console.log("s - ", score);
        return net.performance.map((p, j) => (
            <div style={{ width: "100%", height: "100%" }} key={j}>
                <input
                    type="text"
                    className="form-control my-3"
                    defaultValue={getDefaultValue(p, score, game)}
                    style={{ width: "80px" }} name={net.sl}
                    onChange={e => handleInputChange(e, p._id, game, score, net._id)} />
            </div>
        ));
        // if (score === "point") {
        //     return net.performance.map((p, j) => (
        //         <div style={{ width: "100%", height: "100%" }} key={j}>
        //             <input type="text" className="form-control my-3" defaultValue={getDefaultValue(p, score, round)} style={{ width: "80px" }} name={net.sl} onChange={e => handleInputChange(e, p._id, round, score, net._id)} />
        //         </div>
        //     ));
        // }
        // if (score === "pointDeferential") {
        //     return net.performance.map((p, j) => (
        //         <div style={{ width: "100%", height: "100%" }} key={j}>
        //             <input type="text" className="form-control my-3" defaultValue={getDefaultValue(p, score, round)} style={{ width: "80px" }} name={net.sl} onChange={e => handleInputChange(e, p._id, round, score, net._id)} />
        //         </div>
        //     ));
        // }
    }



    const getTotal = (net, round, score) => {
        // console.log(score);
        if (score === "point") {
            return net.performance.map((p, j) => (
                <div style={{ width: "100%", height: "100%" }} className="mt-4" key={j}>
                    <div className="total">{round1Total(p)}</div>
                </div>
            ));
        }
        if (score === "pointDeferential") {
            return net.performance.map((p, j) => (
                <div style={{ width: "100%", height: "100%" }} className="mt-4" key={j}>
                    <div className="total">{round1TD(p)}</div>
                </div>
            ));
        }
    }


    return (
        <div className="Round1">
            {props.initialize && <button className="btn btn-primary" onClick={initializeNetHandler} >Initialize net for first round</button>}
            <br />
            {isLoading ? <div className="spinner-border text-danger" role="status"></div> : (
                <div className="show-all-nets">
                    {!props.initialize && (
                        <table className="table table-hover table-bordered text-capitalize">
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan="2" scope="colgroup"></th>
                                    <th colSpan="2" scope="colgroup">Game 1</th>
                                    <th colSpan="2" scope="colgroup">Game 2</th>
                                    <th colSpan="2" scope="colgroup">Game 3</th>
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
                                {props.nets.map((net, i) => (
                                    <tr key={net.sl}>
                                        <th scope="row">Net {net.sl}</th>
                                        <td>
                                            {net.performance.map((p, j) => (
                                                <ul key={j}>
                                                    <li className="list-group-item">{p.participant.firstname} {p.participant.lastname}</li>
                                                </ul>
                                            ))}
                                        </td>


                                        {/* ROUND ONE - POINT AND POINT DEFERENTIAL */}
                                        <td >{allPerformers(net, 1, "point")} </td>
                                        <td>{allPerformers(net, 1, "pointDeferential")}</td>


                                        <td >{allPerformers(net, 2, "point")} </td>
                                        <td>{allPerformers(net, 2, "pointDeferential")}</td>

                                        <td >{allPerformers(net, 3, "point")} </td>
                                        <td>{allPerformers(net, 3, "pointDeferential")}</td>


                                        <td >{getTotal(net, 1, "point")}</td>
                                        <td >{getTotal(net, 1, "pointDeferential")}</td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <button onClick={handleUpdate} className="btn btn-primary">Update</button>
                </div>
            )}
        </div>
    )
}

export default Round1;
