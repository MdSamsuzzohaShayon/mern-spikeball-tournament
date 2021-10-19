import React from 'react';
import { checkNegativePD } from './helpers';
import { POINT, POINT_DIFFERENTIAL, SCORE, EXTRA_POINT } from './global';
import getDefaultValue from './defaultValue';
// gor = GAME OF ROUND 
// ⛏️⛏️ INPUT FIELD FOR ALL PARTICIPANT OR PERFORMANCE  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
const playersExtraPoint = (net, game, scoreType, gor, handleExtraWinningPointChange, addExtra, showInput, roundNum, winningExtraPoint, setWinningExtraPoint) => {
    // console.log(net.performance);
    // console.log("s - ", scoreType);
    // console.log(props.round);
    // console.log("Game - ", game, props.game);


    if (scoreType === EXTRA_POINT) {
        const checkDefaultVal = (defaultVal, selectedTeam, shortNet, j) => {

            // if (shortNet === true) classList = classList + " short-net-player";
            if (shortNet === true) {
                if (defaultVal && defaultVal <= 1) {
                    return (
                        <div className="extra d-flex short-net-player" key={j}>
                            <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, selectedTeam, game, roundNum)} className="extra-icon" />
                            <input type="text" style={{ display: showInput(selectedTeam, game, roundNum) }}
                                onChange={e => handleExtraWinningPointChange(e, game, scoreType, net._id, selectedTeam, shortNet, winningExtraPoint, setWinningExtraPoint)} className="extra-input form-control" />
                        </div>
                    );
                } else {
                    return <div className="extra" key={j}></div>;
                }
            } else {
                if (defaultVal && defaultVal <= 1) {
                    return (
                        <div className="extra d-flex" >
                            <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, selectedTeam, game, roundNum)} className="extra-icon" />
                            <input type="text" style={{ display: showInput(selectedTeam, game, roundNum) }}
                                onChange={e => handleExtraWinningPointChange(e, game, scoreType, net._id, selectedTeam, shortNet, winningExtraPoint, setWinningExtraPoint)} className="extra-input form-control" />
                        </div>
                    );
                } else {
                    return <div className="extra" ></div>;
                }
            }

        }


        if (net.performance.length < 4) {
            // return (<div className="net-less-four">{net.performance.map((p, j) => <div className="short-net-player" key={j}>  <input type="text" className="form-control extra-point" onChange={e => handleInputChange(e, null, game, scoreType, net._id, true, null, p._id, false, null)} /> </div>)}</div>);
            return (<div className="net-less-four">{net.performance.map((p, j) => checkDefaultVal(getDefaultValue(p, POINT, game, roundNum), [p._id], true, j))}</div>);

        } else {

            if (gor === 1) {
                // 1ST & 4TH VS 2ND  4TH 
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return (<div className="player-score d-flex flex-column">
                    <div className="two-p-input two-p-i-1">
                        {checkDefaultVal(getDefaultValue(one, POINT, game, roundNum), [one._id, four._id], false, null)}
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2">
                        {checkDefaultVal(getDefaultValue(two, POINT, game, roundNum), [two._id, three._id], false, null)}
                    </div>
                </div>);
            }


            else if (gor === 2) {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                // 1ST & 2ND VS 3RD & 4TH 
                return (<div className="player-score d-flex flex-column">
                    <div className="two-p-input two-p-i-1">
                        {checkDefaultVal(getDefaultValue(one, POINT, game, roundNum), [one._id, two._id], false, null)}
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2">
                        {checkDefaultVal(getDefaultValue(three, POINT, game, roundNum), [three._id, four._id], false, null)}
                    </div>
                </div>);
            } else if (gor === 3) {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                // 1ST VS 3RD & 2ND VS 4TH 
                return (<div className="player-score d-flex flex-column">
                    <div className="two-p-input two-p-i-1">
                        {checkDefaultVal(getDefaultValue(one, POINT, game, roundNum), [one._id, three._id], false, null)}
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2">
                        {checkDefaultVal(getDefaultValue(two, POINT, game, roundNum), [two._id, four._id], false, null)}
                    </div>
                </div>);
            }
        }
    }





}


