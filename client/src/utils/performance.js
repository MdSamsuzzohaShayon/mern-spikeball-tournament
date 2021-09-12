import React from 'react';
// ALL CONDITIONS RELATED TO PERFORMANCE 
import {getTotalPointDifferentialOfARound, getTotalPointOfARound} from "./tptd";


export const showLiftedPefrormance = (lp, rn) => {
    // console.log(lp.length);
    if (lp && lp.length > 0) {
        return (<React.Fragment>
            <h2 className="h2">Players Who Leave</h2>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Point</th>
                        <th scope="col">Point Diferential</th>
                    </tr>
                </thead>
                <tbody>
                    {lp.map((p, i) => (<tr key={i} >
                        <td>{p.participant.firstname + " " + p.participant.lastname}</td>
                        <td>{getTotalPointOfARound(p, rn)}</td>
                        <td>{getTotalPointDifferentialOfARound(p, rn)}</td>
                    </tr>))}
                </tbody>
            </table>
        </React.Fragment>);
    }
}
