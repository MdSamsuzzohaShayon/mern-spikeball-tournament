import React, { useState, useEffect } from 'react';
import { hostname } from '../../utils/global';

function Round13215(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [updatePerformance, setUpdatePerformance] = useState([]);




    useEffect(() => {
        // console.log("All nets - ", props.nets);
        setUpdatePerformance([]);
        setIsLoading(false);
    }, []);


    // ⛏️⛏️ INITIALIZE TO NEW NET FOR ROUND 5 ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const initializeNetHandler = async () => {
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            credentials: "include"
        };

        const response = await fetch(`${hostname}/api/event/assign-nineth-net/${props.eventID}/${props.round}`, requestOptions);
        console.log("Initialize net for round - ", response);
        props.updateNets(true);
        setIsLoading(false);
    }





    const handleUpdate = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": 'application/json' },
            credentials: "include",
            body: JSON.stringify(updatePerformance)
        };
        // console.log(props.eventID);

        const response = await fetch(`${hostname}/api/event/assign-thirteen-net/${props.eventID}/${props.round}`, requestOptions);
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
    }



    const getDefaultValue = (p, scoreType, round) => {
        if (scoreType === "point") {
            switch (round) {
                case 13:
                    if (p.round13 && p.round13 !== undefined) { return p.round13.point } else { return null };
                case 14:
                    if (p.round14 && p.round14 !== undefined) { return p.round14.point } else { return null };
                case 15:
                    if (p.round15 && p.round15 !== undefined) { return p.round15.point } else { return null };
            }
        }

        if (scoreType === "pointDeferential") {
            // console.log(p, round2.pointDeferential);
            switch (round) {
                case 13:
                    if (p.round13 && p.round13 !== undefined) { return p.round13.pointDeferential } else { return null };
                case 14:
                    if (p.round14 && p.round14 !== undefined) { return p.round14.pointDeferential } else { return null };
                case 15:
                    if (p.round15 && p.round15 !== undefined) { return p.round15.pointDeferential } else { return null };
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
    }


    return (
        <div className="Round124">
            {props.initialize && <button className="btn btn-primary" onClick={initializeNetHandler} >Reassign net for round 13 to 15</button>}
            <br />
            {isLoading ? (<div className="text-center spinner-parent">
                <div className="spinner-border text-danger spinner-child" role="status">
                </div>
            </div>) : (
                <div className="show-all-nets">
                    {!props.initialize && (
                        <table className="table table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan="2" scope="colgroup"></th>
                                    <th colSpan="2" scope="colgroup">Round 13</th>
                                    <th colSpan="2" scope="colgroup">Round 14</th>
                                    <th colSpan="2" scope="colgroup">Round 15</th>
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
                                        <td >{allPerformers(net, 13, "point")} </td>
                                        <td>{allPerformers(net, 13, "pointDeferential")}</td>

                                        <td >{allPerformers(net, 14, "point")} </td>
                                        <td>{allPerformers(net, 14, "pointDeferential")}</td>

                                        <td >{allPerformers(net, 15, "point")} </td>
                                        <td>{allPerformers(net, 15, "pointDeferential")}</td>


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

export default Round13215;