// net, props.game[2], POINT, 3, getDefaultValue, props.roundNum
const playersPoint = (net, game, scoreType, gor, roundNum) => {
    if (scoreType === POINT) {
        if (net.performance.length < 4) {
            return (<div className="net-less-four">{(net.performance.map((p, j) => (
                <div className="short-net-player" key={j}>
                    {getDefaultValue(p, scoreType, game, roundNum) < 1 ? null : (<div className="text-success">{getDefaultValue(p, scoreType, game, roundNum)}</div>)}
                </div>
            )))}</div>);

        } else {
            if (gor === 1) {
                // 1ST & 4TH VS 2ND  4TH 
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return (<div className="players-in-net">
                    <div className="two-p-input two-p-input-1">
                        {getDefaultValue(one, scoreType, game, roundNum) < 1 ? <div className="text-danger"></div> : (<div className="text-success">{getDefaultValue(one, scoreType, game, roundNum)}</div>)}
                        {getDefaultValue(four, scoreType, game, roundNum) < 1 ? <div className="text-danger"></div> : (<div className="text-success">{getDefaultValue(four, scoreType, game, roundNum)}</div>)}
                    </div>

                    <div className="line"></div>

                    <div className="two-p-input two-p-input-2 ">
                        {getDefaultValue(two, scoreType, game, roundNum) < 1 ? <div className="text-danger"></div> : (<div className="text-success">{getDefaultValue(two, scoreType, game, roundNum)}</div>)}
                        {getDefaultValue(three, scoreType, game, roundNum) < 1 ? <div className="text-danger"></div> : (<div className="text-success">{getDefaultValue(three, scoreType, game, roundNum)}</div>)}
                    </div>
                </div>);

            } else if (gor === 2) {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                // 1ST & 2ND VS 3RD & 4TH 
                return (<div className="players-in-net">
                    <div className="two-p-input two-p-input-1">
                        {getDefaultValue(one, scoreType, game, roundNum) < 1 ? <div className="text-danger"></div> : (<div className="text-success">{getDefaultValue(one, scoreType, game, roundNum)}</div>)}
                        {getDefaultValue(two, scoreType, game, roundNum) < 1 ? <div className="text-danger"></div> : (<div className="text-success">{getDefaultValue(two, scoreType, game, roundNum)}</div>)}
                    </div>

                    <div className="line"></div>

                    <div className="two-p-input two-p-input-2 ">
                        {getDefaultValue(three, scoreType, game, roundNum) < 1 ? <div className="text-danger"></div> : (<div className="text-success">{getDefaultValue(three, scoreType, game, roundNum)}</div>)}
                        {getDefaultValue(four, scoreType, game, roundNum) < 1 ? <div className="text-danger"></div> : (<div className="text-success">{getDefaultValue(four, scoreType, game, roundNum)}</div>)}
                    </div>
                </div>);
            } else if (gor === 3) {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                // 1ST VS 3RD & 2ND VS 4TH 
                return (<div className="players-in-net">
                    <div className="two-p-input two-p-input-1">
                        {getDefaultValue(one, scoreType, game, roundNum) < 1 ? <div className="text-danger"></div> : (<div className="text-success">{getDefaultValue(one, scoreType, game, roundNum)}</div>)}
                        {getDefaultValue(three, scoreType, game, roundNum) < 1 ? <div className="text-danger"></div> : (<div className="text-success">{getDefaultValue(three, scoreType, game, roundNum)}</div>)}
                    </div>

                    <div className="line"></div>

                    <div className="two-p-input two-p-input-2 ">
                        {getDefaultValue(two, scoreType, game, roundNum) < 1 ? <div className="text-danger"></div> : (<div className="text-success">{getDefaultValue(two, scoreType, game, roundNum)}</div>)}
                        {getDefaultValue(four, scoreType, game, roundNum) < 1 ? <div className="text-danger"></div> : (<div className="text-success">{getDefaultValue(four, scoreType, game, roundNum)}</div>)}
                    </div>
                </div>);
            }
        }
    }
}




//net, props.game[2], POINT_DIFFERENTIAL, 3, props.roundNum
const playersPointDifferential = (net, game, scoreType, gor, roundNum) => {
    if (scoreType === POINT_DIFFERENTIAL) {
        if (net.performance.length < 4) {
            return (<div className="net-less-four">{(net.performance.map((p, j) => (
                <div className="short-net-player" key={j}>{getDefaultValue(p, scoreType, game, roundNum)}</div>
            )))}</div>);
        } else {
            if (gor === 1) {
                // 1ST & 4TH VS 2ND  4TH 
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return (<div className="players-in-net">
                    <div className="two-p-input two-p-i-1">
                        {checkNegativePD(getDefaultValue(one, scoreType, game, roundNum), "pd-i-1")}
                        {checkNegativePD(getDefaultValue(four, scoreType, game, roundNum), "pd-i-2")}
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2">
                        {checkNegativePD(getDefaultValue(two, scoreType, game, roundNum), "pd-i-1")}
                        {checkNegativePD(getDefaultValue(three, scoreType, game, roundNum), "pd-i-2")}
                    </div>
                </div>);
            } else if (gor === 2) {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return (<div className="player-point-differential d-flex flex-column">
                    <div className="two-p-input two-p-i-1">
                        {checkNegativePD(getDefaultValue(one, scoreType, game, roundNum), "pd-i-1")}
                        {checkNegativePD(getDefaultValue(two, scoreType, game, roundNum), "pd-i-2")}
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2">
                        {checkNegativePD(getDefaultValue(three, scoreType, game, roundNum), "pd-i-1")}
                        {checkNegativePD(getDefaultValue(four, scoreType, game, roundNum), "pd-i-2")}
                    </div>
                </div>);
            } else if (gor === 3) {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return (<div className="player-point-differential d-flex flex-column">
                    <div className="two-p-input two-p-i-1">
                        {checkNegativePD(getDefaultValue(one, scoreType, game, roundNum), "pd-i-1")}
                        {checkNegativePD(getDefaultValue(three, scoreType, game, roundNum), "pd-i-2")}
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2">
                        {checkNegativePD(getDefaultValue(two, scoreType, game, roundNum), "pd-i-1")}
                        {checkNegativePD(getDefaultValue(four, scoreType, game, roundNum), "pd-i-2")}
                    </div>
                </div>);
            }
        }
    }

}




