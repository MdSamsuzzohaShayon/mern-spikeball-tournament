import getDefaultValue from "./defaultValue";

// team1.player1, score, game, props.roundNum
// ⛏️⛏️ SETTING DEFAULT VALUE OF INPUT  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖


// let r = 0;
// export const rankLoop = (net, i, rank) => {
//     // rank ++;
//     // console.log(rank);
//     // console.log("Called");
//     // r = r + 1;
//     return net.performance.map((p, pi) => {
//         // console.log("J - ", j);
//         rank++;
//         return rank;
//     });
//     // return <div>{i}</div>
// }
















export const checkNegativePD = (val, cls) => {
    // <div className="pd-item">{getDefaultValue(net.performance[0], score, game, props.roundNum)}</div>
    if (Math.sign(val) === -1) {
        return <div className={`pd-item text-danger no-pd ${cls}`}>{val}</div>
    } if (Math.sign(val) === 1) {
        return <div className={`pd-item text-success got-pd ${cls}`}>{val}</div>
    } else {
        return <div className={`pd-item text-primary ${cls}`}>{val}</div>
    }
}



export const checkNegativeP = (val, d_cls) => {
    // Math.sign(getDefaultValue(one, score, game, props.roundNum)) === -1 
    if (val === 0) {
        return <div className={`p-item text-danger no-p ${d_cls}`}></div>
    } else if (Math.sign(val) >= 1) {
        return <div className={`p-item text-success got-p ${d_cls}`}>{val}</div>
    } else {
        return <div className={`p-item ${d_cls}`}></div>
    }
}
