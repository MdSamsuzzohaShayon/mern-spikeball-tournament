import React from 'react';
import { round1Total, round2Total, round3Total, round4Total, totalPoint } from '../../utils/addTotalPoint';
import { round1TD, round2TD, round3TD, round4TD, totalDeferential } from '../../utils/pointDeferential';


const Round1 = (props) => {
    // console.log(props);

    const addWithRound = (roundNum, p) => {
        switch (roundNum) {
            case 1:
                return (<React.Fragment>
                    <td> {round1Total(p)}</td>
                    <td>{round1TD(p)}</td>
                </React.Fragment>);
            case 2:
                return (<React.Fragment>
                    <td> {round2Total(p)}</td>
                    <td>{round2TD(p)}</td>
                </React.Fragment>);
            case 3:
                return (<React.Fragment>
                    <td> {round3Total(p)}</td>
                    <td>{round3TD(p)}</td>
                </React.Fragment>);
            case 4:
                return (<React.Fragment>
                    <td> {round4Total(p)}</td>
                    <td>{round4TD(p)}</td>
                </React.Fragment>);
            case 5:
                return (<React.Fragment>
                    <td> {totalPoint(p)}</td>
                    <td>{totalDeferential(p)}</td>
                </React.Fragment>);

            default:
                break;
        }

    }

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
                    {props.pp.map((p, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{p.participant.firstname} </td>
                            {addWithRound(props.roundNum, p)}
                        </tr>
                    ))}

                </tbody>
            </table>
        </React.Fragment>
    );
}

export default Round1;
