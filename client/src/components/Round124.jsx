import React, { useState, useEffect } from 'react';
import { hostname } from '../utils/global';
import { totalPoint124 } from '../utils/addTotalPoint';

function Round124(props) {
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


    const handleInputChange = (e, id, round, scoreType, netID) => {
        e.preventDefault();
        // console.log("Change - ", e);
        // console.log("Performance ID - ", id);
        // console.log("round - ", round);
        // console.log("score - ", score);
        // console.log("Net ID - ", netID);








        const findItem = updatePerformance.find((elm, i) => elm.performanceID === id && elm.round === round);
        if (findItem) {
            // console.log("Find Item - ", findItem);
            updatePerformance.forEach((up, i) => {
                if (up.performanceID === id && up.round === round && scoreType === "pointDeferential") up.score.pointDeferential = e.target.value;
                if (up.performanceID === id && up.round === round && scoreType === "point") up.score.point = e.target.value;
            });
        } else {
            // CREATE NEW ONE 
            if (scoreType === "point") {
                setUpdatePerformance(oldState => [...oldState, { performanceID: id, round, score: { point: e.target.value }, netID }]);
            }
            if (scoreType === "pointDeferential") {
                setUpdatePerformance(oldState => [...oldState, { performanceID: id, round, score: { pointDeferential: e.target.value }, netID }]);

            }
        }


        // console.log(updatePerformance);




        // SUBMIT AND SET TO DEFAULT STATE 
    }



    const getDefaultValue = (p, scoreType, round) => {
        if (scoreType === "point") {
            switch (round) {
                case 1:
                    if (p.round1 && p.round1 !== undefined) { return p.round1.point } else { return null };
                case 2:
                    if (p.round2 && p.round2 !== undefined) { return p.round2.point } else { return null };
                case 3:
                    if (p.round3 && p.round3 !== undefined) { return p.round3.point } else { return null };
                case 4:
                    if (p.round4 && p.round4 !== undefined) { return p.round4.point } else { return null };
            }
        }

        if (scoreType === "pointDeferential") {
            // console.log(p, round2.pointDeferential);
            switch (round) {
                case 1:
                    if (p.round1 && p.round1 !== undefined) { return p.round1.pointDeferential } else { return null };
                case 2:
                    if (p.round2 && p.round2 !== undefined) { return p.round2.pointDeferential } else { return null };
                case 3:
                    if (p.round3 && p.round3 !== undefined) { return p.round3.pointDeferential } else { return null };
                case 4:
                    if (p.round4 && p.round4 !== undefined) { return p.round4.pointDeferential } else { return null };
            }
        }
    }





    const allPerformers = (net, round, score) => {
        // console.log("s - ", score);
        return net.performance.map((p, j) => (
            <div style={{ width: "100%", height: "100%" }} key={j}>
                <input
                    type="text"
                    className="form-control my-3"
                    defaultValue={getDefaultValue(p, score, round)}
                    style={{ width: "80px" }} name={net.sl}
                    onChange={e => handleInputChange(e, p._id, round, score, net._id)} />
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
                    <div className="total">{totalPoint124(p)}</div>
                </div>
            ));
        }
    }


    return (
        <div className="Round124">
            {props.initialize && <button className="btn btn-primary" onClick={initializeNetHandler} >Initialize net for first round</button>}
            <br />
            {isLoading ? <div className="spinner-border text-danger" role="status"></div> : (
                <div className="show-all-nets">
                    {!props.initialize && (
                        <table className="table table-hover table-bordered text-capitalize">
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan="2" scope="colgroup"></th>
                                    <th colSpan="2" scope="colgroup">Round 1</th>
                                    <th colSpan="2" scope="colgroup">Round 2</th>
                                    <th colSpan="2" scope="colgroup">Round 3</th>
                                    <th colSpan="2" scope="colgroup">Round 4</th>
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
                                    <th scope="col">total point</th>
                                    <th scope="col">total deferential</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.nets.map((net, i) => (
                                    <tr key={net.sl}>
                                        <th scope="row">Net {net.sl}</th>
                                        <td>
                                            {net.performance.map((p, j) => (
                                                <ul key={j}>
                                                    <li className="list-group-item">{p.participant.firstname}</li>
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

                                        <td >{allPerformers(net, 4, "point")} </td>
                                        <td>{allPerformers(net, 4, "pointDeferential")}</td>


                                        <td >{getTotal(net, "124", "point")}</td>
                                        <td >{getTotal(net, "124", "pointDeferential")}</td>


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

export default Round124;
