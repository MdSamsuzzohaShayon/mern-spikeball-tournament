
import { round1Total, round2Total, round3Total, round4Total, round5Total } from './addTotalPoint';
import { round1TD, round2TD, round3TD, round4TD, round5TD } from './pointDeferential';

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


let r = 0;
export const rankLoop = (net, i, rank) => {
    // rank ++;
    // console.log(rank);
    // console.log("Called");
    // r = r + 1;
    return net.performance.map((p, pi) => {
        // console.log("J - ", j);
        rank++;
        return rank;
    });
    // return <div>{i}</div>
}




// ⛏️⛏️ GET TOTAL POINT AND DIFERENTIAL FOR THIS ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const getTotal = (net, round, score) => {
    // console.log(net.performance.length);
    // console.log("Round - ", round);

    const roundwisePoint = (p) => {
        if (round === 2) {
            return <div className="total">{round2Total(p)}</div>
        } else if (round === 3) {
            return <div className="total">{round3Total(p)}</div>
        } else if (round === 4) {
            return <div className="total">{round4Total(p)}</div>
        } else if (round === 5) {
            return <div className="total">{round5Total(p)}</div>
        }
    }
    const roundwisePD = (p) => {
        if (round === 2) {
            return <div className="total">{round2TD(p)}</div>;
        } else if (round === 3) {
            return <div className="total">{round3TD(p)}</div>;
        } else if (round === 4) {
            return <div className="total">{round4TD(p)}</div>;
        } else if (round === 5) {
            return <div className="total">{round5TD(p)}</div>;
        }
    }



    if (net.performance.length < 4) {
        if (score === "point") {
            return net.performance.map((p, j) => (
                <div style={{ width: "100%", height: "100%" }} className="mt-4" key={j}>
                    {roundwisePoint(p)}
                </div>
            ));
        }
        if (score === "pointDeferential") {
            return net.performance.map((p, j) => (
                <div style={{ width: "100%", height: "100%" }} className="mt-4" key={j}>
                    {roundwisePD(p)}
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
                        <div className="total my-4">{round5Total(net.performance[0])}</div>
                        <div className="total my-4">{round5Total(net.performance[3])}</div>
                        <div className="total my-4">{round5Total(net.performance[1])}</div>
                        <div className="total my-4">{round5Total(net.performance[2])}</div>
                    </div>
                );
            }


        }
        if (score === "pointDeferential") {
            if (round === 2) {
                // console.log("Log negative");
                const t2td0 = parseInt(round2TD(net.performance[0]));
                const t2td3 = parseInt(round2TD(net.performance[3]));
                const t2td1 = parseInt(round2TD(net.performance[1]));
                const t2td2 = parseInt(round2TD(net.performance[2]));
                return (<div  >
                    {Math.sign(t2td0) === -1 ? <div className="total my-4 text-danger">{t2td0}</div> : <div className="total my-4 text-success">{t2td0}</div>}
                    {Math.sign(t2td3) === -1 ? <div className="total my-4 text-danger">{t2td3}</div> : <div className="total my-4 text-success">{t2td3}</div>}
                    {Math.sign(t2td1) === -1 ? <div className="total my-4 text-danger">{t2td1}</div> : <div className="total my-4 text-success">{t2td1}</div>}
                    {Math.sign(t2td2) === -1 ? <div className="total my-4 text-danger">{t2td2}</div> : <div className="total my-4 text-success">{t2td2}</div>}
                </div>
                );
            } else if (round === 3) {
                const t3td0 = parseInt(round3TD(net.performance[0]));
                const t3td3 = parseInt(round3TD(net.performance[3]));
                const t3td1 = parseInt(round3TD(net.performance[1]));
                const t3td2 = parseInt(round3TD(net.performance[2]));
                return (<div  >
                    {Math.sign(t3td0) === -1 ? <div className="total my-4 text-danger">{t3td0}</div> : <div className="total my-4 text-success">{t3td0}</div>}
                    {Math.sign(t3td3) === -1 ? <div className="total my-4 text-danger">{t3td3}</div> : <div className="total my-4 text-success">{t3td3}</div>}
                    {Math.sign(t3td1) === -1 ? <div className="total my-4 text-danger">{t3td1}</div> : <div className="total my-4 text-success">{t3td1}</div>}
                    {Math.sign(t3td2) === -1 ? <div className="total my-4 text-danger">{t3td2}</div> : <div className="total my-4 text-success">{t3td2}</div>}
                </div>
                );
            } else if (round === 4) {
                const t4td0 = parseInt(round4TD(net.performance[0]));
                const t4td3 = parseInt(round4TD(net.performance[3]));
                const t4td1 = parseInt(round4TD(net.performance[1]));
                const t4td2 = parseInt(round4TD(net.performance[2]));
                return (<div  >
                    {Math.sign(t4td0) === -1 ? <div className="total my-4 text-danger">{t4td0}</div> : <div className="total my-4 text-success">{t4td0}</div>}
                    {Math.sign(t4td3) === -1 ? <div className="total my-4 text-danger">{t4td3}</div> : <div className="total my-4 text-success">{t4td3}</div>}
                    {Math.sign(t4td1) === -1 ? <div className="total my-4 text-danger">{t4td1}</div> : <div className="total my-4 text-success">{t4td1}</div>}
                    {Math.sign(t4td2) === -1 ? <div className="total my-4 text-danger">{t4td2}</div> : <div className="total my-4 text-success">{t4td2}</div>}
                </div>
                );
            } else if (round === 5) {
                const t5td0 = parseInt(round5TD(net.performance[0]));
                const t5td3 = parseInt(round5TD(net.performance[3]));
                const t5td1 = parseInt(round5TD(net.performance[1]));
                const t5td2 = parseInt(round5TD(net.performance[2]));
                return (<div  >
                    {Math.sign(t5td0) === -1 ? <div className="total my-4 text-danger">{t5td0}</div> : <div className="total my-4 text-success">{t5td0}</div>}
                    {Math.sign(t5td3) === -1 ? <div className="total my-4 text-danger">{t5td3}</div> : <div className="total my-4 text-success">{t5td3}</div>}
                    {Math.sign(t5td1) === -1 ? <div className="total my-4 text-danger">{t5td1}</div> : <div className="total my-4 text-success">{t5td1}</div>}
                    {Math.sign(t5td2) === -1 ? <div className="total my-4 text-danger">{t5td2}</div> : <div className="total my-4 text-success">{t5td2}</div>}
                </div>
                );
            }
        }
    }
}