// net, props.game[0], SCORE, 1, handleScoreChange, getDefaultValue, props
// gor= GAME OF ROUND 
const playersScore = (net, gor, scoreType, game, handleScoreChange, roundNum, updateScore, setUpdateScore) => {

    if (scoreType === SCORE) {
        if (net.performance.length < 4) {
            return (<div className="net-less-four"> {(net.performance.map((p, j) => (
                <div className="short-net-player player-score" key={j}>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={getDefaultValue(p, scoreType, game, roundNum)}
                        style={{ width: "80px" }} name={net.sl}
                        // e, game, netID, scoreType, team, oponent, updateScore, setUpdateScore
                        onChange={e => handleScoreChange(e, game, net._id, scoreType, [p._id], null, null, updateScore, setUpdateScore, true)}
                    />
                </div>
            )))} </div>);
        } else {
            // console.log("player 1 - ", net.performance[0]._id);
            // console.log("player 2 - ", net.performance[1]._id);
            // console.log("player 3 - ", net.performance[2]._id);
            // console.log("player 4 - ", net.performance[3]._id);

            if (gor === 1) {
                // 1ST & 4TH VS 2ND & 4TH 
                const team1 = [net.performance[0]._id, net.performance[3]._id];
                const team2 = [net.performance[1]._id, net.performance[2]._id];
                return (<div className="player-score d-flex flex-column">
                    <div className="two-p-input two-p-i-1">
                        <input className="form-control" type="text"
                            onChange={e => handleScoreChange(e, game, net._id, scoreType, team1, team2, true, updateScore, setUpdateScore, false)}
                            defaultValue={getDefaultValue(net.performance[0], scoreType, game, roundNum)} />
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2">
                        <input className="form-control" type="text"
                            onChange={e => handleScoreChange(e, game, net._id, scoreType, team2, team1, false, updateScore, setUpdateScore, false)}
                            defaultValue={getDefaultValue(net.performance[1], scoreType, game, roundNum)} />
                    </div>
                </div>);
            }





            // UNCOMMENT IT 
            else if (gor === 2) {
                // 1ST & 2ND VS 3RD & 4TH 
                const team1 = [net.performance[0]._id, net.performance[1]._id];
                const team2 = [net.performance[2]._id, net.performance[3]._id];
                return (<div className="player-score d-flex flex-column">
                    <div className="two-p-input two-p-i-1">
                        <input className="form-control" type="text"
                            onChange={e => handleScoreChange(e, game, net._id, scoreType, team1, team2, true, updateScore, setUpdateScore, false)}
                            defaultValue={getDefaultValue(net.performance[0], scoreType, game, roundNum)} />
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2">
                        <input className="form-control" type="text"
                            onChange={e => handleScoreChange(e, game, net._id, scoreType, team2, team1, false, updateScore, setUpdateScore, false)}
                            defaultValue={getDefaultValue(net.performance[2], scoreType, game, roundNum)} />
                    </div>
                </div>);

            } else if (gor === 3) {
                // 1ST & 3RD VS 2ND & 4TH 
                const team1 = [net.performance[0]._id, net.performance[2]._id];
                const team2 = [net.performance[1]._id, net.performance[3]._id];
                return (<div className="player-score d-flex flex-column">
                    <div className="two-p-input two-p-i-1">
                        <input className="form-control" type="text"
                            onChange={e => handleScoreChange(e, game, net._id, scoreType, team1, team2, true, updateScore, setUpdateScore, false)}
                            defaultValue={getDefaultValue(net.performance[0], scoreType, game, roundNum)} />
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2">
                        <input className="form-control" type="text"
                            onChange={e => handleScoreChange(e, game, net._id, scoreType, team2, team1, false, updateScore, setUpdateScore, false)}
                            defaultValue={getDefaultValue(net.performance[1], scoreType, game, roundNum)} />
                    </div>
                </div>);
            }










        }
    }

}




export { playersExtraPoint, playersPoint, playersPointDifferential, playersScore };