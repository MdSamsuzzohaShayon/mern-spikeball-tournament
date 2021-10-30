const Performance = require('../models/Performance');


const updateGame = (gameNum, gameSPPD, extraPoint) => {
    const basePoint = 1;
    if (gameNum === 1) {
        const game1 = new Object();
        game1.score = gameSPPD.score;
        game1.point = basePoint + extraPoint;
        game1.pointDeferential = gameSPPD.pointDeferential;
        // console.log("game 1 - ", game1);
        return game1;
    } else if (gameNum === 2) {
        const game2 = new Object();
        game2.score = gameSPPD.score;
        game2.point = basePoint + extraPoint;
        game2.pointDeferential = gameSPPD.pointDeferential;
        // console.log("game 2 - ", game2);
        return game2;
    } else if (gameNum === 3) {
        const game3 = new Object();
        game3.score = gameSPPD.score;
        game3.point = basePoint + extraPoint;
        game3.pointDeferential = gameSPPD.pointDeferential;
        // console.log("game 3 - ", game3);
        return game3;
    } else if (gameNum === 4) {
        const game4 = new Object();
        game4.score = gameSPPD.score;
        game4.point = basePoint + extraPoint;
        game4.pointDeferential = gameSPPD.pointDeferential;
        return game4;
    } else if (gameNum === 5) {
        const game5 = new Object();
        game5.score = gameSPPD.score;
        game5.point = basePoint + extraPoint;
        game5.pointDeferential = gameSPPD.pointDeferential;
        return game5;
    } else if (gameNum === 6) {
        const game6 = new Object();
        game6.score = gameSPPD.score;
        game6.point = basePoint + extraPoint;
        game6.pointDeferential = gameSPPD.pointDeferential;
        return game6;
    } else if (gameNum === 7) {
        const game7 = new Object();
        game7.score = gameSPPD.score;
        game7.point = basePoint + extraPoint;
        game7.pointDeferential = gameSPPD.pointDeferential;
        return game7;
    } else if (gameNum === 8) {
        const game8 = new Object();
        game8.score = gameSPPD.score;
        game8.point = basePoint + extraPoint;
        game8.pointDeferential = gameSPPD.pointDeferential;
        return game8;
    } else if (gameNum === 9) {
        const game9 = new Object();
        game9.score = gameSPPD.score;
        game9.point = basePoint + extraPoint;
        game9.pointDeferential = gameSPPD.pointDeferential;
        return game9;
    } else if (gameNum === 10) {
        const game10 = new Object();
        game10.score = gameSPPD.score;
        game10.point = basePoint + extraPoint;
        game10.pointDeferential = gameSPPD.pointDeferential;
        return game10;
    } else if (gameNum === 11) {
        const game11 = new Object();
        game11.score = gameSPPD.score;
        game11.point = basePoint + extraPoint;
        game11.pointDeferential = gameSPPD.pointDeferential;
        return game11;
    } else if (gameNum === 12) {
        const game12 = new Object();
        game12.score = gameSPPD.score;
        game12.point = basePoint + extraPoint;
        game12.pointDeferential = gameSPPD.pointDeferential;
        return game12;
    } else if (gameNum === 13) {
        const game13 = new Object();
        game13.score = gameSPPD.score;
        game13.point = basePoint + extraPoint;
        game13.pointDeferential = gameSPPD.pointDeferential;
        return game13;
    } else if (gameNum === 14) {
        const game14 = new Object();
        game14.score = gameSPPD.score;
        game14.point = basePoint + extraPoint;
        game14.pointDeferential = gameSPPD.pointDeferential;
        return game14;
    } else if (gameNum === 15) {
        const game15 = new Object();
        game15.score = gameSPPD.score;
        game15.point = basePoint + extraPoint;
        game15.pointDeferential = gameSPPD.pointDeferential;
        return game15;
    }
}

