const express = require('express');

const Event = require('../models/Event');
const Net = require('../models/Net');
const Performance = require('../models/Performance');
const Round = require('../models/Round');

const { rankingRound1, rankingRound2, rankingRound3, rankingRound4, rankingRound5 } = require('../utils/ranking');
const { ensureAuth, ensureGuast } = require('../config/auth');


const router = express.Router();
// arr[Math.floor(Math.random() * arr.length)];









// ⛏️⛏️ ASSIGN PLAYER TO THE NET FOR THE FIRST ROUND - CREATE PERFORMANCE FOR ALL PLAYER  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/assign-initial-net/:eventID', ensureAuth, async (req, res, next) => {
    try {
        // console.log("Hit");
        // console.log(req.params.eventID);
        // const findNets = "Nets";
        const findNets = await Net.find({ event: req.params.eventID });
        // console.log("True - l65 ", findNets);
        if (findNets.length < 1) {
            // console.log("True condition");

            // RANDOMIZE PERFORMANCE 
            const performances = await Performance.find({ event: req.params.eventID });
            // console.log({performances});
            // const event = await Event.findById({ _id: req.params.eventID }).populate('participants').exec();
            // const participants = event.participants;
            let randomPerformance = [];
            while (randomPerformance.length < performances.length) {
                let random = performances[Math.floor(Math.random() * performances.length)];
                randomPerformance.push(random);
                randomPerformance = [...new Set(randomPerformance)];
            }

            // console.log(randomPerformance);




            // CREATING NET AND PERFORMANCE OF THE PLAYER 
            const allNetsIds = [];
            const allPerformanceIds = [];



            // console.log({randomPerformance});

            let i, j, temporary, chunk = 4, netNo = 1;
            for (i = 0, j = randomPerformance.length; i < j; i += chunk) {
                temporary = randomPerformance.slice(i, i + chunk);



                const performanceChunk = [];
                for (let k of temporary) {
                    performanceChunk.push(k._id); // 4 
                    allPerformanceIds.push(k._id); // ALL
                }


                const newNet = new Net({
                    sl: netNo,
                    performance: performanceChunk,
                    event: req.params.eventID,
                });
                const net = await newNet.save();
                allNetsIds.push(net._id);






                // const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { $push: { performance: performance._id } }, { new: true });
                netNo++;
            }



            const new_round = new Round({
                no: 1,
                event: req.params.eventID,
                performances: allPerformanceIds,
                nets: allNetsIds
            });
            // console.log(new_round);
            const round = await new_round.save();
            // UPDATE NET 
            // const updateNetRound = await Net.updateMany({ event: req.params.eventID }, { round: round._id }, { new: true });
            const updateNetRound = await Net.updateMany({ event: req.params.eventID, _id: { $in: allNetsIds } }, { round: round._id }, { new: true });




            res.status(200).json({ msg: 'Assign to initial net randomly', round, updateNetRound });
        } else {
            res.status(201).json({ msg: "Have already assigned nets", findNets });
        }

    } catch (error) {
        console.log(error);
    }

});






