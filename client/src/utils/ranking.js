export const assending124 = (a, b) => {

    let pointA = 0, pointB = 0;
    if (a.round1) pointA += a.round1.point;
    if (a.round2) pointA += a.round2.point;
    if (a.round3) pointA += a.round3.point;
    if (a.round4) pointA += a.round4.point;



    if (b.round1) pointB += b.round1.point;
    if (b.round2) pointB += b.round2.point;
    if (b.round3) pointB += b.round3.point;
    if (b.round4) pointB += b.round4.point;



    if (pointA > pointB) {
        return -1;
    }
    if (pointB > pointA) {
        return 1
    }
    if (pointA === pointB) {
        // console.log();
        let pdta = 0;
        if (a.round1) { let pd = a.round1.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round2) { let pd = a.round2.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round3) { let pd = a.round3.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round4) { let pd = a.round4.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }




        let pdtb = 0;
        if (b.round1) { let pd = b.round1.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round2) { let pd = b.round2.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round3) { let pd = b.round3.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round4) { let pd = b.round4.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }





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



export const assending528 = (a, b) => {

    let pointA = 0, pointB = 0;
    if (a.round5) pointA += a.round5.point;
    if (a.round6) pointA += a.round6.point;
    if (a.round7) pointA += a.round7.point;
    if (a.round8) pointA += a.round8.point;



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
    if (pointA === pointB) {
        // console.log();
        let pdta = 0;
        if (a.round5) { let pd = a.round5.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round6) { let pd = a.round6.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round7) { let pd = a.round7.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }
        if (a.round8) { let pd = a.round8.pointDeferential.split('-'); pdta += parseInt(pd[0]) - parseInt(pd[1]); }




        let pdtb = 0;
        if (b.round5) { let pd = b.round5.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round6) { let pd = b.round6.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round7) { let pd = b.round7.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }
        if (b.round8) { let pd = b.round8.pointDeferential.split('-'); pdtb += parseInt(pd[0]) - parseInt(pd[1]); }





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