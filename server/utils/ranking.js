
module.exports.rankingRound = (a, b) => {
    // console.log("A - ", a);
    // console.log("B - ", b);
    // { point: 1, pointDeferential: '14-12', _id: 612ba52101aa740bfefc8e2f }
    let pointA = 0, pointB = 0;
    if (a.round1) pointA += a.round1.point; if (a.round2) pointA += a.round2.point; if (a.round3) pointA += a.round3.point; if (a.round4) pointA += a.round4.point;
    if (b.round1) pointB += b.round1.point; if (b.round2) pointB += b.round2.point; if (b.round3) pointB += b.round3.point; if (b.round4) pointB += b.round4.point;
    // console.log(pointB);
    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA == pointB) {
        // console.log();
        let pdta1 = 0, pdta2 = 0, pdta3 = 0, pdta4 = 0;
        if (a.round1) {
            let pd = a.round1.pointDeferential.split('-');
            pdta1 = parseInt(pd[0]) - parseInt(pd[1]);
        }

        if (a.round2) {
            let pd = a.round2.pointDeferential.split('-');
            pdta2 = parseInt(pd[0]) - parseInt(pd[1]);
        }

        if (a.round3) {
            let pd = a.round3.pointDeferential.split('-');
            pdta3 = parseInt(pd[0]) - parseInt(pd[1]);
        }

        if (a.round4) {
            let pd = a.round4.pointDeferential.split('-');
            pdta4 = parseInt(pd[0]) - parseInt(pd[1]);
        }




        let pdtb1 = 0, pdtb2 = 0, pdtb3 = 0, pdtb4 = 0;
        if (b.round1) {
            let pd = b.round1.pointDeferential.split('-');
            pdtb1 = parseInt(pd[0]) - parseInt(pd[1]);
        }

        if (b.round2) {
            let pd = b.round2.pointDeferential.split('-');
            pdtb2 = parseInt(pd[0]) - parseInt(pd[1]);
        }

        if (b.round3) {
            let pd = b.round3.pointDeferential.split('-');
            pdtb3 = parseInt(pd[0]) - parseInt(pd[1]);
        }

        if (b.round4) {
            let pd = b.round4.pointDeferential.split('-');
            pdtb4 = parseInt(pd[0]) - parseInt(pd[1]);
        }



        let pdta = pdta1 + pdta2 + pdta3 + pdta4;
        let pdtb = pdtb1 + pdtb2 + pdtb3 + pdtb4;


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




        console.log("PDTA - " + pdta + " ; PDTB - " + pdtb);



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
