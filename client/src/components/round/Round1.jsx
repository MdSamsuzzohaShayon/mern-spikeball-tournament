import React, { useState, useEffect } from 'react';
import { hostname } from '../../utils/global';
import { round1Total } from '../../utils/addTotalPoint';
import { round1TD } from '../../utils/pointDeferential';


function Round1(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [updatePerformance, setUpdatePerformance] = useState([]);
    

    // console.log(props);
    const {nets} = props.round;




    // ⛏️⛏️ SETTING DEFAULT VALUE AND UNMOUNT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    useEffect(() => {
        // console.log("All nets - ", props.nets);
        // console.log("Round - ", props.round);
        setUpdatePerformance([]);
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







    // ⛏️⛏️ UPDATE GAME POINT AND POINT DIFERENTIAL ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
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


        // console.log(props.round._id);

        const response = await fetch(`${hostname}/api/event/update-performance/${props.eventID}/${props.roundNum}`, requestOptions);
        console.log("Update - ", response);
        // console.log("Update - ", updatePerformance);
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









    // ⛏️⛏️ SETTING DEFAULT VALUE OF INPUT  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
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
                        <input className="form-check-input" type="checkbox" onChange={e => handleInputChange(e, net.performance[0]._id, game, score, net._id)} defaultChecked={getDefaultValue(net.performance[0], score, game) === 1 ? true : false} />
                        <div className="vs"></div>
                        <input className="form-check-input" type="checkbox" onChange={e => handleInputChange(e, net.performance[1]._id, game, score, net._id)} defaultChecked={getDefaultValue(net.performance[1], score, game) === 1 ? true : false} />
                    </div>

                    <div className="two-participant">
                        <input className="form-check-input" type="checkbox" onChange={e => handleInputChange(e, net.performance[2]._id, game, score, net._id)} defaultChecked={getDefaultValue(net.performance[2], score, game) === 1 ? true : false} />
                        <div className="vs"></div>
                        <input className="form-check-input" type="checkbox" onChange={e => handleInputChange(e, net.performance[3]._id, game, score, net._id)} defaultChecked={getDefaultValue(net.performance[3], score, game) === 1 ? true : false} />
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
                        <input className="form-control" type="text" onChange={e => handleInputChange(e, net.performance[0]._id, game, score, net._id)} defaultValue={getDefaultValue(net.performance[0], score, game)} />
                        <div className="vs"></div>
                        <input className="form-control" type="text" onChange={e => handleInputChange(e, net.performance[1]._id, game, score, net._id)} defaultValue={getDefaultValue(net.performance[1], score, game)} />
                    </div>

                    <div className="two-participant">
                        <input className="form-control" type="text" onChange={e => handleInputChange(e, net.performance[2]._id, game, score, net._id)} defaultValue={getDefaultValue(net.performance[2], score, game)} />
                        <div className="vs"></div>
                        <input className="form-control" type="text" onChange={e => handleInputChange(e, net.performance[3]._id, game, score, net._id)} defaultValue={getDefaultValue(net.performance[3], score, game)} />
                    </div>
                </div>);
            }
        }
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




    const arrangingPerformer = (performer) => {

        if (performer.length < 4) {
            // console.log(performer);

            return (
                <div>
                    {performer.map((p, j) => (
                        <div className="player-name" key={j}>{p.participant.firstname} {p.participant.lastname}</div>
                    ))
                    }
                </div>);
        } else {
            // console.log(performer[0]);
            return (
                <div className="f-net d-flex flex-column text-center justify-space-between">
                    <div className="two-participant">
                        <div className="f-rival-item">{performer[0].participant.firstname} {performer[0].participant.lastname}  </div>
                        <div className="vs text-uppercase">VS</div>
                        <div className="f-rival-item">{performer[1].participant.firstname} {performer[1].participant.lastname}  </div>
                    </div>
                    <div className="two-participant">
                        <div className="f-rival-item">{performer[2].participant.firstname} {performer[2].participant.lastname}  </div>
                        <div className="vs text-uppercase">VS</div>
                        <div className="f-rival-item">{performer[3].participant.firstname} {performer[3].participant.lastname}  </div>
                    </div>
                </div>);
        }

    }


    return (
        <div className="Round1">
            {props.initialize && <button className="btn btn-primary" onClick={initializeNetHandler} >Initialize net for first round</button>}
            <br />
            {isLoading ? <div className="spinner-border text-danger" role="status"></div> : (
                <div className="show-all-nets">
                    {!props.initialize && (
                        <table className="table r-table table-bordered">
                            <thead className="r-thead bg-dark text-light">
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
                                {nets && nets.map((net, i) => (
                                    <tr key={i}>
                                        <th scope="row">Net {net.sl}</th>
                                        <td>
                                            {arrangingPerformer(net.performance)}
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
                    <button onClick={handleUpdate} className="btn btn-primary">Submit</button>
                </div>
            )}
        </div>
    )
}

export default Round1;