// pu, round, pu.extra, pu.netID, doc
module.exports.updatedExtraPerformance = async (findNet, roundNum, extraPoint, shortNet) => {
    // console.log("findNet - ", findNet);
    // console.log("extraPoint - ", extraPoint);
    // console.log("RoundNum - ", roundNum);

    if (shortNet === true) {
        findNet.performance.forEach(async (fnp, i) => {
            if (roundNum == 1) {
                const gameObj = new Object();
                if (fnp.game1) gameObj.game1 = updateGame(1, fnp.game1, extraPoint);
                if (fnp.game2) gameObj.game2 = updateGame(2, fnp.game2, extraPoint);
                if (fnp.game3) gameObj.game3 = updateGame(3, fnp.game3, extraPoint);
                // console.log("Game obj - ", gameObj);
                // UPDATE PERFORMACE 
                const updatedPerformance = await Performance.updateOne({ _id: fnp._id }, gameObj);
            } else if (roundNum == 2) {
                const gameObj = new Object();
                if (fnp.game4) gameObj.game4 = updateGame(4, fnp.game4, extraPoint);
                if (fnp.game5) gameObj.game5 = updateGame(5, fnp.game5, extraPoint);
                if (fnp.game6) gameObj.game6 = updateGame(6, fnp.game3, extraPoint);
                const updatedPerformance = await Performance.updateOne({ _id: fnp._id }, gameObj);
            } else if (roundNum == 3) {
                const gameObj = new Object();
                if (fnp.game7) gameObj.game7 = updateGame(7, fnp.game7, extraPoint);
                if (fnp.game8) gameObj.game8 = updateGame(8, fnp.game8, extraPoint);
                if (fnp.game9) gameObj.game9 = updateGame(9, fnp.game9, extraPoint);
                const updatedPerformance = await Performance.updateOne({ _id: fnp._id }, gameObj);
            } else if (roundNum == 4) {
                const gameObj = new Object();
                if (fnp.game10) gameObj.game10 = updateGame(10, fnp.game10, extraPoint);
                if (fnp.game11) gameObj.game11 = updateGame(11, fnp.game11, extraPoint);
                if (fnp.game12) gameObj.game12 = updateGame(12, fnp.game12, extraPoint);
                const updatedPerformance = await Performance.updateOne({ _id: fnp._id }, gameObj);
            }
            else if (roundNum == 5) {
                const gameObj = new Object();
                if (fnp.game13) gameObj.game13 = updateGame(13, fnp.game13, extraPoint);
                if (fnp.game14) gameObj.game14 = updateGame(14, fnp.game14, extraPoint);
                if (fnp.game15) gameObj.game15 = updateGame(15, fnp.game15, extraPoint);
                const updatedPerformance = await Performance.updateOne({ _id: fnp._id }, gameObj);
            }
        })
    } else {
        if (roundNum == 1) {
            // UPDATE FOR GAME ONE TWO AND THREE 
            const one = findNet.performance[0], two = findNet.performance[1], three = findNet.performance[2], four = findNet.performance[3];
            // GAME 1 - ONE & FOUR VS TWO & THREE
            if (one.game1 && two.game1 && three.game1 && four.game1) {

                // console.log("game 1 point - one , two ", one.game1.point, two.game1.point);
                if (one.game1.point > two.game1.point) {
                    // UPDATE PERFORMANCE FOR ONE AND FOUR 
                    const oneFourGame1Update = await Performance.updateMany({ _id: { $in: [one._id, four._id] } }, {
                        $set: { game1: updateGame(1, one.game1, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR TWO AND THREE 
                    const twoThreeGame1Update = await Performance.updateMany({ _id: { $in: [two._id, three._id] } }, {
                        $set: { game1: updateGame(1, two.game1, extraPoint) }
                    });
                }
            }


            // GAME 2 - ONE & TWO VS THREE & FOUR
            if (one.game2 && two.game2 && three.game2 && four.game2) {
                // console.log("game 2 point - one , three ", one.game2.point, three.game2.point);
                if (one.game2.point > three.game2.point) {
                    // UPDATE PERFORMANCE FOR ONE AND TWO 
                    const oneTwoGame2Update = await Performance.updateMany({ _id: { $in: [one._id, two._id] } }, {
                        $set: { game2: updateGame(2, one.game2, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR THREE AND FOUR 
                    const threeFourGame2Update = await Performance.updateMany({ _id: { $in: [three._id, four._id] } }, {
                        $set: { game2: updateGame(2, three.game2, extraPoint) }
                    });
                }
            }




            // GAME 3 - ONE & THREE VS TWO & FOUR
            if (one.game3 && two.game3 && three.game3 && four.game3) {
                if (one.game3.point > two.game3.point) {
                    // UPDATE PERFORMANCE FOR ONE AND THREE
                    const oneThreegame3Update = await Performance.updateMany({ _id: { $in: [one._id, three._id] } }, {
                        $set: { game3: updateGame(3, one.game3, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR THREE AND FOUR 
                    const twoFourgame3Update = await Performance.updateMany({ _id: { $in: [two._id, four._id] } }, {
                        $set: { game3: updateGame(3, two.game3, extraPoint) }
                    });
                }
            }


        } else if (roundNum == 2) {
            // UPDATE FOR GAME ONE TWO AND THREE 
            const one = findNet.performance[0], two = findNet.performance[1], three = findNet.performance[2], four = findNet.performance[3];
            // GAME 4 - ONE & FOUR VS TWO & THREE
            if (one.game4 && two.game4 && three.game4 && four.game4) {
                if (one.game4.point > two.game4.point) {
                    // UPDATE PERFORMANCE FOR ONE AND FOUR 
                    const oneFourGame4Update = await Performance.updateMany({ _id: { $in: [one._id, four._id] } }, {
                        $set: { game4: updateGame(4, one.game4, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR TWO AND THREE 
                    const twoThreeGame4Update = await Performance.updateMany({ _id: { $in: [two._id, three._id] } }, {
                        $set: { game4: updateGame(4, two.game4, extraPoint) }
                    });
                }
            }


            // GAME 5 - ONE & TWO VS THREE & FOUR
            if (one.game5 && two.game5 && three.game5 && four.game5) {
                // console.log("game 5 point - one , three ", one.game5.point, three.game5.point);
                if (one.game5.point > three.game5.point) {
                    // UPDATE PERFORMANCE FOR ONE AND TWO 
                    const oneTwoGame5Update = await Performance.updateMany({ _id: { $in: [one._id, two._id] } }, {
                        $set: { game5: updateGame(5, one.game5, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR THREE AND FOUR 
                    const threeFourGame5Update = await Performance.updateMany({ _id: { $in: [three._id, four._id] } }, {
                        $set: { game5: updateGame(5, three.game5, extraPoint) }
                    });
                }
            }




            // GAME 6 - ONE & THREE VS TWO & FOUR
            if (one.game6 && two.game6 && three.game6 && four.game6) {
                if (one.game6.point > two.game6.point) {
                    // UPDATE PERFORMANCE FOR ONE AND THREE
                    const oneThreegame6Update = await Performance.updateMany({ _id: { $in: [one._id, three._id] } }, {
                        $set: { game6: updateGame(6, one.game6, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR THREE AND FOUR 
                    const twoFourgame6Update = await Performance.updateMany({ _id: { $in: [two._id, four._id] } }, {
                        $set: { game6: updateGame(6, two.game6, extraPoint) }
                    });
                }
            }


        } else if (roundNum == 3) {
            // UPDATE FOR GAME ONE TWO AND THREE 
            const one = findNet.performance[0], two = findNet.performance[1], three = findNet.performance[2], four = findNet.performance[3];
            // GAME 7 - ONE & FOUR VS TWO & THREE
            if (one.game7 && two.game7 && three.game7 && four.game7) {
                if (one.game7.point > two.game7.point) {
                    // UPDATE PERFORMANCE FOR ONE AND FOUR 
                    const oneFourGame7Update = await Performance.updateMany({ _id: { $in: [one._id, four._id] } }, {
                        $set: { game7: updateGame(7, one.game7, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR TWO AND THREE 
                    const twoThreeGame7Update = await Performance.updateMany({ _id: { $in: [two._id, three._id] } }, {
                        $set: { game7: updateGame(7, two.game7, extraPoint) }
                    });
                }
            }


            // GAME 8 - ONE & TWO VS THREE & FOUR
            if (one.game8 && two.game8 && three.game8 && four.game8) {
                // console.log("game 8 point - one , three ", one.game8.point, three.game8.point);
                if (one.game8.point > three.game8.point) {
                    // UPDATE PERFORMANCE FOR ONE AND TWO 
                    const oneTwoGame8Update = await Performance.updateMany({ _id: { $in: [one._id, two._id] } }, {
                        $set: { game8: updateGame(8, one.game8, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR THREE AND FOUR 
                    const threeFourGame8Update = await Performance.updateMany({ _id: { $in: [three._id, four._id] } }, {
                        $set: { game8: updateGame(8, three.game8, extraPoint) }
                    });
                }
            }




            // GAME 9 - ONE & THREE VS TWO & FOUR
            if (one.game9 && two.game9 && three.game9 && four.game9) {
                if (one.game9.point > two.game9.point) {
                    // UPDATE PERFORMANCE FOR ONE AND THREE
                    const oneThreegame9Update = await Performance.updateMany({ _id: { $in: [one._id, three._id] } }, {
                        $set: { game9: updateGame(9, one.game9, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR THREE AND FOUR 
                    const twoFourgame9Update = await Performance.updateMany({ _id: { $in: [two._id, four._id] } }, {
                        $set: { game9: updateGame(9, two.game9, extraPoint) }
                    });
                }
            }

        } else if (roundNum == 4) {
            // UPDATE FOR GAME ONE TWO AND THREE 
            const one = findNet.performance[0], two = findNet.performance[1], three = findNet.performance[2], four = findNet.performance[3];
            // GAME 10 - ONE & FOUR VS TWO & THREE
            if (one.game10 && two.game10 && three.game10 && four.game10) {
                if (one.game10.point > two.game10.point) {
                    // UPDATE PERFORMANCE FOR ONE AND FOUR 
                    const oneFourGame10Update = await Performance.updateMany({ _id: { $in: [one._id, four._id] } }, {
                        $set: { game10: updateGame(10, one.game10, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR TWO AND THREE 
                    const twoThreeGame10Update = await Performance.updateMany({ _id: { $in: [two._id, three._id] } }, {
                        $set: { game10: updateGame(10, two.game10, extraPoint) }
                    });
                }
            }


            // GAME 11 - ONE & TWO VS THREE & FOUR
            if (one.game11 && two.game11 && three.game11 && four.game11) {
                // console.log("game 11 point - one , three ", one.game11.point, three.game11.point);
                if (one.game11.point > three.game11.point) {
                    // UPDATE PERFORMANCE FOR ONE AND TWO 
                    const oneTwoGame11Update = await Performance.updateMany({ _id: { $in: [one._id, two._id] } }, {
                        $set: { game11: updateGame(11, one.game11, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR THREE AND FOUR 
                    const threeFourGame11Update = await Performance.updateMany({ _id: { $in: [three._id, four._id] } }, {
                        $set: { game11: updateGame(11, three.game11, extraPoint) }
                    });
                }
            }




            // GAME 12 - ONE & THREE VS TWO & FOUR
            if (one.game12 && two.game12 && three.game12 && four.game12) {
                if (one.game12.point > two.game12.point) {
                    // UPDATE PERFORMANCE FOR ONE AND THREE
                    const oneThreegame12Update = await Performance.updateMany({ _id: { $in: [one._id, three._id] } }, {
                        $set: { game12: updateGame(12, one.game12, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR THREE AND FOUR 
                    const twoFourgame12Update = await Performance.updateMany({ _id: { $in: [two._id, four._id] } }, {
                        $set: { game12: updateGame(12, two.game12, extraPoint) }
                    });
                }
            }

        } else if (roundNum == 5) {
            // UPDATE FOR GAME ONE TWO AND THREE 
            const one = findNet.performance[0], two = findNet.performance[1], three = findNet.performance[2], four = findNet.performance[3];
            // GAME 13 - ONE & FOUR VS TWO & THREE
            if (one.game13 && two.game13 && three.game13 && four.game13) {
                if (one.game13.point > two.game13.point) {
                    // UPDATE PERFORMANCE FOR ONE AND FOUR 
                    const oneFourGame13Update = await Performance.updateMany({ _id: { $in: [one._id, four._id] } }, {
                        $set: { game13: updateGame(13, one.game13, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR TWO AND THREE 
                    const twoThreeGame13Update = await Performance.updateMany({ _id: { $in: [two._id, three._id] } }, {
                        $set: { game13: updateGame(13, two.game13, extraPoint) }
                    });
                }
            }


            // GAME 14 - ONE & TWO VS THREE & FOUR
            if (one.game14 && two.game14 && three.game14 && four.game14) {
                // console.log("game 14 point - one , three ", one.game14.point, three.game14.point);
                if (one.game14.point > three.game14.point) {
                    // UPDATE PERFORMANCE FOR ONE AND TWO 
                    const oneTwoGame14Update = await Performance.updateMany({ _id: { $in: [one._id, two._id] } }, {
                        $set: { game14: updateGame(14, one.game14, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR THREE AND FOUR 
                    const threeFourGame14Update = await Performance.updateMany({ _id: { $in: [three._id, four._id] } }, {
                        $set: { game14: updateGame(14, three.game14, extraPoint) }
                    });
                }
            }




            // GAME 12 - ONE & THREE VS TWO & FOUR
            if (one.game15 && two.game15 && three.game15 && four.game15) {
                if (one.game15.point > two.game15.point) {
                    // UPDATE PERFORMANCE FOR ONE AND THREE
                    const oneThreegame15Update = await Performance.updateMany({ _id: { $in: [one._id, three._id] } }, {
                        $set: { game15: updateGame(15, one.game15, extraPoint) }
                    });
                } else {
                    // UPDATE PERFORMANCE FOR THREE AND FOUR 
                    const twoFourgame15Update = await Performance.updateMany({ _id: { $in: [two._id, four._id] } }, {
                        $set: { game15: updateGame(15, two.game15, extraPoint) }
                    });
                }
            }

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

