import React, { useState } from 'react';
import { POINT, POINT_DIFFERENTIAL } from '../../utils/global';
import ArrangePerformer from '../participant/ArrangePerformer';
import PlayersPointField from './PlayerPointField';
import PlayersPointDifferential from '../participant/PlayersPointDifferential';


function RoundTable(props) {
    const { nets } = props.round;

    return (
        <div className="RoundTable">
            <div className="show-all-nets">
                {!props.initialize && (
                    <div className="table-responsive-lg net-table ">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr className="header-group-1">
                                    <th colSpan={1} scope="colgroup"></th>
                                    <th colSpan={3} scope="colgroup">Game {props.game[0]}</th>
                                    <th colSpan={3} scope="colgroup">Game {props.game[1]}</th>
                                    <th colSpan={3} scope="colgroup">Game {props.game[2]}</th>
                                </tr>
                                <tr className="header-group-2">
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

                                </tr>
                            </thead>
                            <tbody>
                                {nets && nets.map((net, i) => (
                                    <tr key={i} className="horizontal-border">
                                        <th scope="row">Net {net.sl || i + 1}</th>
                                        <td><ArrangePerformer key={`ap-1`} gameNum={props.game[0]} gor={1} performer={net.performance} /></td>
                                        <td><PlayersPointField key={`ppf-1`} gameNum={props.game[0]} gor={1} net={net} /> </td>
                                        <td><PlayersPointDifferential gameNum={props.game[0]} gor={1} net={net}/></td>

                                        <td><ArrangePerformer gameNum={props.game[1]} gor={2} performer={net.performance} /></td>
                                        <td><PlayersPointField key={`ppf-2`} gameNum={props.game[1]} gor={2} net={net} /> </td>
                                        <td><PlayersPointDifferential gameNum={props.game[1]} gor={2} net={net}/></td>

                                        <td><ArrangePerformer gameNum={props.game[2]} gor={3} performer={net.performance} /></td>
                                        <td><PlayersPointField key={`ppf-3`} gameNum={props.game[2]} gor={3} net={net} /> </td>
                                        <td><PlayersPointDifferential gameNum={props.game[2]} gor={3} net={net}/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RoundTable;




