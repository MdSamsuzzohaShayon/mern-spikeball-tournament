
import { round1Total, round2Total, round3Total, round4Total } from './addTotalPoint';
import { round1TD, round2TD, round3TD, round4TD } from './pointDeferential';

// ⛏️⛏️ SETTING DEFAULT VALUE OF INPUT  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const getDefaultValue = (p, scoreType, gameNum, roundNum) => {
    // console.log("Performance - ", p);
    if (roundNum === 2) {
        if (scoreType === "point") {
            switch (gameNum) {
                case 4:
                    if (p.game4 && p.game4 !== undefined) { return p.game4.point } else { return null };
                case 5:
                    // console.log("Game -5 ", p.game5);
                    if (p.game5 && p.game5 !== undefined) { return p.game5.point } else { return null };
                case 6:
                    if (p.game6 && p.game6 !== undefined) { return p.game6.point } else { return null };
            }
        }

        if (scoreType === "pointDeferential") {
            // console.log(p, round2.pointDeferential);
            switch (gameNum) {
                case 4:
                    if (p.game4 && p.game4 !== undefined) { return p.game4.pointDeferential } else { return null };
                case 5:
                    if (p.game5 && p.game5 !== undefined) { return p.game5.pointDeferential } else { return null };
                case 6:
                    if (p.game6 && p.game6 !== undefined) { return p.game6.pointDeferential } else { return null };
            }
        }
    } else if (roundNum === 3) {
        if (scoreType === "point") {
            switch (gameNum) {
                case 7:
                    if (p.game7 && p.game7 !== undefined) { return p.game7.point } else { return null };
                case 8:
                    // console.log("Game -8 ", p.game8);
                    if (p.game8 && p.game8 !== undefined) { return p.game8.point } else { return null };
                case 9:
                    if (p.game9 && p.game9 !== undefined) { return p.game9.point } else { return null };
            }
        }

        if (scoreType === "pointDeferential") {
            // console.log(p, round2.pointDeferential);
            switch (gameNum) {
                case 7:
                    if (p.game7 && p.game7 !== undefined) { return p.game7.pointDeferential } else { return null };
                case 8:
                    if (p.game8 && p.game8 !== undefined) { return p.game8.pointDeferential } else { return null };
                case 9:
                    if (p.game9 && p.game9 !== undefined) { return p.game9.pointDeferential } else { return null };
            }
        }
    } else if (roundNum === 4) {
        if (scoreType === "point") {
            switch (gameNum) {
                case 10:
                    if (p.game10 && p.game10 !== undefined) { return p.game10.point } else { return null };
                case 11:
                    // console.log("Game -11 ", p.game11);
                    if (p.game11 && p.game11 !== undefined) { return p.game11.point } else { return null };
                case 12:
                    if (p.game12 && p.game12 !== undefined) { return p.game12.point } else { return null };
            }
        }

        if (scoreType === "pointDeferential") {
            // console.log(p, round2.pointDeferential);
            switch (gameNum) {
                case 10:
                    if (p.game10 && p.game10 !== undefined) { return p.game10.pointDeferential } else { return null };
                case 11:
                    if (p.game11 && p.game11 !== undefined) { return p.game11.pointDeferential } else { return null };
                case 12:
                    if (p.game12 && p.game12 !== undefined) { return p.game12.pointDeferential } else { return null };
            }
        }
    } else if (roundNum === 5) {
        if (scoreType === "point") {
            switch (gameNum) {
                case 13:
                    if (p.game13 && p.game13 !== undefined) { return p.game13.point } else { return null };
                case 14:
                    // console.log("Game -14 ", p.game14);
                    if (p.game14 && p.game14 !== undefined) { return p.game14.point } else { return null };
                case 15:
                    if (p.game15 && p.game15 !== undefined) { return p.game15.point } else { return null };
            }
        }

        if (scoreType === "pointDeferential") {
            // console.log(p, round2.pointDeferential);
            switch (gameNum) {
                case 13:
                    if (p.game13 && p.game13 !== undefined) { return p.game13.pointDeferential } else { return null };
                case 14:
                    if (p.game14 && p.game14 !== undefined) { return p.game14.pointDeferential } else { return null };
                case 15:
                    if (p.game15 && p.game15 !== undefined) { return p.game15.pointDeferential } else { return null };
            }
        }
    }

}




