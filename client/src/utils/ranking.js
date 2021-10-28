
function addR1(ab) {
    let pointA = 0;
    if (ab.game1) pointA += ab.game1.point; if (ab.game2) pointA += ab.game2.point; if (ab.game3) pointA += ab.game3.point;
    return pointA;
}





function addR2(ab) {
    let pointA = 0;
    if (ab.game4) pointA += ab.game4.point; if (ab.game5) pointA += ab.game5.point; if (ab.game6) pointA += ab.game6.point;
    return pointA;
}





function addR3(ab) {
    let pointA = 0;
    if (ab.game7) pointA += ab.game7.point; if (ab.game8) pointA += ab.game8.point; if (ab.game9) pointA += ab.game9.point;
    return pointA;
}



function addR4(ab) {
    let pointA = 0;
    if (ab.game10) pointA += ab.game10.point; if (ab.game11) pointA += ab.game11.point; if (ab.game12) pointA += ab.game12.point;
    return pointA;
}


function addR5(ab) {
    let pointA = 0;
    if (ab.game13) pointA += ab.game13.point; if (ab.game14) pointA += ab.game14.point; if (ab.game15) pointA += ab.game15.point;
    return pointA;
}





function pdtR1(ab) {
    let pdt = 0;
    if (ab.game1) pdt += ab.game1.pointDeferential;
    if (ab.game2) pdt += ab.game2.pointDeferential;
    if (ab.game3) pdt += ab.game3.pointDeferential;
    return pdt;
}


function pdtR2(ab) {
    let pdt = 0;
    if (ab.game4) pdt += ab.game4.pointDeferential;
    if (ab.game5) pdt += ab.game5.pointDeferential
    if (ab.game6) pdt += ab.game6.pointDeferential;
    return pdt;
}


function pdtR3(ab) {
    let pdt = 0;
    if (ab.game7) pdt += ab.game7.pointDeferential;
    if (ab.game8) pdt += ab.game8.pointDeferential;
    if (ab.game9) pdt += ab.game9.pointDeferential;
    return pdt;
}



function pdtR4(ab) {
    let pdt = 0;
    if (ab.game10) pdt += ab.game10.pointDeferential;
    if (ab.game11) pdt += ab.game11.pointDeferential;
    if (ab.game12) pdt += ab.game12.pointDeferential;
    return pdt;
}



function pdtR5(ab) {
    let pdt = 0;
    if (ab.game13) pdt += ab.game13.pointDeferential;
    if (ab.game14) pdt += ab.game14.pointDeferential;
    if (ab.game15) pdt += ab.game15.pointDeferential;
    return pdt;
}










export const rankingRound1 = (a, b) => {

    let pointA = 0, pointB = 0;
    pointA = addR1(a);
    pointB = addR1(b);
    // console.log(pointA);
    // console.log(pointB);
    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {
        let pdta = 0, pdtb = 0;
        pdta = pdtR2(a);
        pdtb = pdtR2(b);
        if (pdta > pdtb) {
            return -1;
        }
        if (pdta < pdtb) {
            return 1;
        }
        return 0;

    }
    return 0;
}







// RANKING ROUND2 INDIVIDUAL 
export const rankingRound2 = (a, b) => {

    let pointA = 0, pointB = 0;
    pointA = addR2(a);
    pointB = addR2(b);
    // console.log(pointA);
    // console.log(pointB);
    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {
        let pdta = 0, pdtb = 0;
        pdta = pdtR2(a);
        pdtb = pdtR2(b);
        if (pdta > pdtb) {
            return -1;
        }
        if (pdta < pdtb) {
            return 1;
        }
        return 0;

    }
    return 0;
}





export const rankingRound3 = (a, b) => {

    let pointA = 0, pointB = 0;
    pointA = addR3(a);
    pointB = addR3(b);
    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {
        let pdta = 0, pdtb = 0;
        pdta = pdtR3(a);
        pdtb = pdtR3(b);
        if (pdta > pdtb) {
            return -1;
        }
        if (pdta < pdtb) {
            return 1;
        }
        return 0;

    }
    return 0;
}






export const rankingRound4 = (a, b) => {

    let pointA = 0, pointB = 0;
    pointA = addR4(a);
    pointB = addR4(b);
    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1;
    }
    if (pointA == pointB) {
        let pdta = 0, pdtb = 0;
        pdta = pdtR4(a);
        pdtb = pdtR4(b);
        if (pdta > pdtb) {
            return -1;
        }
        if (pdta < pdtb) {
            return 1;
        }
        return 0;

    }
    return 0;
}



// RANK SEQUENTIALLY 
// module.exports.rankingRound5 = (a, b) => {

//     let pointA = 0, pointB = 0;
//     pointA = addR1(a) + addR2(a) + addR3(a) + addR4(a) + addR5(a);
//     pointB = addR1(b) + addR2(b) + addR3(b) + addR4(b) + addR5(b);
//     if (pointA > pointB) {
//         return -1;
//     }
//     if (pointB > pointA) {
//         return 1;
//     }
//     if (pointA == pointB) {
//         let pdta = 0, pdtb = 0;
//         pdta = pdtR1(a) + pdtR2(a) + pdtR3(a) + pdtR4(a) + pdtR5(a);
//         pdtb = pdtR1(b) + pdtR2(b) + pdtR3(b) + pdtR4(b) + pdtR5(b);
//         if (pdta > pdtb) {
//             return -1;
//         }
//         if (pdta < pdtb) {
//             return 1;
//         }
//         return 0;

//     }
//     return 0;
// }



export const rankingRound5 = (a, b) => {

    let pointA = 0, pointB = 0;
    pointA = addR5(a);
    pointB = addR5(b);
    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {
        let pdta = 0, pdtb = 0;
        pdta = pdtR5(a);
        pdtb = pdtR5(b);
        if (pdta > pdtb) {
            return -1;
        }
        if (pdta < pdtb) {
            return 1;
        }
        return 0;

    }
    return 0;
}




export const wholeRanking = (a, b) => {
    let pointA = 0, pointB = 0;
    pointA = addR1(a) + addR2(a) + addR3(a) + addR4(a) + addR5(a);
    pointB = addR1(b) + addR2(b) + addR3(b) + addR4(b) + addR5(b);
    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {
        let pdta = 0, pdtb = 0;
        pdta = pdtR1(a) + pdtR2(a) + pdtR3(a) + pdtR4(a) + pdtR5(a);
        pdtb = pdtR1(b) + pdtR2(b) + pdtR3(b) + pdtR4(b) + pdtR5(b);
        if (pdta > pdtb) {
            return -1;
        }
        if (pdta < pdtb) {
            return 1;
        }
        return 0;

    }
    return 0;
}






export const netRanking = (rankPerformanceInNet, roundNum) => {
    const netRank = [];
    for (let i = 0; i < rankPerformanceInNet.length; i++) {
        if (roundNum === 1) {
            netRank.push(rankPerformanceInNet[i].performance.sort(rankingRound1));
            // console.log("Sorted - ", roundNum);
        } else if (roundNum === 2) {
            // console.log("Sorted - ", roundNum);
            netRank.push(rankPerformanceInNet[i].performance.sort(rankingRound2));
        } else if (roundNum === 3) {
            netRank.push(rankPerformanceInNet[i].performance.sort(rankingRound3));
        } else if (roundNum === 4) {
            netRank.push(rankPerformanceInNet[i].performance.sort(rankingRound4));
        } else if (roundNum === 5) {
            netRank.push(rankPerformanceInNet[i].performance.sort(rankingRound5));
        }
    }
    return netRank;
}