// ⛏️⛏️ ASSIGN PLAYER TO THE NET BY RANK - CREATE MORE NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/assign-net/:eventID/:roundNum', ensureAuth, async (req, res, next) => {
    try {

        const { performances, leftedPerformance } = req.body;
        const roundNum = parseInt(req.params.roundNum);
        const { eventID } = req.params;
        // console.log(req.body);
        const findRound = await Round.findOne({ event: req.params.eventID, no: roundNum });

        // console.log("Found rounds - ", findRound);
        if (!findRound || findRound === null) {
            console.log("No Round - create new one");


            const allPerformanceIds = [];
            for (let per of performances) {
                allPerformanceIds.push(per._id);
            }
            const allLeftedPerFormance = [];
            for (let lp of leftedPerformance) {
                allLeftedPerFormance.push(lp._id);
            }

            // console.log("pid -",allPerformanceIds);
            const findPerformances = await Performance.find({ _id: { $in: allPerformanceIds } }).populate({ path: "participant", select: "firstname lastname" });
            const assending = true;
            if (assending) {
                let ranking = findPerformances;

                if (roundNum === 2) {
                    // console.log("Round 2");
                    ranking = findPerformances.sort(rankingRound1);
                } else if (roundNum === 3) {
                    ranking = findPerformances.sort(rankingRound2);
                } else if (roundNum === 4) {
                    ranking = findPerformances.sort(rankingRound3);
                } else if (roundNum === 5) {
                    ranking = findPerformances.sort(rankingRound4);
                }

                // console.log("Ranking - ", ranking);
                // console.log("------------------------BREAK--------------------------");

                // CREATE NETS 

                // CREATING NET AND PERFORMANCE OF THE PLAYER 
                const allNetsIds = [];
                const allPerformanceIds = [];




                let i, j, temporary, chunk = 4, netNo = 1;
                for (i = 0, j = ranking.length; i < j; i += chunk) {
                    temporary = ranking.slice(i, i + chunk);


                    const newNet = new Net({
                        sl: netNo,
                        // performance: performanceIds,
                        event: req.params.eventID,
                    });
                    const net = await newNet.save();
                    // console.log("NET sl - ", netNo);
                    // console.log("NET - ", net);
                    allNetsIds.push(net._id);


                    for (let k of temporary) {
                        allPerformanceIds.push(k._id);
                        const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { $push: { performance: k._id } }, { new: true });
                    }
                    netNo++;
                }
                // console.log("Net ids - ", allNetsIds);
                // console.log("p ids - ", allPerformanceIds);
                // console.log("pp ids - ", allLeftedPerFormance);



                const new_round = new Round({
                    no: roundNum,
                    event: req.params.eventID,
                    performances: allPerformanceIds,
                    nets: allNetsIds,
                    left: allLeftedPerFormance
                });
                // console.log("New Round - ", new_round);
                // console.log("Round Num - ", roundNum);
                const round = await new_round.save();
                const updateNetRound = await Net.updateMany({ _id: { $in: allNetsIds } }, { round: round._id }, { new: true });


                // console.log("Ranking - ", ranking);
            } else {
                // RANDOM ASSIGN
                console.log("Random assign");
            }


        } else {
            // UPDATE EXISTING ROUND OR RESORT OR REASSIGN
            // console.log("Update existing");
            // console.log(findRound.performances);
            const allPerformanceIds = [];
            for (let per of performances) {
                allPerformanceIds.push(per._id);
            }

            const allLeftedPerformance = [];
            for (let lp of leftedPerformance) {
                allLeftedPerformance.push(lp._id);
            }


            const findPerformances = await Performance.find({ _id: { $in: allPerformanceIds } }).populate({ path: "participant", select: "firstname lastname" });
            let ranking = findPerformances;

            if (roundNum === 1) {
                // console.log("Round 2");
                ranking = findPerformances.sort(rankingRound1);
            } else if (roundNum === 2) {
                ranking = findPerformances.sort(rankingRound2);
            } else if (roundNum === 3) {
                ranking = findPerformances.sort(rankingRound3);
            } else if (roundNum === 4) {
                ranking = findPerformances.sort(rankingRound4);
            } else if (roundNum === 5) {
                ranking = findPerformances.sort(rankingRound5);
            }




            const deleteNets = await Net.deleteMany({ event: eventID, round: findRound._id });
            const allNetsIds = new Array();


            // CREATING NET AND PERFORMANCE OF THE PLAYER            

            let i, j, temporary, chunk = 4, netNo = 1;

            for (i = 0, j = ranking.length; i < j; i += chunk) {
                temporary = ranking.slice(i, i + chunk);

                let netPerformanceIds = [];
                for (let k of temporary) {
                    netPerformanceIds.push(k._id);
                }

                // console.log("All performances in a net - ", netPerformanceIds);

                const newNet = new Net({
                    sl: netNo,
                    event: eventID,
                    round: findRound._id,
                    performance: netPerformanceIds
                });
                const net = await newNet.save();
                allNetsIds.push(net._id);



                // console.log("net performances IDs - ", netPerformanceIds);

                // const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { performance: netPerformanceIds }, { new: true });


                netNo++;
            }


            // console.log("All nets ids - ", allNetsIds);



            // UPDATE NETS AND ROUND 
            const updateRound = await Round.findOneAndUpdate(
                { event: eventID, no: roundNum },
                { performances: allPerformanceIds, left: allLeftedPerformance, nets: allNetsIds }
            );
            // console.log("Update round - ", updateRound);

        }


        res.status(201).json({ msg: "rank performance and inatilize performance", params: req.params })

    } catch (error) {
        console.log(error);
    }
});






