// ⛏️⛏️ GET TOTAL POINT AND DIFERENTIAL FOR THIS ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const getTotal = (net, round, score) => {
    // console.log(net.performance.length);
    // console.log("Round - ", round);
    if (net.performance.length < 4) {
        if (score === "point") {
            return net.performance.map((p, j) => (
                <div style={{ width: "100%", height: "100%" }} className="mt-4" key={j}>
                    <div className="total">{round2Total(p)}</div>
                </div>
            ));
        }
        if (score === "pointDeferential") {
            return net.performance.map((p, j) => (
                <div style={{ width: "100%", height: "100%" }} className="mt-4" key={j}>
                    <div className="total">{round2TD(p)}</div>
                </div>
            ));
        }
    } else {
        if (score === "point") {
            if (round === 2) {
                return (
                    <div >
                        <div className="total my-4">{round2Total(net.performance[0])}</div>
                        <div className="total my-4">{round2Total(net.performance[3])}</div>
                        <div className="total my-4">{round2Total(net.performance[1])}</div>
                        <div className="total my-4">{round2Total(net.performance[2])}</div>
                    </div>
                );
            } else if (round === 3) {
                return (
                    <div >
                        <div className="total my-4">{round3Total(net.performance[0])}</div>
                        <div className="total my-4">{round3Total(net.performance[3])}</div>
                        <div className="total my-4">{round3Total(net.performance[1])}</div>
                        <div className="total my-4">{round3Total(net.performance[2])}</div>
                    </div>
                );
            } else if (round === 4) {
                return (
                    <div >
                        <div className="total my-4">{round4Total(net.performance[0])}</div>
                        <div className="total my-4">{round4Total(net.performance[3])}</div>
                        <div className="total my-4">{round4Total(net.performance[1])}</div>
                        <div className="total my-4">{round4Total(net.performance[2])}</div>
                    </div>
                );
            } else if (round === 5) {
                return (
                    <div >
                        <div className="total my-4">{round4Total(net.performance[0])}</div>
                        <div className="total my-4">{round4Total(net.performance[3])}</div>
                        <div className="total my-4">{round4Total(net.performance[1])}</div>
                        <div className="total my-4">{round4Total(net.performance[2])}</div>
                    </div>
                );
            }


        }
        if (score === "pointDeferential") {
            if (round === 2) {
                return (<div  >
                    <div className="total my-4">{round2TD(net.performance[0])}</div>
                    <div className="total my-4">{round2TD(net.performance[3])}</div>
                    <div className="total my-4">{round2TD(net.performance[1])}</div>
                    <div className="total my-4">{round2TD(net.performance[2])}</div>
                </div>
                );
            } else if (round === 3) {
                return (<div  >
                    <div className="total my-4">{round3TD(net.performance[0])}</div>
                    <div className="total my-4">{round3TD(net.performance[3])}</div>
                    <div className="total my-4">{round3TD(net.performance[1])}</div>
                    <div className="total my-4">{round3TD(net.performance[2])}</div>
                </div>
                );
            } else if (round === 4) {
                return (<div  >
                    <div className="total my-4">{round4TD(net.performance[0])}</div>
                    <div className="total my-4">{round4TD(net.performance[3])}</div>
                    <div className="total my-4">{round4TD(net.performance[1])}</div>
                    <div className="total my-4">{round4TD(net.performance[2])}</div>
                </div>
                );
            } else if (round === 5) {
                return (<div  >
                    <div className="total my-4">{round3TD(net.performance[0])}</div>
                    <div className="total my-4">{round3TD(net.performance[3])}</div>
                    <div className="total my-4">{round3TD(net.performance[1])}</div>
                    <div className="total my-4">{round3TD(net.performance[2])}</div>
                </div>
                );
            }
        }
    }
}








// ⛏️⛏️ CHOOSING WHO WILL PLAY AGAINEST WHO ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const arrangingPerformer = (performer) => {

    if (performer.length < 4) {
        // console.log(performer);

        return (
            <div>
                {performer.map((p, j) => (
                    <div className="player-name" key={j}>{p.participant.firstname} {p.participant.lastname}</div>
                ))
                }
            </div>);
    } else {
        // console.log(performer[0]);
        return (
            <div className="f-net d-flex flex-column text-center justify-space-between">
                <div className="two-participant">
                    <div className="f-rival-item">{performer[0].participant.firstname} {performer[0].participant.lastname}  </div>
                    <div className="vs text-uppercase">VS</div>
                    <div className="f-rival-item">{performer[3].participant.firstname} {performer[3].participant.lastname}  </div>
                </div>
                <div className="two-participant">
                    <div className="f-rival-item">{performer[1].participant.firstname} {performer[1].participant.lastname}  </div>
                    <div className="vs text-uppercase">VS</div>
                    <div className="f-rival-item">{performer[2].participant.firstname} {performer[2].participant.lastname}  </div>
                </div>
            </div>);
    }

}

