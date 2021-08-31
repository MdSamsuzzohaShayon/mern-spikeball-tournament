import React from 'react';
import { totalPoint } from '../../utils/addTotalPoint';
import { totalDeferential } from '../../utils/pointDeferential';

const WholePerformance = (props) => {
    return (
        <React.Fragment>
            <li className="list-group-item d-flex align-items-center justify-content-between bg-dark text-light" >
                <div className="first-name">Ranking</div>
                <div className="first-name">Name</div>
                <div className="total-point">Total Point</div>
                <div className="total-point">Total Deferential</div>
            </li>
            <ol className="list-group list-group-numbered">
                {props.pp.map((p, i) => (
                    <li className="list-group-item d-flex align-items-center justify-content-between" key={i}>
                        <div className="first-name">{p.participant.firstname}</div>
                        <div className="total-point">{totalPoint(p)}</div>
                        <div className="total-point">{totalDeferential(p)}</div>
                    </li>
                ))}
            </ol>
        </React.Fragment>
    );
}

export default WholePerformance;