// ⛏️⛏️ RANDOM REASSIGN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/random-assign-net/:eventID/:roundNum', ensureAuth, async (req, res, next) => {
    try {

        // console.log("Random assign");
        const { eventID } = req.params;


        const { performances, leftedPerformance } = req.body;
        const roundNum = parseInt(req.params.roundNum);
        // console.log(req.body);
        const findRound = await Round.findOne({ event: eventID, no: roundNum });
        const currentRound = findRound;






        // NO PERFORMANCE FOUND - CREATE NEW ROUND 
        if (!findRound || findRound === null) {
            const allPerformanceIds = [];
            for (let per of performances) {
                allPerformanceIds.push(per._id);
            }
            const allLeftedPerformance = [];
            for (let lp of leftedPerformance) {
                allLeftedPerformance.push(lp._id);
            }

            // console.log("pid -",allPerformanceIds);
            const findPerformances = await Performance.find({ _id: { $in: allPerformanceIds } }).populate({ path: "participant", select: "firstname lastname" });
            // console.log(findPerformances);



            // console.log("Random assign");
            let randomPerformance = [];
            while (randomPerformance.length < findPerformances.length) {
                let random = findPerformances[Math.floor(Math.random() * findPerformances.length)];
                randomPerformance.push(random);
                randomPerformance = [...new Set(randomPerformance)];
            }
            // console.log("Random Performance - ", randomPerformance);

            // console.log("Ranking - ", ranking);
            // console.log("------------------------BREAK--------------------------");


            // CREATE NETS 

            // CREATING NET AND PERFORMANCE OF THE PLAYER 
            const allNetsIds = [];




            let i, j, temporary, chunk = 4, netNo = 1;
            for (i = 0, j = randomPerformance.length; i < j; i += chunk) {
                temporary = randomPerformance.slice(i, i + chunk);


                const newNet = new Net({
                    sl: netNo,
                    // performance: performanceIds,
                    event: eventID,
                });
                const net = await newNet.save();
                // console.log("NET sl - ", netNo);
                // console.log("NET - ", net);
                allNetsIds.push(net._id);


                let netPerformanceIds = [];
                // console.log("Temporary - ", temporary);
                for (let k of temporary) {
                    netPerformanceIds.push(k._id);
                }
                // console.log("performance ID by net- ",netPerformanceIds);
                // console.log("------------------------BREAK--------------------------");

                const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { performance: netPerformanceIds }, { new: true });
                netNo++;
            }
            // console.log("Net ids - ", allNetsIds);
            // console.log("p ids - ", allPerformanceIds);
            // console.log("pp ids - ", allLeftedPerformance);





            const new_round = new Round({
                no: roundNum,
                event: eventID,
                performances: allPerformanceIds,
                nets: allNetsIds,
                left: allLeftedPerformance
            });
            // console.log("New Round - ", new_round);
            // console.log("Round Num - ", roundNum);
            const round = await new_round.save();
            const updateNetRound = await Net.updateMany({ _id: { $in: allNetsIds } }, { round: round._id }, { new: true });


        } else {

            // console.log("Find round - ",currentRound);
            // UPDATE EXISTING ROUND OR RESORT OR REASSIGN
            // console.log("Update existing");
            // console.log(findRound.performances);
            const allPerformanceIds = [];
            for (let per of performances) {
                allPerformanceIds.push(per._id);
            }

            // console.log("All performance IDS - ", allPerformanceIds);


            const allLeftedPerformance = [];
            for (let lp of leftedPerformance) {
                allLeftedPerformance.push(lp._id);
            }

            // console.log("All lefted nets - ", allLeftedPerformance);


            let randomPerformance = [];
            while (randomPerformance.length < allPerformanceIds.length) {
                let random = allPerformanceIds[Math.floor(Math.random() * allPerformanceIds.length)];
                randomPerformance.push(random);
                randomPerformance = [...new Set(randomPerformance)];
            }


            // console.log("Randomise performance - ", randomPerformance);




            // DELETE ALL NETS 
            // console.log("Find Rounds - ", findRound);
            const deleteNets = await Net.deleteMany({ event: eventID, round: currentRound._id });
            // console.log("Delete all nets - ", deleteNets);
            // CREATING NET AND PERFORMANCE OF THE PLAYER            

            let i, j, temporary, chunk = 4, netNo = 1, k = 0;
            const allNetsIds = new Array();

            // console.log("random performances - ", randomPerformance);
            for (i = 0, j = randomPerformance.length; i < j; i += chunk) {
                temporary = randomPerformance.slice(i, i + chunk);
                // console.log("Temporary - ",temporary);


                const newNet = new Net({
                    sl: netNo,
                    event: eventID,
                    round: currentRound._id,
                });
                const net = await newNet.save();
                allNetsIds.push(net._id);


                let netPerformanceIds = [];
                for (let k of temporary) {
                    netPerformanceIds.push(k);
                }
                // console.log("net performances IDs - ", netPerformanceIds);

                const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { performance: netPerformanceIds }, { new: true });
                // console.log("Update net - ", updateNet);




                netNo++;
                k++;
            }
            // console.log("All nets ids - ", allNetsIds);
            // performances: allPerformanceIds, left: allLeftedPerFormance
            // console.log({ performances: allPerformanceIds, left: allLeftedPerformance, nets: allNetsIds });
            // UPDATE NETS AND ROUND 
            const updateRound = await Round.findOneAndUpdate(
                { event: eventID, no: roundNum },
                { performances: allPerformanceIds, left: allLeftedPerformance, nets: allNetsIds }
            );


            // console.log("Updated round - ", updateRound);



        }




        res.status(201).json({ msg: "rank performance and inatilize performance", params: req.params })

    } catch (error) {
        console.log(error);
    }
});







