import React from 'react'; // Import React
import { SCORE, hostname } from '../../utils/global';
import { INet, IPerformance, ITeam } from '../../types';
import { handleRequestUnauthenticated } from '../../utils/auth';


interface ITeamScoreInput {
    net: INet;
    gameNum: number;
    scoreType: string;
    gor: number;
    handleScoreUpdate: (innerGN: number, netID: string, winningPoint: number | null, score?: number, myTeam?: string[], opTeam?: string[]) => void; // innerGN = game number
}

interface IChangeInputProps {
    e: React.SyntheticEvent;
    innerGN: number;
    netID: string;
    myTeam: string[];
    opTeam?: string[];
    individual?: boolean;
}

const TeamScoreInput = ({ net, gameNum, scoreType, gor, handleScoreUpdate }: ITeamScoreInput) => {

    const gameKey = `game${gameNum}`;

    const handleChangeInput = ({ e, innerGN, netID, myTeam, opTeam }: IChangeInputProps) => {
        e.preventDefault();
        const inputEl = e.target as HTMLInputElement;
        if (!inputEl.value || inputEl.value === '') return;
        const currScore = parseInt(inputEl.value, 10);

        handleScoreUpdate(innerGN, netID, null, currScore, myTeam, opTeam);
    }

    const returnScore = (t1p1: IPerformance, t1p2: IPerformance, t2p1: IPerformance, t2p2: IPerformance) => {
        console.log(t1p1);

        const team1 = [t1p1._id, t1p2._id], team2 = [t2p1._id, t2p2._id];
        const t1p1default = t1p1[gameKey]?.score ? t1p1[gameKey]?.score : '';
        const t2p1default = t2p1[gameKey]?.score ? t2p1[gameKey]?.score : '';

        return (
            <div className="player-score d-flex flex-column">
                <div className="two-p-input two-p-i-1">
                    <input className="form-control input-score" type="number"
                        onChange={e => handleChangeInput({ e, innerGN: gameNum, netID: net._id, myTeam: team1, opTeam: team2 })}
                        defaultValue={t1p1default} />
                </div>
                <div className="line"></div>

                <div className="two-p-input two-p-i-2">
                    <input className="form-control input-score" type="number"
                        onChange={e => handleChangeInput({ e, innerGN: gameNum, netID: net._id, myTeam: team2, opTeam: team1 })}
                        defaultValue={t2p1default} />
                </div>
            </div>
        );
    }

    if (scoreType === SCORE) {
        if (net.performance.length < 4) {
            return (
                <div className="net-less-four">
                    {net.performance.map((p, j) => (
                        <div className="short-net-player player-score" key={j}>
                            <input
                                type="number"
                                className="form-control input-score-no-net"
                                defaultValue={p[gameKey]?.score ? p[gameKey]?.score : ''}
                                style={{ width: "80px" }}
                                onChange={e => handleChangeInput({ e, innerGN: gameNum, netID: net._id, myTeam: [p._id] })}
                            />
                        </div>
                    ))}
                </div>
            );
        } else {
            if (gor === 1) {
                // 1ST & 4TH VS 2ND & 3RD 
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return returnScore(one, four, two, three);
            } else if (gor === 2) {
                // 1ST & 2ND VS 3RD & 4TH 
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return returnScore(one, two, three, four);
            } else if (gor === 3) {
                // 1ST & 3RD VS 2ND & 4TH 
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return returnScore(one, three, two, four);
            }
        }
    }

    return null; // Return null if none of the conditions match
}

export default TeamScoreInput; // Export the component