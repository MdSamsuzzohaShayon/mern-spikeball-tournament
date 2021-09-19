import React, { useState, useEffect } from 'react';
import { getDefaultValue, arrangingPerformer } from '../../utils/helpers';


function SingleRound(props) {

    const [isLoading, setIsLoading] = useState(false);


    const { nets } = props.round;
    // console.log("Found Round");
    // console.log(nets);











    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    // ⛏️⛏️ SETTING DEFAULT VALUE AND UNMOUNT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    useEffect(() => {
        console.log("Component did mount [RoundTable.jsx]");
    }, []);










    useEffect(() => {
        return () => {
            console.log("Component unmount [RoundTable.jsx]");

        };
    });








    // gor = GAME OF ROUND 
    // ⛏️⛏️ INPUT FIELD FOR ALL PARTICIPANT OR PERFORMANCE  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const allPerformers = (net, game, score, gor, getDefaultValue) => {
        // console.log(net);
        // console.log(gor);
        // console.log(game);
        // console.log(score);

        if (score === "point") {
            if (net.performance.length < 4) {
                return net.performance.map((p, j) => (
                    <div className="f-point d-flex flex-column" key={j}>
                        <div className="p-item">{getDefaultValue(p, score, game, props.roundNum)}</div>
                    </div>
                ));
            } else {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                // console.log("Player One Point - ",getDefaultValue(one, score, game, props.roundNum));
                // console.log("Player two Point - ",getDefaultValue(two, score, game, props.roundNum));

                if (gor === 1) {
                    // 1ST VS 4TH & 2ND VS 3RD
                    return (<div className="f-point d-flex flex-column">
                        <div className="two-p two-p-1 d-flex flex-column justify-content-center align-items-center">
                            <div className="p-item p-i-1">{getDefaultValue(one, score, game, props.roundNum)}</div>
                            <div className="p-item p-i-2">{getDefaultValue(four, score, game, props.roundNum)}</div>
                        </div>
                        <div className="line"></div>
                        <div className="two-p two-p-2  d-flex flex-column justify-content-center align-items-center">
                            <div className="p-item p-i-1">{getDefaultValue(two, score, game, props.roundNum)}</div>
                            <div className="p-item p-i-2">{getDefaultValue(three, score, game, props.roundNum)}</div>
                        </div>
                    </div>);
                } else if (gor === 2) {
                    // 1ST VS 2ND & 3RD VS 4TH 
                    return (<div className="f-point d-flex flex-column">
                        <div className="two-p two-p-1 d-flex flex-column justify-content-center align-items-center">
                            <div className="p-item p-i-1">{getDefaultValue(one, score, game, props.roundNum)}</div>
                            <div className="p-item p-i-2">{getDefaultValue(two, score, game, props.roundNum)}</div>
                        </div>
                        <div className="line"></div>
                        <div className="two-p two-p-2  d-flex flex-column justify-content-center align-items-center">
                            <div className="p-item p-i-1">{getDefaultValue(three, score, game, props.roundNum)}</div>
                            <div className="p-item p-i-2">{getDefaultValue(four, score, game, props.roundNum)}</div>
                        </div>
                    </div>);
                } else if (gor === 3) {
                    // 1ST VS 3RD & 2ND VS 4TH 
                    return (<div className="f-point d-flex flex-column">
                        <div className="two-p two-p-1 d-flex flex-column justify-content-center align-items-center">
                            <div className="p-item p-i-1">{getDefaultValue(one, score, game, props.roundNum)}</div>
                            <div className="p-item p-i-2">{getDefaultValue(three, score, game, props.roundNum)}</div>
                        </div>
                        <div className="line"></div>
                        <div className="two-p two-p-2  d-flex flex-column justify-content-center align-items-center">
                            <div className="p-item p-i-1">{getDefaultValue(two, score, game, props.roundNum)}</div>
                            <div className="p-item p-i-2">{getDefaultValue(four, score, game, props.roundNum)}</div>
                        </div>
                    </div>);
                }
            }
        }
        if (score === "pointDeferential") {
            if (net.performance.length < 4) {
                return net.performance.map((p, j) => (
                    <div className="f-point-differential" key={j}>
                        <div className="pd-item">{getDefaultValue(p, score, game, props.roundNum)}</div>
                    </div>
                ));
            } else {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                if (gor >= 1) {
                    // 1ST VS 4TH & 2ND VS 3RD 
                    return (<div className="f-point d-flex flex-column">
                        <div className="two-pd two-pd-i-1 d-flex flex-column align-items-center justify-content-center">
                            <div className="pd-item pd-i-1">{getDefaultValue(one, score, game, props.roundNum)}</div>
                            <div className="pd-item pd-i-2">{getDefaultValue(four, score, game, props.roundNum)}</div>
                        </div>
                        <div className="line"></div>
                        <div className="two-pd two-pd-i-2 d-flex flex-column align-items-center justify-content-center">
                            <div className="pd-item pd-i-1">{getDefaultValue(two, score, game, props.roundNum)}</div>
                            <div className="pd-item pd-i-2">{getDefaultValue(three, score, game, props.roundNum)}</div>
                        </div>
                    </div>);
                } else if (gor === 2) {
                    // 1ST VS 2ND & 3RD VS 4TH 
                    return (<div className="f-point d-flex flex-column">
                        <div className="two-pd two-pd-i-1 d-flex flex-column align-items-center justify-content-center">
                            <div className="pd-item pd-i-1">{getDefaultValue(one, score, game, props.roundNum)}</div>
                            <div className="pd-item pd-i-2">{getDefaultValue(two, score, game, props.roundNum)}</div>
                        </div>
                        <div className="line"></div>
                        <div className="two-pd two-pd-i-2 d-flex flex-column align-items-center justify-content-center">
                            <div className="pd-item pd-i-1">{getDefaultValue(three, score, game, props.roundNum)}</div>
                            <div className="pd-item pd-i-2">{getDefaultValue(four, score, game, props.roundNum)}</div>
                        </div>
                    </div>);
                } else if (gor === 3) {
                    // 1ST VS 3RD & 2ND VS 4TH 
                    return (<div className="f-point d-flex flex-column">
                        <div className="two-pd two-pd-i-1 d-flex flex-column align-items-center justify-content-center">
                            <div className="pd-item pd-i-1">{getDefaultValue(one, score, game, props.roundNum)}</div>
                            <div className="pd-item pd-i-2">{getDefaultValue(three, score, game, props.roundNum)}</div>
                        </div>
                        <div className="line"></div>
                        <div className="two-pd two-pd-i-2 d-flex flex-column align-items-center justify-content-center">
                            <div className="pd-item pd-i-1">{getDefaultValue(two, score, game, props.roundNum)}</div>
                            <div className="pd-item pd-i-2">{getDefaultValue(four, score, game, props.roundNum)}</div>
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
                        <table className="table r-table table-bordered">
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

                                        <td>{arrangingPerformer(net.performance, 1)} </td>
                                        <td >{allPerformers(net, props.game[0], "point", 1, getDefaultValue)} </td>
                                        <td >{allPerformers(net, props.game[0], "pointDeferential", 1, getDefaultValue)} </td>


                                        <td>{arrangingPerformer(net.performance, 2)} </td>
                                        <td >{allPerformers(net, props.game[1], "point", 2, getDefaultValue)} </td>
                                        <td >{allPerformers(net, props.game[1], "pointDeferential", 2, getDefaultValue)} </td>


                                        <td>{arrangingPerformer(net.performance, 3)} </td>
                                        <td >{allPerformers(net, props.game[2], "point", 3, getDefaultValue)} </td>
                                        <td >{allPerformers(net, props.game[2], "pointDeferential", 3, getDefaultValue)} </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

        </div>
    )
}

export default SingleRound;




