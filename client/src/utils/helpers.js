
import { round1Total, round2Total } from './addTotalPoint';
import { round1TD, round2TD } from './pointDeferential';

// ⛏️⛏️ SETTING DEFAULT VALUE OF INPUT  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const getDefaultValue = (p, scoreType, gameNum) => {
    if (scoreType === "point") {
        switch (gameNum) {
            case 4:
                if (p.game4 && p.game4 !== undefined) { return p.game4.point } else { return null };
            case 5:
                console.log("Game -5 ", p.game5);
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
}




// ⛏️⛏️ GET TOTAL POINT AND DIFERENTIAL FOR THIS ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const getTotal = (net, round, score) => {
    // console.log(net.performance.length);
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
            // return net.performance.map((p, j) => (
            //     <div style={{ width: "100%", height: "100%" }} className="mt-4" key={j}>
            //         <div className="total">{round2Total(p)}</div>
            //     </div>
            // ));
            return (
                <div >
                    <div className="total my-4">{round2Total(net.performance[0])}</div>
                    <div className="total my-4">{round2Total(net.performance[3])}</div>
                    <div className="total my-4">{round2Total(net.performance[1])}</div>
                    <div className="total my-4">{round2Total(net.performance[2])}</div>
                </div>
            );

        }
        if (score === "pointDeferential") {
            return (<div  >
                <div className="total my-4">{round2TD(net.performance[0])}</div>
                <div className="total my-4">{round2TD(net.performance[3])}</div>
                <div className="total my-4">{round2TD(net.performance[1])}</div>
                <div className="total my-4">{round2TD(net.performance[2])}</div>
            </div>
            );
        }
    }
}


