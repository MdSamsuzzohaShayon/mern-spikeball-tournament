import React, { useState, useEffect } from 'react';
import { checkNegativeP, checkNegativePD } from '../../utils/helpers';
import { POINT, POINT_DIFFERENTIAL, SCORE } from '../../utils/global';
import getDefaultValue from '../../utils/defaultValue';
import { arrangingPerformer } from '../../utils/arrangePerformer';


function RoundTable(props) {

    const [isLoading, setIsLoading] = useState(false);


    const { nets } = props.round;

    // console.log("Found Round");
    // console.log("Nets - ",nets);
    // console.log("Game - ", props.game);













    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    // ⛏️⛏️ SETTING DEFAULT VALUE AND UNMOUNT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    // useEffect(() => {
    //     // console.log("Round - ", props.round);
    //     console.log("Component did mount [RoundTable.jsx]");
    // }, []);










    // useEffect(() => {
    //     const points  = document.querySelectorAll('.got-p');
    //     const point_d  = document.querySelectorAll('.got-pd');
    //     points.forEach((point, i)=>{
    //         console.log(point.parentElement);
    //     });
    //     // return () => {
    //     //     console.log("Component unmount [RoundTable.jsx]");

    //     // };
    // });








    // gor = GAME OF ROUND 
    // ⛏️⛏️ INPUT FIELD FOR ALL PARTICIPANT OR PERFORMANCE  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const allPerformers = (net, game, score, gor, getDefaultValue) => {
        // console.log(net);
        // console.log(gor);
        // console.log(game);
        // console.log(score);

        if (score === POINT) {
            if (net.performance.length < 4) {
                return (<div className="net-less-four">{(
                    net.performance.map((p, j) => (
                        <div className="f-point short-net-player" key={j}>
                            {checkNegativeP(getDefaultValue(p, score, game, props.roundNum), `p-i-${j + 1}`)}
                        </div>
                    ))
                )}</div>);
            } else {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                // console.log("Player One Point - ",getDefaultValue(one, score, game, props.roundNum));
                // console.log("Player two Point - ",getDefaultValue(two, score, game, props.roundNum));

                if (gor === 1) {
                    // 1ST VS 4TH & 2ND VS 3RD
                    return (<div className="player-point  d-flex flex-column">
                        <div className="two-p two-p-1">
                            {checkNegativeP(getDefaultValue(one, score, game, props.roundNum), "p-i-1")}
                            {checkNegativeP(getDefaultValue(four, score, game, props.roundNum), "p-i-2")}
                        </div>
                        <div className="line"></div>
                        <div className="two-p two-p-2 ">
                            {checkNegativeP(getDefaultValue(two, score, game, props.roundNum), "p-i-1")}
                            {checkNegativeP(getDefaultValue(three, score, game, props.roundNum), "p-i-2")}
                        </div>
                    </div>);
                } else if (gor === 2) {
                    // 1ST VS 2ND & 3RD VS 4TH 
                    return (<div className="player-point  d-flex flex-column">
                        <div className="two-p two-p-1">
                            {checkNegativeP(getDefaultValue(one, score, game, props.roundNum), "p-i-1")}
                            {checkNegativeP(getDefaultValue(two, score, game, props.roundNum), "p-i-2")}
                        </div>
                        <div className="line"></div>
                        <div className="two-p two-p-2 ">
                            {checkNegativeP(getDefaultValue(three, score, game, props.roundNum), "p-i-1")}
                            {checkNegativeP(getDefaultValue(four, score, game, props.roundNum), "p-i-2")}
                        </div>
                    </div>);
                } else if (gor === 3) {
                    // 1ST VS 3RD & 2ND VS 4TH 
                    return (<div className="player-point  d-flex flex-column">
                        <div className="two-p two-p-1">
                            {checkNegativeP(getDefaultValue(one, score, game, props.roundNum), "p-i-1")}
                            {checkNegativeP(getDefaultValue(three, score, game, props.roundNum), "p-i-2")}
                        </div>
                        <div className="line"></div>
                        <div className="two-p two-p-2 ">
                            {checkNegativeP(getDefaultValue(two, score, game, props.roundNum), "p-i-1")}
                            {checkNegativeP(getDefaultValue(four, score, game, props.roundNum), "p-i-2")}
                        </div>
                    </div>);
                }
            }
        }
        if (score === POINT_DIFFERENTIAL) {
            if (net.performance.length < 4) {
                return (<div className="net-less-four">{(
                    net.performance.map((p, j) => (
                       <div className="short-net-player f-point-differential" key={j}>
                           {checkNegativePD(getDefaultValue(p, score, game, props.roundNum), `pd-i-${j + 1}`)}
                       </div>
                   ))
                )}</div>);
            } else {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                if (gor === 1) {
                    // 1ST & 4TH VS 2ND & 3RD 
                    return (<div className="player-point-differential d-flex flex-column">
                        <div className="two-pd two-pd-i-1 ">
                            {checkNegativePD(getDefaultValue(one, score, game, props.roundNum), "pd-i-1")}
                            {checkNegativePD(getDefaultValue(four, score, game, props.roundNum), "pd-i-2")}
                        </div>
                        <div className="line"></div>
                        <div className="two-pd two-pd-i-2 ">
                            {checkNegativePD(getDefaultValue(two, score, game, props.roundNum), "pd-i-1")}
                            {checkNegativePD(getDefaultValue(three, score, game, props.roundNum), "pd-i-2")}
                        </div>
                    </div>);
                } else if (gor === 2) {
                    // 1ST & 2ND VS 3RD & 4TH 
                    // console.log("Game of round - ", gor);
                    return (<div className="player-point-differential d-flex flex-column">
                        <div className="two-pd two-pd-i-1 ">
                            {checkNegativePD(getDefaultValue(one, score, game, props.roundNum), "pd-i-1")}
                            {checkNegativePD(getDefaultValue(two, score, game, props.roundNum), "pd-i-2")}
                        </div>
                        <div className="line"></div>
                        <div className="two-pd two-pd-i-2 ">
                            {checkNegativePD(getDefaultValue(three, score, game, props.roundNum), "pd-i-1")}
                            {checkNegativePD(getDefaultValue(four, score, game, props.roundNum), "pd-i-2")}
                        </div>
                    </div>);
                } else if (gor === 3) {
                    // 1ST & 3RD VS 2ND & 4TH 
                    return (<div className="player-point-differential d-flex flex-column">
                        <div className="two-pd two-pd-i-1 ">
                            {checkNegativePD(getDefaultValue(one, score, game, props.roundNum), "pd-i-1")}
                            {checkNegativePD(getDefaultValue(three, score, game, props.roundNum), "pd-i-2")}
                        </div>
                        <div className="line"></div>
                        <div className="two-pd two-pd-i-2 ">
                            {checkNegativePD(getDefaultValue(two, score, game, props.roundNum), "pd-i-1")}
                            {checkNegativePD(getDefaultValue(four, score, game, props.roundNum), "pd-i-2")}
                        </div>
                    </div>);
                }
            }
        }


    }














    // ⛏️⛏️ THIS IS MAIN RETURN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    return (
        <div className="RoundTable">
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
                                        <th colSpan="3" scope="colgroup">Game {props.game[0]}</th>
                                        <th colSpan="3" scope="colgroup">Game {props.game[1]}</th>
                                        <th colSpan="3" scope="colgroup">Game {props.game[2]}</th>
                                        {/* <th colSpan="4" scope="colgroup">Average</th> */}
                                    </tr>
                                    <tr>
                                        <th scope="col">Net</th>

                                        <th scope="col">Team</th>
                                        <th scope="col">point</th>
                                        <th scope="col">point deferential</th>


                                        <th scope="col">Team</th>
                                        <th scope="col">point</th>
                                        <th scope="col">point deferential</th>


                                        <th scope="col">Team</th>
                                        <th scope="col">point</th>
                                        <th scope="col">point deferential</th>

                                        {/* AVERAGE  */}
                                        {/* <th scope="col">Rank</th>
                                    <th scope="col">Participant</th>
                                    <th scope="col">point</th>
                                    <th scope="col">point deferential</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {nets && nets.map((net, i) => (
                                        <tr key={i}>
                                            <th scope="row">Net {net.sl || i + 1}</th>

                                            {/* <td>{arrangingPerformer(net.performance, 1)} </td> */}
                                            {/* (performer, gor, game, scoreType, roundNum) */}
                                            <td>{arrangingPerformer(net.performance, 1, props.game[0], POINT, props.roundNum)} </td>
                                            <td >{allPerformers(net, props.game[0], POINT, 1, getDefaultValue)} </td>
                                            <td >{allPerformers(net, props.game[0], POINT_DIFFERENTIAL, 1, getDefaultValue)} </td>


                                            <td>{arrangingPerformer(net.performance, 2, props.game[1], POINT, props.roundNum)} </td>
                                            <td >{allPerformers(net, props.game[1], POINT, 2, getDefaultValue)} </td>
                                            <td >{allPerformers(net, props.game[1], POINT_DIFFERENTIAL, 2, getDefaultValue)} </td>

                                            <td>{arrangingPerformer(net.performance, 3, props.game[2], POINT, props.roundNum)} </td>
                                            <td >{allPerformers(net, props.game[2], POINT, 3, getDefaultValue)} </td>
                                            <td >{allPerformers(net, props.game[2], POINT_DIFFERENTIAL, 3, getDefaultValue)} </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

        </div>
    )
}

export default RoundTable;




