import { POINT, POINT_DIFFERENTIAL } from "./global";
import { round1Total, round2Total, round3Total, round4Total, round5Total, totalPoint } from './addTotalPoint';
import { round1TD, round2TD, round3TD, round4TD, round5TD, totalDeferential } from './pointDeferential';

// ⛏️⛏️ GET TOTAL POINT AND DIFERENTIAL FOR THIS ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const getTotal = (net, round, score) => {
    // console.log(net.performance.length);
    // console.log("Round - ", round);

    const roundwisePoint = (p) => {
        if (round === 1) {
            return <div className="total">{round1Total(p)}</div>
        } else if (round === 2) {
            return <div className="total">{round1Total(p) + round2Total(p)}</div>
        } else if (round === 3) {
            return <div className="total">{round1Total(p) + round2Total(p) + round3Total(p)}</div>
        } else if (round === 4) {
            return <div className="total">{round1Total(p) + round2Total(p) + round3Total(p) + round4Total(p)}</div>
        } else if (round === 5) {
            return <div className="total">{round1Total(p) + round2Total(p) + round3Total(p) + round4Total(p) + round5Total(p)}</div>
        }
    }
    const roundwisePD = (p) => {
        if (round === 1) {
            return <div className="total">{round1TD(p)}</div>;
        } else if (round === 2) {
            return <div className="total">{round1TD(p) + round2TD(p)}</div>;
        } else if (round === 3) {
            return <div className="total">{round1TD(p) + round2TD(p) + round3TD(p)}</div>;
        } else if (round === 4) {
            return <div className="total">{round1TD(p) + round2TD(p) + round3TD(p) + round4TD(p)}</div>;
        } else if (round === 5) {
            return <div className="total">{round1TD(p) + round2TD(p) + round3TD(p) + round4TD(p) + round5TD(p)}</div>;
        }
    }



    if (net.performance.length < 4) {
        if (score === POINT) {
            return net.performance.map((p, j) => (
                <div style={{ width: "100%", height: "100%" }} className="mt-4" key={j}>
                    {roundwisePoint(p)}
                </div>
            ));
        }
        if (score === POINT_DIFFERENTIAL) {
            return net.performance.map((p, j) => (
                <div style={{ width: "100%", height: "100%" }} className="mt-4" key={j}>
                    {roundwisePD(p)}
                </div>
            ));
        }
    } else {
        if (score === POINT) {
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
        if (score === POINT_DIFFERENTIAL) {
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



// ⛏️⛏️ GET TOTAL POINT AND DIFERENTIAL FOR THIS ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const getTotalPPD = (net, score) => {
    // console.log(net.performance.length);
    // console.log("Round - ", round);

    // const totalPoint = (p) => {
    //     return <div className="total">{round5Total(p)}</div>
    // }
    // const totalPD = (p) => {
    //     return <div className="total">{round5TD(p)}</div>;
    // }



    if (score === POINT) {
        return net.performance.map((p, j) => {
            // console.log("P");
            // console.log(p);
            // console.log(p.nog);
            // console.log("Total - ",totalPoint(p));
            if (Math.sign(totalPoint(p)) === 1) {
                return <div className="mt-4 text-success" key={j}>{totalPoint(p).toFixed(2)}</div>;
            } else if (Math.sign(totalPoint(p)) === (-1)) {
                return <div className="mt-4 text-danger" key={j}>{totalPoint(p).toFixed(2)}</div>;
            } else {
                return <div className="mt-4" key={j}>{totalPoint(p).toFixed(2)}</div>;
            }
        });
    }

    if (score === POINT_DIFFERENTIAL) {
        // return net.performance.map((p, j) => (
        //     <div style={{ width: "100%", height: "100%" }} className="mt-4" key={j}>
        //         {totalDeferential(p).toFixed(2)}
        //         {/* {(totalDeferential(p) / p.nog).toFixed(2)} */}
        //     </div>
        // )
        // );
        return net.performance.map((p, j) => {
            if (Math.sign(totalDeferential(p)) === 1) {
                return <div className="mt-4 text-success" key={j}>{totalDeferential(p).toFixed(2)}</div>;
            } else if (Math.sign(totalDeferential(p)) === (-1)) {
                return <div className="mt-4 text-danger" key={j}>{totalDeferential(p).toFixed(2)}</div>;
            } else {
                return <div className="mt-4" key={j}>{totalDeferential(p).toFixed(2)}</div>;
            }
        }
        );
    }
}
