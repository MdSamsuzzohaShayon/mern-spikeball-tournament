
const Net = require('../models/Net');
const Performance = require('../models/Performance');



// pu, round, pu.extra, pu.netID, doc
module.exports.updatedExtraPerformance = (wxp, roundNum, netID, doc) => {
    // console.log("extra performance - ", wxp);
    // const extra_performance = {
    //     pId: '61524bd34cd211193b3359ed',
    //     score: null,
    //     game: 5,
    //     netID: '6152c4002b8f64183aeb8f20',
    //     extraPoint: true,
    //     extra: 0.12
    // };

    // console.log("round num - ", roundNum);
    // console.log("extra point - ", extraPoint);
    // console.log("Net id - ", netID);
    // console.log("doc - ", doc);
    const basePoint = 0;
    // const extra = wxp.extraPoint;
    // return;


    if (roundNum == 1) {
        switch (wxp.game) {
            case 1:
                let game1 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game1) {
                    if (doc.game1.point) game1.point = doc.game1.point;
                    if (doc.game1.score) game1.score = doc.game1.score;
                    if (doc.game1.pointDeferential) game1.pointDeferential = doc.game1.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game1.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game1 }
            case 2:
                let game2 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game2) {
                    if (doc.game2.point) game2.point = doc.game2.point;
                    if (doc.game2.score) game2.score = doc.game2.score;
                    if (doc.game2.pointDeferential) game2.pointDeferential = doc.game2.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game2.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game2 }
            case 3:
                let game3 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game3) {
                    if (doc.game3.point) game3.point = doc.game3.point;
                    if (doc.game3.score) game3.score = doc.game3.score;
                    if (doc.game3.pointDeferential) game3.pointDeferential = doc.game3.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game3.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game3 }
        }
    } else if (roundNum == 2) {
        switch (wxp.game) {
            case 4:
                let game4 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game4) {
                    if (doc.game4.point) game4.point = doc.game4.point;
                    if (doc.game4.score) game4.score = doc.game4.score;
                    if (doc.game4.pointDeferential) game4.pointDeferential = doc.game4.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game4.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game4 }
            case 5:
                let game5 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game5) {
                    if (doc.game5.point) game5.point = doc.game5.point;
                    if (doc.game5.score) game5.score = doc.game5.score;
                    if (doc.game5.pointDeferential) game5.pointDeferential = doc.game5.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game5.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game5 }
            case 6:
                let game6 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game6) {
                    if (doc.game6.point) game6.point = doc.game6.point;
                    if (doc.game6.score) game6.score = doc.game6.score;
                    if (doc.game6.pointDeferential) game6.pointDeferential = doc.game6.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game6.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game6 }
        }
    } else if (roundNum == 3) {
        switch (wxp.game) {
            case 7:
                let game7 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game7) {
                    if (doc.game7.point) game7.point = doc.game7.point;
                    if (doc.game7.score) game7.score = doc.game7.score;
                    if (doc.game7.pointDeferential) game7.pointDeferential = doc.game7.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game7.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game7 }
            case 8:
                let game8 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game8) {
                    if (doc.game8.point) game8.point = doc.game8.point;
                    if (doc.game8.score) game8.score = doc.game8.score;
                    if (doc.game8.pointDeferential) game8.pointDeferential = doc.game8.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game2.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game2 }
            case 9:
                let game9 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game9) {
                    if (doc.game9.point) game9.point = doc.game9.point;
                    if (doc.game9.score) game9.score = doc.game9.score;
                    if (doc.game9.pointDeferential) game9.pointDeferential = doc.game9.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game9.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game9 }
        }
    } else if (roundNum == 4) {
        switch (wxp.game) {
            case 10:
                let game10 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game10) {
                    if (doc.game10.point) game10.point = doc.game10.point;
                    if (doc.game10.score) game10.score = doc.game10.score;
                    if (doc.game10.pointDeferential) game10.pointDeferential = doc.game10.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game10.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game10 }
            case 11:
                let game11 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game11) {
                    if (doc.game11.point) game11.point = doc.game11.point;
                    if (doc.game11.score) game11.score = doc.game11.score;
                    if (doc.game11.pointDeferential) game11.pointDeferential = doc.game11.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game11.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game11 }

            case 12:
                let game12 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game12) {
                    if (doc.game12.point) game12.point = doc.game12.point;
                    if (doc.game12.score) game12.score = doc.game12.score;
                    if (doc.game12.pointDeferential) game12.pointDeferential = doc.game12.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game12.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game12 }
        }
    } else if (roundNum == 5) {
        switch (wxp.game) {
            case 13:
                let game13 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game13) {
                    if (doc.game13.point) game13.point = doc.game13.point;
                    if (doc.game13.score) game13.score = doc.game13.score;
                    if (doc.game13.pointDeferential) game13.pointDeferential = doc.game13.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game13.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game13 }
            case 14:
                let game14 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game14) {
                    if (doc.game14.point) game14.point = doc.game14.point;
                    if (doc.game14.score) game14.score = doc.game14.score;
                    if (doc.game14.pointDeferential) game14.pointDeferential = doc.game14.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game14.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game14 }
            case 15:
                let game15 = new Object();

                // SET VALUE FROM DATABASE 
                if (doc.game15) {
                    if (doc.game15.point) game15.point = doc.game15.point;
                    if (doc.game15.score) game15.score = doc.game15.score;
                    if (doc.game15.pointDeferential) game15.pointDeferential = doc.game15.pointDeferential;
                }

                // SET OR CHANGE VALUE FROM USER INPUT 
                if (wxp.extraPoint || wxp.extraPoint === 0) game15.point = basePoint + wxp.extraPoint;
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game15 }
        }
    }
}


                                    // us, round, team1Score, t1p, t1pd, us.netID
