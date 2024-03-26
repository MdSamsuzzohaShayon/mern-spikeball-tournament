import React from 'react';
import { POINT, POINT_DIFFERENTIAL, SCORE, hostname, } from "../../utils/global";
import { handleScoreUpdate, handleExtraWinningPointChange, } from "../../utils/inputChange";
import { playersExtraPoint, playersPoint, playersPointDifferential, playersScore, } from "../../utils/allPerformers";
import { arrangingPerformer, serializePerformer, } from "../../utils/arrangePerformer";
import { getTotalPPD } from "../../utils/getTotalPPD";
import { INet, IUpdateScore } from '../../types';
import TeamScoreInput from '../score/TeamScoreInput';

interface INetOfARound {
    game: number[];
    nets: INet[];
    roundNum: number;
    rankPerformanceInNet: any;
    token: string;
    eventID: string;
}

function NetOfARound(props: INetOfARound) {

    return (
        <div className="show-all-nets">
            {/* PLAYER GAME, SCORE, POINT, POINT DIFFRENTIAL  */}
            <div className="table-responsive-lg net-table">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr className="header-group-1">
                            <th colSpan={2} scope="colgroup"></th>
                            <th colSpan={4} scope="colgroup">
                                Game {props.game[0]}
                            </th>
                            <th colSpan={4} scope="colgroup">
                                Game {props.game[1]}
                            </th>
                            <th colSpan={4} scope="colgroup">
                                Game {props.game[2]}
                            </th>
                            <th colSpan={3} scope="colgroup">
                                Total
                            </th>
                        </tr>
                        <tr className="header-group-2">
                            <th scope="col">Net</th>
                            <th> <button type="button" className="btn btn-secondary p-0 m-0 bg-transparent text-white border-0 btn-outline-transparent" data-bs-toggle="tooltip" data-bs-placement="top" title="Winning point" onClick={(e) => e.preventDefault()}>
                                W/P
                            </button>
                            </th>
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
                            <th scope="col">Participant</th>
                            <th scope="col">point</th>
                            <th scope="col">point differential</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.nets &&
                            props.nets.map((net, i) => (
                                <tr key={i} className="horizontal-border">
                                    <th scope="row">Net {net.sl || i + 1}</th>
                                    <td> {playersExtraPoint(net, handleExtraWinningPointChange, props.roundNum, net.wp)}</td>

                                    <td>{arrangingPerformer(net.performance, 1, props.game[0], POINT_DIFFERENTIAL, props.roundNum)}</td>
                                    <td><TeamScoreInput key={`tsi-1`} net={net} gameNum={props.game[0]} gor={1} roundNum={props.roundNum} scoreType={SCORE} /></td>
                                    <td>{playersPoint(net, props.game[0], POINT, 1, props.roundNum)} </td>
                                    <td>{playersPointDifferential(net, props.game[0], POINT_DIFFERENTIAL, 1, props.roundNum)}</td>

                                    <td>{arrangingPerformer(net.performance, 2, props.game[1], POINT_DIFFERENTIAL, props.roundNum)} </td>
                                    <td><TeamScoreInput key={`tsi-2`} net={net} gameNum={props.game[1]} gor={2} roundNum={props.roundNum} scoreType={SCORE} /></td>
                                    <td>{playersPoint(net, props.game[1], POINT, 2, props.roundNum)}</td>
                                    <td>{playersPointDifferential(net, props.game[1], POINT_DIFFERENTIAL, 2, props.roundNum)}</td>


                                    <td>{arrangingPerformer(net.performance, 3, props.game[2], POINT_DIFFERENTIAL, props.roundNum)}</td>
                                    <td><TeamScoreInput key={`tsi-3`} net={net} gameNum={props.game[2]} gor={1} roundNum={props.roundNum} scoreType={SCORE} /></td>
                                    <td> {playersPoint(net, props.game[2], POINT, 3, props.roundNum)}</td>
                                    <td>{playersPointDifferential(net, props.game[2], POINT_DIFFERENTIAL, 3, props.roundNum)}</td>


                                    <td> {serializePerformer(props.rankPerformanceInNet[i])}</td>
                                    <td>{getTotalPPD(props.rankPerformanceInNet[i], POINT, props.roundNum)}</td>
                                    <td>{getTotalPPD(props.rankPerformanceInNet[i], POINT_DIFFERENTIAL, props.roundNum)}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NetOfARound;