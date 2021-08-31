import React from 'react';
import { totalPoint124 } from '../../utils/addTotalPoint';
import { totalDeferential124 } from '../../utils/pointDeferential';
import { assending124 } from '../../utils/ranking';

const Round124 = (props) => {
    const assendingPerformance = props.pp.sort(assending124);
    console.log(assendingPerformance);
    return (<React.Fragment>
        <li className="list-group-item d-flex align-items-center justify-content-between bg-dark text-light" >
            <div className="first-name">Ranking</div>
            <div className="first-name">Name</div>
            <div className="total-point">Total Point</div>
            <div className="total-point">Total Deferential</div>
        </li>
        <ol className="list-group list-group-numbered">
            {assendingPerformance.map((p, i) => (
                <li className="list-group-item d-flex align-items-center justify-content-between" key={i}>
                    <div className="first-name">{p.participant.firstname}</div>
                    <div className="total-point">{totalPoint124(p)}</div>
                    <div className="total-point">{totalDeferential124(p)}</div>
                </li>
            ))}
        </ol>
    </React.Fragment>);
}

export default Round124;
