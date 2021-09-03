import React from 'react';
import { totalPoint } from '../../utils/addTotalPoint';
import { totalDeferential } from '../../utils/pointDeferential';

const WholePerformance = (props) => {
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
                {props.pp.map((p, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{p.participant.firstname} {p.participant.lastname}</td>
                            <td>{totalPoint(p)}</td>
                            <td>{totalDeferential(p)}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </React.Fragment>
    );
}

export default WholePerformance;
