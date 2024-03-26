import React from 'react';
import { INet, IPerformance } from '../../types';

interface IArrangePerformer {
    performer: IPerformance[];
    gor: number;
    gameNum: number;
}

function ArrangePerformer({ performer, gor, gameNum}: IArrangePerformer) {


    const gameKey = `game${gameNum}`;

    const returnPerformer = (t1p1: IPerformance, t1p2: IPerformance, t2p1: IPerformance, t2p2: IPerformance) => {

        const team1Score = t1p1[gameKey].score
        const team2Score = t2p1[gameKey].score

        return (
            <div className="f-net d-flex flex-column text-center ">
                <div className="two-participant team-1">
                    <div className={`p-rival ${team1Score > team2Score ? "text-success" : "text-danger"}`}>{t1p1.participant.firstname} {t1p1.participant.lastname}  </div>
                    <div className={`p-rival ${team1Score > team2Score ? "text-success" : "text-danger"}`}>{t1p2.participant.firstname} {t1p2.participant.lastname}  </div>
                </div>
                <div className="vs text-uppercase">VS</div>
                <div className="two-participant team-2">
                    <div className={`p-rival ${team1Score > team2Score ? "text-danger" : "text-success"}`}>{t2p1.participant.firstname} {t2p1.participant.lastname}  </div>
                    <div className={`p-rival ${team1Score > team2Score ? "text-danger" : "text-success"}`}>{t2p2.participant.firstname} {t2p2.participant.lastname}  </div>
                </div>
            </div>);
    }



    if (performer.length < 4) {
        return (<div className="net-less-four">{(performer.map((p, j) => (<React.Fragment key={j}>
            <div className="short-net-player"><div className={`p-rival ${p[gameKey]?.point && p[gameKey]?.point > 0 && "text-success"}`}>{p.participant.firstname} {p.participant.lastname}  </div></div>
        </React.Fragment>
        )))}</div>);
    } else {
        if (gor === 1) {
            let one = performer[0], two = performer[1], three = performer[2], four = performer[3];
            // ONE & FOUR VS TWO & THREE 
            return returnPerformer(one, four, two, three);
        } else if (gor === 2) {
            let one = performer[0], two = performer[1], three = performer[2], four = performer[3];
            // 1 & 2 VS 3 & 4 
            return returnPerformer(one, two, three, four);
        } else if (gor === 3) {
            let one = performer[0], two = performer[1], three = performer[2], four = performer[3];
            // 1 & 3 VS 2 & 4 
            return returnPerformer(one, three, two, four);
        } else {
            return;
        }
    }
}

export default ArrangePerformer;