// gor = GAME OF ROUND
// ⛏️⛏️ CHOOSING WHO WILL PLAY AGAINEST WHO ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const arrangingPerformer = (performer, gor) => {
    // console.log("Game of round - ",gor);



    // console.log("-------------------------------------------------------------------------");
    if (performer.length < 4) {

        return (
            <div>
                {performer.map((p, j) => (
                    <div className="player-name" key={j}>{p.participant.firstname} {p.participant.lastname}</div>
                ))
                }
            </div>);
    } else {
        if (gor === 1) {
            // console.log(performer[0]);
            // console.log(performer[0].participant.firstname);            
            // console.log(performer[1].participant.firstname);            
            // console.log(performer[2].participant.firstname);            
            // console.log(performer[3].participant.firstname);            
            return (
                <div className="f-net d-flex flex-column text-center justify-space-between">
                    <div className="two-participant">
                        <div className="p-rival">{performer[0].participant.firstname} {performer[0].participant.lastname}  </div>
                        <div className="p-rival">{performer[3].participant.firstname} {performer[3].participant.lastname}  </div>
                    </div>
                    <div className="vs text-uppercase">VS</div>
                    <div className="two-participant">
                        <div className="p-rival">{performer[1].participant.firstname} {performer[1].participant.lastname}  </div>
                        <div className="p-rival">{performer[2].participant.firstname} {performer[2].participant.lastname}  </div>
                    </div>
                </div>);
        } else if (gor === 2) {
            return (
                <div className="f-net d-flex flex-column text-center justify-space-between">
                    <div className="two-participant">
                        <div className="p-rival">{performer[0].participant.firstname} {performer[0].participant.lastname}  </div>
                        <div className="p-rival">{performer[1].participant.firstname} {performer[1].participant.lastname}  </div>
                    </div>
                    <div className="vs text-uppercase">VS</div>
                    <div className="two-participant">
                        <div className="p-rival">{performer[2].participant.firstname} {performer[2].participant.lastname}  </div>
                        <div className="p-rival">{performer[3].participant.firstname} {performer[3].participant.lastname}  </div>
                    </div>
                </div>);
        } else if (gor === 3) {
            return (
                <div className="f-net d-flex flex-column text-center justify-space-between">
                    <div className="two-participant">
                        <div className="p-rival">{performer[0].participant.firstname} {performer[0].participant.lastname}  </div>
                        <div className="p-rival">{performer[2].participant.firstname} {performer[2].participant.lastname}  </div>
                    </div>
                    <div className="vs text-uppercase">VS</div>
                    <div className="two-participant">
                        <div className="p-rival">{performer[1].participant.firstname} {performer[1].participant.lastname}  </div>
                        <div className="p-rival">{performer[3].participant.firstname} {performer[3].participant.lastname}  </div>
                    </div>
                </div>);
        } else if (gor === 4) {

            // THIS IS FOR AVERAGE 
            return (
                <div className="f-net d-flex flex-column text-center justify-space-between">
                    <div className="p-rival">{performer[0].participant.firstname} {performer[0].participant.lastname}  </div>
                    <div className="p-rival">{performer[1].participant.firstname} {performer[1].participant.lastname}  </div>
                    <div className="p-rival">{performer[2].participant.firstname} {performer[2].participant.lastname}  </div>
                    <div className="p-rival">{performer[3].participant.firstname} {performer[3].participant.lastname}  </div>
                </div>);
        }
    }

}


