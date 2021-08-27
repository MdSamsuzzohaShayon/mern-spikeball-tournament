import React, { useState, useEffect } from 'react';
import { hostname } from '../utils/global';

function Round124(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [updatePerformance, setUpdatePerformance] = useState([]);




    useEffect(() => {
        console.log(props.nets);
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

        const response = await fetch(`${hostname}/api/event/assign-initial-net/${props.eventID}`, requestOptions);
        console.log("Initialize net - ", response);
        props.updateNets(true);
        setIsLoading(false);
    }
    // console.log(props.nets);


    const handleUpdate = (e) => {
        e.preventDefault();
        // console.log("Update - ", updatePerformance);
        // const uniquePerformance = [...new Set(
        //     updatePerformance.map(x => JSON.stringify(((o) => ({
        //         performanceID: o.performanceID
        //     }))(x))))
        // ].map(JSON.parse);
        // console.log("Update - ", uniquePerformance);



        const uniqueData = [...updatePerformance.reduce((map, obj) => map.set(obj.performanceID, obj), new Map()).values()];
        console.log("Update - ", uniqueData);

    }


    const handleInputChange = (e, id, round, score, netID) => {
        e.preventDefault();
        console.log("Change - ", e);
        console.log("Performance ID - ", id);
        console.log("round - ", round);
        console.log("score - ", score);
        console.log("Net ID - ", netID);
        setUpdatePerformance(oldState => [...oldState, { performanceID: id, round, score, scoreValue: e.target.value, netID }]);
        // SUBMIT AND SET TO DEFAULT STATE 
    }



    const allPerformers = (net, round, score) => {
        return net.performance.map((p, j) => (
            <div style={{ width: "100%", height: "100%" }} key={j}>
                <input type="text" className="form-control" style={{ width: "80px" }} name={net.sl} onChange={e => handleInputChange(e, p._id, round, score, net._id)} />
            </div>
        ));
    }


    return (
        <div className="Round124">
            {props.initialize && <button className="btn btn-primary" onClick={initializeNetHandler} >Initialize net for first round</button>}
            <br />
            {isLoading ? <div className="spinner-border text-danger" role="status"></div> : (
                <div className="show-all-nets">
                    {!props.initialize && (
                        <table className="table table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan="2" scope="colgroup"></th>
                                    <th colSpan="2" scope="colgroup">Round 1</th>
                                    <th colSpan="2" scope="colgroup">Round 2</th>
                                    <th colSpan="2" scope="colgroup">Round 3</th>
                                    <th colSpan="2" scope="colgroup">Round 4</th>
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
                                                    <li className="list-group-item">{p.participant.firstname}</li>
                                                </ul>
                                            ))}
                                        </td>


                                        {/* ROUND ONE  */}
                                        <td className="d-flex justify-content-center align-items-center align-self-center flex-column" >
                                            {allPerformers(net, 1, "point")}
                                        </td>
                                        <td>{allPerformers(net, 1, "pointDeferential")}</td>


                                        {/* ROUND TWO  */}
                                        <td>Otto</td>
                                        <td>@mdo</td>

                                        {/* ROUND THREE  */}
                                        <td>Otto</td>
                                        <td>@mdo</td>

                                        {/* ROUND FOUR  */}
                                        <td>Otto</td>
                                        <td>@mdo</td>


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