module.exports.updatedPerformance = (ut, roundNum, score, tp, tpd, netID) => {
    // console.log("Update performace - ", ut);
    if (roundNum == 1) {
        switch (ut.game) {
            case 1:
                let game1 = new Object();
                game1.score = score;
                game1.point = tp;
                game1.pointDeferential = tpd;
                return { game1 }
            /*
             let game1 = new Object();
             if (score !== 0) {
                 game1.point = tp
                 game1.pointDeferential =tpd;
                 game1.score = score
             }else{
                 if (doc.game1) {
                     if (doc.game1.point) game1.point = doc.game1.point;
                     if (doc.game1.score) game1.score = doc.game1.score;
                     if (doc.game1.pointDeferential) game1.pointDeferential = doc.game1.pointDeferential;
                 }
             };

             // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
             return { game1 }
             */
            case 2:
                let game2 = new Object();
                game2.score = score;
                game2.point = tp;
                game2.pointDeferential = tpd;
                return { game2 }
            case 3:
                let game3 = new Object();
                game3.score = score;
                game3.point = tp;
                game3.pointDeferential = tpd;
                return { game3 }
        }





    } else if (roundNum == 2) {
        switch (ut.game) {
            case 4:
                let game4 = new Object();
                game4.score = score;
                game4.point = tp;
                game4.pointDeferential = tpd;
                return { game4 }

            case 5:
                let game5 = new Object();
                game5.score = score;
                game5.point = tp;
                game5.pointDeferential = tpd;
                return { game5 }
            case 6:
                let game6 = new Object();
                game6.score = score;
                game6.point = tp;
                game6.pointDeferential = tpd;
                return { game6 }
        }
    } else if (roundNum == 3) {
        switch (ut.game) {
            case 7:
                let game7 = new Object();
                game7.score = score;
                game7.point = tp;
                game7.pointDeferential = tpd;
                return { game7 }
            case 8:
                let game8 = new Object();
                game8.score = score;
                game8.point = tp;
                game8.pointDeferential = tpd;
                return { game8 }
            case 9:
                let game9 = new Object();
                game9.score = score;
                game9.point = tp;
                game9.pointDeferential = tpd;
                return { game9 }
        }
    } else if (roundNum == 4) {
        switch (ut.game) {
            case 10:
                let game10 = new Object();
                game10.score = score;
                game10.point = tp;
                game10.pointDeferential = tpd;
                return { game10 }
            case 11:
                let game11 = new Object();
                game11.score = score;
                game11.point = tp;
                game11.pointDeferential = tpd;
                return { game11 }
            case 12:
                let game12 = new Object();
                game12.score = score;
                game12.point = tp;
                game12.pointDeferential = tpd;

                return { game12 }
        }
    } else if (roundNum == 5) {
        switch (ut.game) {
            case 13:
                let game13 = new Object();
                game13.score = score;
                game13.point = tp;
                game13.pointDeferential = tpd;
                return { game13 }
            case 14:
                let game14 = new Object();
                game14.score = score;
                game14.point = tp;
                game14.pointDeferential = tpd;
                return { game14 }
            case 15:
                let game15 = new Object();
                game15.score = score;
                game15.point = tp;
                game15.pointDeferential = tpd;
                return { game15 }
        }
    }
}



module.exports.getScoreFromDoc = (game, doc) => {
    let score = 0;
    switch (game) {
        case 1:
            if (doc.game1) score = doc.game1.score;
            return score;
        case 2:
            if (doc.game2) score = doc.game2.score;
            return score;
        case 3:
            if (doc.game3) score = doc.game3.score;
            return score;
        case 4:
            if (doc.game4) score = doc.game4.score;
            return score;
        case 5:
            if (doc.game5) score = doc.game5.score;
            return score;
        case 6:
            if (doc.game6) score = doc.game6.score;
            return score;
        case 7:
            if (doc.game7) score = doc.game7.score;
            return score;
        case 8:
            if (doc.game8) score = doc.game8.score;
            return score;
        case 9:
            if (doc.game9) score = doc.game9.score;
            return score;
        case 10:
            if (doc.game10) score = doc.game10.score;
            return score;
        case 11:
            if (doc.game11) score = doc.game11.score;
            return score;
        case 12:
            if (doc.game12) score = doc.game12.score;
            return score;
        case 13:
            if (doc.game13) score = doc.game13.score;
            return score;
        case 14:
            if (doc.game14) score = doc.game14.score;
            return score;
        case 15:
            if (doc.game15) score = doc.game15.score;
            return score;
    }

}


// module.exports = updatedPerformance;




/*
function updateNogInDB(nog, doc, netID) {

    // console.log("NOG - ", nog);
    if (nog !== doc.nog) {
        // console.log("------------------------------------------------");
        Net.findById(netID, (err, net) => {
            // console.log("NET - ", net.performance);
            Performance.updateMany(
                { _id: { $in: net.performance } },
                // {nog},
                { $set: { nog } },
                (pErr, per) => {
                    console.log("All performance of net - ", per);
                }
            );

        });
    }
}
*/

