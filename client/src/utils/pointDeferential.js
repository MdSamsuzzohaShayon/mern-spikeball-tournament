export const totalDeferential = (performance) => {
    let deferential = 0;
    try {
        deferential = round1TD(performance) + round2TD(performance) + round3TD(performance) + round4TD(performance);

        if (performance.game13) { let pd = performance.game13.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        if (performance.game14) { let pd = performance.game14.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        if (performance.game15) { let pd = performance.game15.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
    } catch (error) {
        console.log(error);
    }
    // console.log();


    return deferential;
}




export const round1TD = (performance) => {
    let deferential = 0;
    try {

        if (performance.game1) { let pd = performance.game1.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        if (performance.game2) { let pd = performance.game2.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        if (performance.game3) { let pd = performance.game3.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
    } catch (error) {
        console.log(error);
    }
    // console.log();


    return deferential;
}


export const round2TD = (performance) => {
    let deferential = 0;
    try {

        if (performance.game4) { let pd = performance.game4.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        if (performance.game5) { let pd = performance.game5.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        if (performance.game6) { let pd = performance.game6.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
    } catch (error) {
        console.log(error);
    }
    // console.log();


    return deferential;
}



export const round3TD = (performance) => {
    let deferential = 0;
    try {

        if (performance.game7) { let pd = performance.game7.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        if (performance.game8) { let pd = performance.game8.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        if (performance.game9) { let pd = performance.game9.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
    } catch (error) {
        console.log(error);
    }
    // console.log();


    return deferential;
}




export const round4TD = (performance) => {
    let deferential = 0;
    try {

        if (performance.game10) { let pd = performance.game10.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        if (performance.game11) { let pd = performance.game11.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        if (performance.game12) { let pd = performance.game12.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
    } catch (error) {
        console.log(error);
    }
    // console.log();


    return deferential;
}




export const round5TD = (performance) => {
    let deferential = 0;
    try {

        if (performance.game13) { let pd = performance.game13.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        if (performance.game14) { let pd = performance.game14.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
        if (performance.game15) { let pd = performance.game15.pointDeferential.split('-'); deferential += parseInt(pd[0]) - parseInt(pd[1]); }
    } catch (error) {
        console.log(error);
    }
    // console.log();


    return deferential;
}

