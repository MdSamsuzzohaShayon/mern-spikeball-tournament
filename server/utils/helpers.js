module.exports.sendUser = (user) => {
    return {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id,
    };
}


module.exports.replaceKeys = (object, eventID) => {
    Object.keys(object).forEach(function (key) {
        // const twoLower = key.toLowerCase();
        const removeSpace = key.replace(/\s+/g, '');
        const newKey = removeSpace.toString().toLowerCase();
        if (object[key] && typeof object[key] === 'object') {
            replaceKeys(object[key]);
        }
        if (key !== newKey) {
            object[newKey] = object[key];
            delete object[key];
        }
    });
    object.event = eventID
    return object;
}





module.exports.compareRanking = (a, b) => {
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
    if (pointA === pointB) {
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
