import React from 'react';
import { totalPoint13215 } from '../../utils/addTotalPoint';
import { totalDeferential13215 } from '../../utils/pointDeferential';
import { assending13215 } from '../../utils/ranking';

const Round13215 = (props) => {
    const assendingPerformance = props.pp.sort(assending13215);
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
                            <td>{totalPoint13215(p)}</td>
                            <td>{totalDeferential13215(p)}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </React.Fragment>
    );
}

export default Round13215;