// ⛏️⛏️ PACK REASSIGN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/pack-assign-net/:eventID/:roundNum', ensureAuth, async (req, res, next) => {
    try {

        const { performances, leftedPerformance } = req.body;
        const roundNum = parseInt(req.params.roundNum);
        const { eventID } = req.params;
        // console.log(req.body);
        if (roundNum < 2) return res.status(200).json({ msg: "You can't pack assign in first round" });

        // console.log("All performances - ", performances);
        const findPreviousRound = await Round.findOne({ event: req.params.eventID, no: roundNum - 1 }).populate({ path: "nets", populate: { path: "performance" } });
        // console.log(findPreviousRound.nets[findPreviousRound.nets.length - 1].performance);
        // return res.status(200).json({ net: findPreviousRound });
        const findRound = await Round.findOne({ event: req.params.eventID, no: roundNum });

        const allPerformanceIds = [];
        for (let per of performances) {
            allPerformanceIds.push(per._id);
        }
        const allLeftedPerFormance = [];
        for (let lp of leftedPerformance) {
            allLeftedPerFormance.push(lp._id);
        }
        const findPerformances = await Performance.find({ _id: { $in: allPerformanceIds } }).populate({ path: "participant", select: "firstname lastname" });

        function findAbsent(longArr, shortArr) {
            return longArr.filter(function (el) {
                return !shortArr.find(ass => ass === el);
            });
        }


        // CREATING NET AND PERFORMANCE OF THE PLAYER 
        const allNetsIds = [];

        // console.log("Found rounds - ", findRound);
        if (!findRound || findRound === null) {
            // CREATE NEW ROUND DOCUMENT 
            // console.log("No Round - create new one");




            let ranking = findPerformances;

            if (roundNum === 2) {
                // console.log("Round 2");
                ranking = findPerformances.sort(rankingRound1);
            } else if (roundNum === 3) {
                ranking = findPerformances.sort(rankingRound2);
            } else if (roundNum === 4) {
                ranking = findPerformances.sort(rankingRound3);
            } else if (roundNum === 5) {
                ranking = findPerformances.sort(rankingRound4);
            }











            // ALGORITHM START
            const rankingIds = ranking.map(a => a._id);
            let j = ranking.length, temporary, chunk = 4, netNo = 1,
                netOffset = 2, offseted = false, runtime = 1; floorMaxRuntime = Math.floor(j / chunk),
                    maxRuntime = Math.ceil(j / chunk), modulas = j % chunk;


            const previousRankingLastNet = findPreviousRound.nets[findPreviousRound.nets.length - 1].performance;
            const previousRankingLastNetIds = previousRankingLastNet.map(a => a._id);


            const lastTwoNetOfThisRound = ranking.slice(floorMaxRuntime * chunk - chunk);
            const lastTwoNetOfThisRoundIds = lastTwoNetOfThisRound.map(a => a._id);



            const stuckPerformances = [];

            for (let i = 0; i < lastTwoNetOfThisRoundIds.length; i++) {
                for (let k = 0; k < previousRankingLastNetIds.length; k++) {
                    if (lastTwoNetOfThisRoundIds[i].toString() === previousRankingLastNetIds[k].toString()) {
                        // console.log("Matching - ", lastTwoNetOfThisRoundIds[i].toString() === previousRankingLastNetIds[k].toString());
                        stuckPerformances.push(lastTwoNetOfThisRoundIds[i]);
                    }
                }
            }
            // console.log("stuckPerformances - ", stuckPerformances);

            const stuck = stuckPerformances.length;
            const assignedToTemp = [];

            for (let i = 0; i < j; i += chunk) {
                temporary = [];
                if (modulas !== 0 && stuck > 0) {
                    if (runtime > maxRuntime - netOffset) {
                        if (!offseted) {
                            // FOUR PEOPLE NET - PUSH TEMP PEOPLE 
                            for (let s = 0; s < stuck; s++) {
                                const findNetItem = rankingIds.find(r => r === stuckPerformances[s]);
                                temporary.push(findNetItem);
                            }
                            const rankTemp = findAbsent(rankingIds.slice(i), temporary);
                            // PUSH FROM RANK - HERE I NEED TO SOLVE
                            for (let l = 0; l < chunk - stuck; l++) {
                                temporary.push(rankTemp[l]);
                            }
                            offseted = true; // REST OF THE PEOPLE WILL BE IN ABSENT
                        } else {
                            temporary = findAbsent(rankingIds, assignedToTemp);
                        }
                    } else {
                        temporary = rankingIds.slice(i, chunk + i);
                    }
                } else {
                    temporary = rankingIds.slice(i, chunk + i);
                }
                assignedToTemp.push(...temporary);




                const newNet = new Net({
                    sl: netNo,
                    performance: temporary,
                    event: req.params.eventID,
                });

                const net = await newNet.save();
                allNetsIds.push(net._id);

                netNo++;
                runtime++;
            }




            const new_round = new Round({
                no: roundNum,
                event: req.params.eventID,
                performances: assignedToTemp,
                nets: allNetsIds,
                left: allLeftedPerFormance
            });
            // console.log("New Round - ", new_round);
            // console.log("Round Num - ", roundNum);
            const round = await new_round.save();
            const updateNetRound = await Net.updateMany({ _id: { $in: allNetsIds } }, { round: round._id }, { new: true });


        } else {
            // UPDATE EXISTING ROUND OR RESORT OR REASSIGN
            let ranking = findPerformances;

            if (roundNum === 1) {
                // console.log("Round 2");
                ranking = findPerformances.sort(rankingRound1);
            } else if (roundNum === 2) {
                ranking = findPerformances.sort(rankingRound2);
            } else if (roundNum === 3) {
                ranking = findPerformances.sort(rankingRound3);
            } else if (roundNum === 4) {
                ranking = findPerformances.sort(rankingRound4);
            } else if (roundNum === 5) {
                ranking = findPerformances.sort(rankingRound5);
            }




            const deleteNets = await Net.deleteMany({ event: eventID, round: findRound._id });



            // CREATING NET AND PERFORMANCE OF THE PLAYER            


            // ALGORITHM START
            const rankingIds = ranking.map(a => a._id);
            let j = ranking.length, temporary, chunk = 4, netNo = 1,
                netOffset = 2, offseted = false, runtime = 1; floorMaxRuntime = Math.floor(j / chunk),
                    maxRuntime = Math.ceil(j / chunk), modulas = j % chunk;


            const previousRankingLastNet = findPreviousRound.nets[findPreviousRound.nets.length - 1].performance;
            const previousRankingLastNetIds = previousRankingLastNet.map(a => a._id);


            const lastTwoNetOfThisRound = ranking.slice(floorMaxRuntime * chunk - chunk);
            const lastTwoNetOfThisRoundIds = lastTwoNetOfThisRound.map(a => a._id);



            const stuckPerformances = [];

            for (let i = 0; i < lastTwoNetOfThisRoundIds.length; i++) {
                for (let k = 0; k < previousRankingLastNetIds.length; k++) {
                    if (lastTwoNetOfThisRoundIds[i].toString() === previousRankingLastNetIds[k].toString()) {
                        // console.log("Matching - ", lastTwoNetOfThisRoundIds[i].toString() === previousRankingLastNetIds[k].toString());
                        stuckPerformances.push(lastTwoNetOfThisRoundIds[i]);
                    }
                }
            }
            // console.log("stuckPerformances - ", stuckPerformances);

            const stuck = stuckPerformances.length;
            const assignedToTemp = [];

            for (let i = 0; i < j; i += chunk) {
                temporary = [];
                if (modulas !== 0 && stuck > 0) {
                    if (runtime > maxRuntime - netOffset) {
                        if (!offseted) {
                            // FOUR PEOPLE NET - PUSH TEMP PEOPLE 
                            for (let s = 0; s < stuck; s++) {
                                const findNetItem = rankingIds.find(r => r === stuckPerformances[s]);
                                temporary.push(findNetItem);
                            }
                            const rankTemp = findAbsent(rankingIds.slice(i), temporary);
                            // PUSH FROM RANK - HERE I NEED TO SOLVE
                            for (let l = 0; l < chunk - stuck; l++) {
                                temporary.push(rankTemp[l]);
                            }
                            offseted = true; // REST OF THE PEOPLE WILL BE IN ABSENT
                        } else {
                            temporary = findAbsent(rankingIds, assignedToTemp);
                        }
                    } else {
                        temporary = rankingIds.slice(i, chunk + i);
                    }
                } else {
                    temporary = rankingIds.slice(i, chunk + i);
                }
                assignedToTemp.push(...temporary);





                const newNet = new Net({
                    sl: netNo,
                    event: eventID,
                    round: findRound._id,
                    performance: netPerformanceIds
                });
                const net = await newNet.save();
                allNetsIds.push(net._id);

                netNo++;
            }


            // console.log("All nets ids - ", allNetsIds);



            // UPDATE NETS AND ROUND 
            const updateRound = await Round.findOneAndUpdate(
                { event: eventID, no: roundNum },
                { performances: assignedToTemp, left: allLeftedPerformance, nets: allNetsIds }
            );
            // console.log("Update round - ", updateRound);

        }


        res.status(201).json({ msg: "rank performance and inatilize performance", params: req.params });

    } catch (error) {
        console.log(error);
    }
});

















module.exports = router;


