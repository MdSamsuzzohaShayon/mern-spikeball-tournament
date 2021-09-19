
const Net = require('../models/Net');
const Performance = require('../models/Performance');

const updatedPerformance = (pu, roundNum, doc, netID) => {
    // console.log("Docs - ", doc);
    // console.log(roundNum);
    // console.log(pu);
    // nog = NUMBER OF GAME 
    let nog = doc.nog;
    if (roundNum == 1) {
        // console.log("Update performance");
        // console.log(pu);
        // const exmple = [{
        //     performanceID: '612ffa1cc6266f842260bed6',
        //     game: 1,
        //     score: { point: 1, pointDeferential: '15' },
        //     netID: '612ffa1ac6266f842260bece'
        // },
        // {
        //     performanceID: '612ffa1cc6266f842260bed6',
        //     game: 2,
        //     score: { point: 1, pointDeferential: '12-11' },
        //     netID: '612ffa1ac6266f842260bece'
        // },
        // {
        //     performanceID: '612ffa1fc6266f842260bee4',
        //     game: 1,
        //     score: { point: 'on', pointDeferential: '12-1' },
        //     netID: '612ffa1dc6266f842260bedc'
        // }];




        // const exampleDocs = {
        //     _id: "6145c0140cd6071e91fcac18",
        //     participant: "6145c0130cd6071e91fcac15",
        //     event: "6145bfdb0cd6071e91fcac0c",
        //     __v: 0,
        //     game2: { point: 0, pointDeferential: '4-2', _id: "6145c11e3cdecb22fa6f20fc" },
        //     game1: { point: 1, pointDeferential: '0-0', _id: "6145c45e64dd16292bdb75d1" }
        // };

        // console.log("Doc - ", doc);




        switch (pu.game) {
            case 1:
                let game1 = new Object();

                if (doc.game1) {
                    if (doc.game1.point) game1.point = doc.game1.point;
                    if (doc.game1.pointDeferential) game1.pointDeferential = doc.game1.pointDeferential;
                }

                if (pu.score.point || pu.score.point === 0) game1.point = pu.score.point;
                // console.log(pu.score.pointDeferential);
                // game1.point = pu.score.point;
                // console.log(pu.score.pointDeferential.includes('-'));
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game1.pointDeferential = pu.score.pointDeferential : game1.pointDeferential = pu.score.pointDeferential + "-0"
                };
                // console.log("------------");
                // console.log(game1);
                // CHECK WITH A CONDITION - IF CURRENT NOG IS MORE THAN PREVIOUS RETURN WITH NOG OR WITHOUT NOG / ONLY GAME
                return { game1 }
            case 2:
                let game2 = new Object();
                if (nog < 2) nog = 2;

                if (doc.game2) {
                    if (doc.game2.point) game2.point = doc.game2.point;
                    if (doc.game2.pointDeferential) game2.pointDeferential = doc.game2.pointDeferential;
                }

                if (pu.score.point || pu.score.point === 0) game2.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game2.pointDeferential = pu.score.pointDeferential : game2.pointDeferential = pu.score.pointDeferential + "-0";

                };
                updateNogInDB(nog, doc, netID);

                return { game2 }
            case 3:
                let game3 = new Object();
                if (nog < 3) nog = 3;

                if (doc.game3) {
                    if (doc.game3.point) game3.point = doc.game3.point;
                    if (doc.game3.pointDeferential) game3.pointDeferential = doc.game3.pointDeferential;
                }


                if (pu.score.point || pu.score.point === 0) game3.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game3.pointDeferential = pu.score.pointDeferential : game3.pointDeferential = pu.score.pointDeferential + "-0";

                };
                updateNogInDB(nog, doc, netID);

                return { game3 }
        }





    } else if (roundNum == 2) {
        switch (pu.game) {
            case 4:
                let game4 = new Object();
                if (nog < 4) nog = 4;
                if (doc.game4) {
                    if (doc.game4.point) game4.point = doc.game4.point;
                    if (doc.game4.pointDeferential) game4.pointDeferential = doc.game4.pointDeferential;
                }


                if (pu.score.point || pu.score.point === 0) game4.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game4.pointDeferential = pu.score.pointDeferential : game4.pointDeferential = pu.score.pointDeferential + "-0";

                };


                updateNogInDB(nog, doc, netID);

                return { game4 }

            case 5:
                let game5 = new Object();
                if (nog < 5) nog = 5;
                if (doc.game5) {
                    if (doc.game5.point) game5.point = doc.game5.point;
                    if (doc.game5.pointDeferential) game5.pointDeferential = doc.game5.pointDeferential;
                }


                if (pu.score.point || pu.score.point === 0) game5.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game5.pointDeferential = pu.score.pointDeferential : game5.pointDeferential = pu.score.pointDeferential + "-0";

                };
                updateNogInDB(nog, doc, netID);

                return { game5 }
            case 6:
                let game6 = new Object();
                if (nog < 6) nog = 6;
                if (doc.game6) {
                    if (doc.game6.point) game6.point = doc.game6.point;
                    if (doc.game6.pointDeferential) game6.pointDeferential = doc.game6.pointDeferential;
                }

                if (pu.score.point || pu.score.point === 0) game6.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game6.pointDeferential = pu.score.pointDeferential : game6.pointDeferential = pu.score.pointDeferential + "-0";

                };

                updateNogInDB(nog, doc, netID);

                return { game6 }
        }
    } else if (roundNum == 3) {
        switch (pu.game) {
            case 7:
                let game7 = new Object();
                if (nog < 7) nog = 7;
                if (doc.game7) {
                    if (doc.game7.point) game7.point = doc.game7.point;
                    if (doc.game7.pointDeferential) game7.pointDeferential = doc.game7.pointDeferential;
                }

                if (pu.score.point || pu.score.point === 0) game7.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game7.pointDeferential = pu.score.pointDeferential : game7.pointDeferential = pu.score.pointDeferential + "-0";

                };
                updateNogInDB(nog, doc, netID);

                return { game7 }
            case 8:
                let game8 = new Object();
                if (nog < 8) nog = 8;
                if (doc.game8) {
                    if (doc.game8.point) game8.point = doc.game8.point;
                    if (doc.game8.pointDeferential) game8.pointDeferential = doc.game8.pointDeferential;
                }

                if (pu.score.point || pu.score.point === 0) game8.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game8.pointDeferential = pu.score.pointDeferential : game8.pointDeferential = pu.score.pointDeferential + "-0";

                };
                updateNogInDB(nog, doc, netID);

                return { game8 }
            case 9:
                let game9 = new Object();
                if (nog < 9) nog = 9;
                if (doc.game9) {
                    if (doc.game9.point) game9.point = doc.game9.point;
                    if (doc.game9.pointDeferential) game9.pointDeferential = doc.game9.pointDeferential;
                }

                if (pu.score.point || pu.score.point === 0) game9.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game9.pointDeferential = pu.score.pointDeferential : game9.pointDeferential = pu.score.pointDeferential + "-0";

                };
                updateNogInDB(nog, doc, netID);

                return { game9 }
        }
    }
    else if (roundNum == 4) {
        switch (pu.game) {
            case 10:
                let game10 = new Object();
                if (nog < 10) nog = 10;
                if (doc.game10) {
                    if (doc.game10.point) game10.point = doc.game10.point;
                    if (doc.game10.pointDeferential) game10.pointDeferential = doc.game10.pointDeferential;
                }

                if (pu.score.point || pu.score.point === 0) game10.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game10.pointDeferential = pu.score.pointDeferential : game10.pointDeferential = pu.score.pointDeferential + "-0";

                };
                updateNogInDB(nog, doc, netID);

                return { game10 }
            case 11:
                let game11 = new Object();
                if (nog < 11) nog = 11;
                if (doc.game11) {
                    if (doc.game11.point) game11.point = doc.game11.point;
                    if (doc.game11.pointDeferential) game11.pointDeferential = doc.game11.pointDeferential;
                }

                if (pu.score.point || pu.score.point === 0) game11.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game11.pointDeferential = pu.score.pointDeferential : game11.pointDeferential = pu.score.pointDeferential + "-0";

                };
                updateNogInDB(nog, doc, netID);

                return { game11 }
            case 12:
                let game12 = new Object();
                if (nog < 12) nog = 12;
                if (doc.game12) {
                    if (doc.game12.point) game12.point = doc.game12.point;
                    if (doc.game12.pointDeferential) game12.pointDeferential = doc.game12.pointDeferential;
                }

                if (pu.score.point || pu.score.point === 0) game12.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game12.pointDeferential = pu.score.pointDeferential : game12.pointDeferential = pu.score.pointDeferential + "-0";

                };
                updateNogInDB(nog, doc, netID);

                return { game12 }
        }
    } else if (roundNum == 5) {
        switch (pu.game) {
            case 13:
                let game13 = new Object();
                if (nog < 13) nog = 13;
                if (doc.game13) {
                    if (doc.game13.point) game13.point = doc.game13.point;
                    if (doc.game13.pointDeferential) game13.pointDeferential = doc.game13.pointDeferential;
                }

                if (pu.score.point || pu.score.point === 0) game13.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game13.pointDeferential = pu.score.pointDeferential : game13.pointDeferential = pu.score.pointDeferential + "-0";

                };
                updateNogInDB(nog, doc, netID);

                return { game13 }
            case 14:
                let game14 = new Object();
                if (nog < 14) nog = 14;
                if (doc.game14) {
                    if (doc.game14.point) game14.point = doc.game14.point;
                    if (doc.game14.pointDeferential) game14.pointDeferential = doc.game14.pointDeferential;
                }

                if (pu.score.point || pu.score.point === 0) game14.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game14.pointDeferential = pu.score.pointDeferential : game14.pointDeferential = pu.score.pointDeferential + "-0";

                };
                updateNogInDB(nog, doc, netID);

                return { game14 }
            case 15:
                let game15 = new Object();
                if (nog < 15) nog = 15;
                if (doc.game15) {
                    if (doc.game15.point) game15.point = doc.game15.point;
                    if (doc.game15.pointDeferential) game15.pointDeferential = doc.game15.pointDeferential;
                }

                if (pu.score.point || pu.score.point === 0) game15.point = pu.score.point;
                if (pu.score.pointDeferential || pu.score.pointDeferential === 0) {
                    pu.score.pointDeferential.includes('-') ? game15.pointDeferential = pu.score.pointDeferential : game15.pointDeferential = pu.score.pointDeferential + "-0";

                };
                updateNogInDB(nog, doc, netID);

                return { game15 }
        }
    }

    // console.log("NOG - ", nog);
}


module.exports = updatedPerformance;




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

