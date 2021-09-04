
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






function pdtR1(ab) {
    let pdt = 0;
    if (ab.game1) {
        let pd = ab.game1.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }

    if (ab.game2) {
        let pd = ab.game2.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }

    if (ab.game3) {
        let pd = ab.game3.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }
    return pdt;
}


function pdtR2(ab) {
    let pdt = 0;
    if (ab.game4) {
        let pd = ab.game4.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }

    if (ab.game5) {
        let pd = ab.game5.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }

    if (ab.game6) {
        let pd = ab.game6.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }
    return pdt;
}


function pdtR3(ab) {
    let pdt = 0;
    if (ab.game7) {
        let pd = ab.game7.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }

    if (ab.game8) {
        let pd = ab.game8.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }

    if (ab.game9) {
        let pd = ab.game9.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }
    return pdt;
}



function pdtR4(ab) {
    let pdt = 0;
    if (ab.game10) {
        let pd = ab.game10.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }

    if (ab.game11) {
        let pd = ab.game11.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }

    if (ab.game12) {
        let pd = ab.game12.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }
    return pdt;
}






module.exports.rankingRound1 = (a, b) => {
    let pointA = 0, pointB = 0;
    pointA = addR1(a);
    pointB = addR1(b);
    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {
        let pdta = 0, pdtb = 0;
        pdta = pdtR1(a);
        pdtb = pdtR1(b);
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


module.exports.rankingRound2 = (a, b) => {

    let pointA = 0, pointB = 0;
    pointA = addR1(a) + addR2(a);
    pointB = addR1(b) + addR2(b);
    // console.log(pointB);
    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {
        let pdta = 0, pdtb = 0;
        pdta = pdtR1(a) + pdtR2(a);
        pdtb = pdtR1(b) + pdtR2(b);
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

module.exports.rankingRound3 = (a, b) => {

    let pointA = 0, pointB = 0;
    pointA = addR1(a) + addR2(a) + addR3(a);
    pointB = addR1(b) + addR2(b) + addR3(b);
    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {
        let pdta = 0, pdtb = 0;
        pdta = pdtR1(a) + pdtR2(a) + pdtR3(a);
        pdtb = pdtR1(b) + pdtR2(b) + pdtR3(b);
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

module.exports.rankingRound4 = (a, b) => {

    let pointA = 0, pointB = 0;
    pointA = addR1(a) + addR2(a) + addR3(a) + addR4(a);
    pointB = addR1(b) + addR2(b) + addR3(b) + addR4(b);
    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {
        let pdta = 0, pdtb = 0;
        pdta = pdtR1(a) + pdtR2(a) + pdtR3(a) + pdtR4(a);
        pdtb = pdtR1(b) + pdtR2(b) + pdtR3(b) + pdtR4(b);
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




module.exports.wholeRanking = (a, b) => {
    let pointA = 0, pointB = 0;
    if (a.round1) pointA += a.round1.point;
    if (a.round2) pointA += a.round2.point;
    if (a.round3) pointA += a.round3.point;
    if (a.round4) pointA += a.round4.point;

    if (a.round5) pointA += a.round5.point;
    if (a.round6) pointA += a.round6.point;
    if (a.round7) pointA += a.round7.point;
    if (a.round8) pointA += a.round8.point;

    if (a.round9) pointA += a.round9.point;
    if (a.round10) pointA += a.round10.point;
    if (a.round11) pointA += a.round11.point;
    if (a.round12) pointA += a.round12.point;

    if (a.round13) pointA += a.round13.point;
    if (a.round14) pointA += a.round14.point;
    if (a.round15) pointA += a.round15.point;



    if (b.round1) pointB += b.round1.point;
    if (b.round2) pointB += b.round2.point;
    if (b.round3) pointB += b.round3.point;
    if (b.round4) pointB += b.round4.point;

    if (b.round5) pointB += b.round5.point;
    if (b.round6) pointB += b.round6.point;
    if (b.round7) pointB += b.round7.point;
    if (b.round8) pointB += b.round8.point;

    if (b.round9) pointB += b.round9.point;
    if (b.round10) pointB += b.round10.point;
    if (b.round11) pointB += b.round11.point;
    if (b.round12) pointB += b.round12.point;

    if (b.round13) pointB += b.round13.point;
    if (b.round14) pointB += b.round14.point;
    if (b.round15) pointB += b.round15.point;


    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {
        // console.log();
        let pdta = 0;
        if (a.round1) { let pd = a.round1.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round2) { let pd = a.round2.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round3) { let pd = a.round3.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round4) { let pd = a.round4.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }

        if (a.round5) { let pd = a.round5.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round6) { let pd = a.round6.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round7) { let pd = a.round7.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round8) { let pd = a.round8.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }

        if (a.round9) { let pd = a.round9.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round10) { let pd = a.round10.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round11) { let pd = a.round11.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round12) { let pd = a.round12.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }

        if (a.round13) { let pd = a.round13.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round14) { let pd = a.round14.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round15) { let pd = a.round15.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }








        let pdtb = 0;
        if (b.round1) { let pd = b.round1.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round2) { let pd = b.round2.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round3) { let pd = b.round3.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round4) { let pd = b.round4.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }

        if (b.round5) { let pd = b.round5.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round6) { let pd = b.round6.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round7) { let pd = b.round7.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round8) { let pd = b.round8.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }

        if (b.round9) { let pd = b.round9.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round10) { let pd = b.round10.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round11) { let pd = b.round11.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round12) { let pd = b.round12.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }

        if (b.round13) { let pd = b.round13.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round14) { let pd = b.round14.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round15) { let pd = b.round15.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }




        // console.log("PDTA - " + pdta + " ; PDTB - " + pdtb);



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














module.exports.rankingRoundNine = (a, b) => {
    // console.log("A - ", a);
    // console.log("B - ", b);
    // { point: 1, pointDeferential: '14-12', _id: 612ba52101aa740bfefc8e2f }
    let pointA = 0, pointB = 0;
    if (a.round1) pointA += a.round1.point;
    if (a.round2) pointA += a.round2.point;
    if (a.round3) pointA += a.round3.point;
    if (a.round4) pointA += a.round4.point;
    if (a.round5) pointA += a.round5.point;
    if (a.round6) pointA += a.round6.point;
    if (a.round7) pointA += a.round7.point;
    if (a.round8) pointA += a.round8.point;


    if (b.round1) pointB += b.round1.point;
    if (b.round2) pointB += b.round2.point;
    if (b.round3) pointB += b.round3.point;
    if (b.round4) pointB += b.round4.point;
    if (b.round5) pointB += b.round5.point;
    if (b.round6) pointB += b.round6.point;
    if (b.round7) pointB += b.round7.point;
    if (b.round8) pointB += b.round8.point;





    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {

        let pdta = 0;
        if (a.round1) { let pd = a.round1.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round2) { let pd = a.round2.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round3) { let pd = a.round3.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round4) { let pd = a.round4.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round5) { let pd = a.round5.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round6) { let pd = a.round6.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round7) { let pd = a.round7.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round8) { let pd = a.round8.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }


        let pdtb = 0;
        if (b.round1) { let pd = b.round1.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round2) { let pd = b.round2.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round3) { let pd = b.round3.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round4) { let pd = b.round4.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }

        if (b.round5) { let pd = b.round5.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round6) { let pd = b.round6.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round7) { let pd = b.round7.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round8) { let pd = b.round8.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }




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





module.exports.rankingRoundThirteen = (a, b) => {
    // console.log("A - ", a);
    // console.log("B - ", b);
    // { point: 1, pointDeferential: '14-12', _id: 612ba52101aa740bfefc8e2f }
    let pointA = 0, pointB = 0;
    if (a.round1) pointA += a.round1.point;
    if (a.round2) pointA += a.round2.point;
    if (a.round3) pointA += a.round3.point;
    if (a.round4) pointA += a.round4.point;
    if (a.round5) pointA += a.round5.point;
    if (a.round6) pointA += a.round6.point;
    if (a.round7) pointA += a.round7.point;
    if (a.round8) pointA += a.round8.point;
    if (a.round9) pointA += a.round9.point;
    if (a.round10) pointA += a.round10.point;
    if (a.round11) pointA += a.round11.point;
    if (a.round12) pointA += a.round12.point;


    if (b.round1) pointB += b.round1.point;
    if (b.round2) pointB += b.round2.point;
    if (b.round3) pointB += b.round3.point;
    if (b.round4) pointB += b.round4.point;
    if (b.round5) pointB += b.round5.point;
    if (b.round6) pointB += b.round6.point;
    if (b.round7) pointB += b.round7.point;
    if (b.round8) pointB += b.round8.point;
    if (b.round9) pointB += b.round9.point;
    if (b.round10) pointB += b.round10.point;
    if (b.round11) pointB += b.round11.point;
    if (b.round12) pointB += b.round12.point;





    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {

        let pdta = 0;
        if (a.round1) { let pd = a.round1.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round2) { let pd = a.round2.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round3) { let pd = a.round3.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round4) { let pd = a.round4.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round5) { let pd = a.round5.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round6) { let pd = a.round6.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round7) { let pd = a.round7.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round8) { let pd = a.round8.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round9) { let pd = a.round9.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round10) { let pd = a.round10.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round11) { let pd = a.round11.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round12) { let pd = a.round12.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }


        let pdtb = 0;
        if (b.round1) { let pd = b.round1.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round2) { let pd = b.round2.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round3) { let pd = b.round3.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round4) { let pd = b.round4.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }

        if (b.round5) { let pd = b.round5.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round6) { let pd = b.round6.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round7) { let pd = b.round7.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round8) { let pd = b.round8.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round9) { let pd = b.round9.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round10) { let pd = b.round10.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round11) { let pd = b.round11.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round12) { let pd = b.round12.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }




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




// rankingRoundThirteen


