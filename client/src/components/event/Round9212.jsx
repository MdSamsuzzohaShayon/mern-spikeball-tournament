import React from 'react';
import { totalPoint9212 } from '../../utils/addTotalPoint';
import { totalDeferential9212 } from '../../utils/pointDeferential';
import { assending9212 } from '../../utils/ranking';

const Round9212 = (props) => {
    const assendingPerformance = props.pp.sort(assending9212);
    // console.log(assendingPerformance);
    return (
        <React.Fragment>
            <table className="table table-bordered table-striped table-hover">
                <thead className="thead-dark bg-dark text-light">
                    <tr>
                        <th scope="col">Ranking</th>
                        <th scope="col">Name</th>
                        <th scope="col">Total Point</th>
                        <th scope="col">Total Deferential</th>
                    </tr>
                </thead>
                <tbody>
                    {assendingPerformance.map((p, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{p.participant.firstname}</td>
                            <td>{totalPoint9212(p)}</td>
                            <td>{totalDeferential9212(p)}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </React.Fragment>
    );
}

export default Round9212;
