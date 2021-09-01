import React from 'react';
import { totalPoint528 } from '../../utils/addTotalPoint';
import { totalDeferential528 } from '../../utils/pointDeferential';
import { assending528 } from '../../utils/ranking';

const Round528 = (props) => {
    const assendingPerformance = props.pp.sort(assending528);
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
                            <td>{totalPoint528(p)}</td>
                            <td>{totalDeferential528(p)}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </React.Fragment>
    );
}

export default Round528;
