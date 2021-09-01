import React from 'react';
import { round1Total } from '../../utils/addTotalPoint';
import { round1TD } from '../../utils/pointDeferential';
import { assending124 } from '../../utils/ranking';

const Round1 = (props) => {
    const assendingPerformance = props.pp.sort(assending124);
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
                            <td>{round1Total(p)}</td>
                            <td>{round1TD(p)}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </React.Fragment>
    );
}

export default Round1;
