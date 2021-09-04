
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



function pdtR5(ab) {
    let pdt = 0;
    if (ab.game13) {
        let pd = ab.game13.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }

    if (ab.game14) {
        let pd = ab.game14.pointDeferential.split('-');
        pdt += parseInt(pd[0]) - parseInt(pd[1]);
    }

    if (ab.game15) {
        let pd = ab.game15.pointDeferential.split('-');
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










