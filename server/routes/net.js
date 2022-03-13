const express = require('express');
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

        const findNets = await Net.find({ event: req.params.eventID });
        if (findNets.length < 1) {
            // RANDOMIZE PERFORMANCE 
            const performances = await Performance.find({ event: req.params.eventID });
            // const event = await Event.findById({ _id: req.params.eventID }).populate('participants').exec();
            // const participants = event.participants;
            let randomPerformance = [];
            while (randomPerformance.length < performances.length) {
                let random = performances[Math.floor(Math.random() * performances.length)];
                randomPerformance.push(random);
                randomPerformance = [...new Set(randomPerformance)];
            }




            // CREATING NET AND PERFORMANCE OF THE PLAYER 
            const allNetsIds = [];
            const allPerformanceIds = [];




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
        const findRound = await Round.findOne({ event: req.params.eventID, no: roundNum });

        if (!findRound || findRound === null) {


            const allPerformanceIds = [];
            for (let per of performances) {
                allPerformanceIds.push(per._id);
            }
            const allLeftedPerformance = [];
            for (let lp of leftedPerformance) {
                allLeftedPerformance.push(lp._id);
            }

            const findPerformances = await Performance.find({ _id: { $in: allPerformanceIds } }).populate({ path: "participant", select: "firstname lastname" });
            const assending = true;
            if (assending) {
                let ranking = findPerformances;

                if (roundNum === 2) {
                    ranking = findPerformances.sort(rankingRound1);
                } else if (roundNum === 3) {
                    ranking = findPerformances.sort(rankingRound2);
                } else if (roundNum === 4) {
                    ranking = findPerformances.sort(rankingRound3);
                } else if (roundNum === 5) {
                    ranking = findPerformances.sort(rankingRound4);
                }


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
                    allNetsIds.push(net._id);


                    for (let k of temporary) {
                        allPerformanceIds.push(k._id);
                        const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { $push: { performance: k._id } }, { new: true });
                    }
                    netNo++;
                }



                const new_round = new Round({
                    no: roundNum,
                    event: req.params.eventID,
                    performances: allPerformanceIds,
                    nets: allNetsIds,
                    left: allLeftedPerformance
                });

                const round = await new_round.save();
                const updateNetRound = await Net.updateMany({ _id: { $in: allNetsIds } }, { round: round._id }, { new: true });

            } else {
                // RANDOM ASSIGN
                console.log("Random assign");
            }


        } else {
            // UPDATE EXISTING ROUND OR RESORT OR REASSIGN
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

                const newNet = new Net({
                    sl: netNo,
                    event: eventID,
                    round: findRound._id,
                    performance: netPerformanceIds
                });
                const net = await newNet.save();
                allNetsIds.push(net._id);


                // const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { performance: netPerformanceIds }, { new: true });


                netNo++;
            }




            // UPDATE NETS AND ROUND 
            const updateRound = await Round.findOneAndUpdate(
                { event: eventID, no: roundNum },
                { performances: allPerformanceIds, left: allLeftedPerformance, nets: allNetsIds }
            );

        }


        res.status(201).json({ msg: "rank performance and inatilize performance", params: req.params })

    } catch (error) {
        console.log(error);
    }
});






























// ⛏️⛏️ RANDOM REASSIGN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/random-assign-net/:eventID/:roundNum', ensureAuth, async (req, res, next) => {
    try {

        const { eventID } = req.params;


        const { performances, leftedPerformance } = req.body;
        const roundNum = parseInt(req.params.roundNum);
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

            const findPerformances = await Performance.find({ _id: { $in: allPerformanceIds } }).populate({ path: "participant", select: "firstname lastname" });



            let randomPerformance = [];
            while (randomPerformance.length < findPerformances.length) {
                let random = findPerformances[Math.floor(Math.random() * findPerformances.length)];
                randomPerformance.push(random);
                randomPerformance = [...new Set(randomPerformance)];
            }


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
                allNetsIds.push(net._id);


                let netPerformanceIds = [];
                for (let k of temporary) {
                    netPerformanceIds.push(k._id);
                }

                const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { performance: netPerformanceIds }, { new: true });
                netNo++;
            }





            const new_round = new Round({
                no: roundNum,
                event: eventID,
                performances: allPerformanceIds,
                nets: allNetsIds,
                left: allLeftedPerformance
            });
            const round = await new_round.save();
            const updateNetRound = await Net.updateMany({ _id: { $in: allNetsIds } }, { round: round._id }, { new: true });


        } else {

            // UPDATE EXISTING ROUND OR RESORT OR REASSIGN
            const allPerformanceIds = [];
            for (let per of performances) {
                allPerformanceIds.push(per._id);
            }



            const allLeftedPerformance = [];
            for (let lp of leftedPerformance) {
                allLeftedPerformance.push(lp._id);
            }



            let randomPerformance = [];
            while (randomPerformance.length < allPerformanceIds.length) {
                let random = allPerformanceIds[Math.floor(Math.random() * allPerformanceIds.length)];
                randomPerformance.push(random);
                randomPerformance = [...new Set(randomPerformance)];
            }






            // DELETE ALL NETS 
            const deleteNets = await Net.deleteMany({ event: eventID, round: currentRound._id });
            // CREATING NET AND PERFORMANCE OF THE PLAYER            

            let i, j, temporary, chunk = 4, netNo = 1, k = 0;
            const allNetsIds = new Array();

            for (i = 0, j = randomPerformance.length; i < j; i += chunk) {
                temporary = randomPerformance.slice(i, i + chunk);


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

                const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { performance: netPerformanceIds }, { new: true });




                netNo++;
                k++;
            }
            // UPDATE NETS AND ROUND 
            const updateRound = await Round.findOneAndUpdate(
                { event: eventID, no: roundNum },
                { performances: allPerformanceIds, left: allLeftedPerformance, nets: allNetsIds }
            );





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


        if (roundNum < 2) return res.status(200).json({ msg: "You can't pack assign in first round" }); // IF THE TURNAMENT IS NOT REACHED OVER 1 THIS WILL RETURN FROM HERE



        const findPreviousRound = await Round.findOne({ event: req.params.eventID, no: roundNum - 1 }).populate({ path: "nets", populate: { path: "performance" } });
        const findThisRound = await Round.findOne({ event: req.params.eventID, no: roundNum });









        // FIND WHO PLAYED IN THE LAST NET OF ALL PREVIOUS ROUNDS
        const allPreviousRounds = await Round.find({ event: eventID, no: { $lt: roundNum } }).populate({ path: "nets" });

        const allPreviousLastNets = []
        for (let n = 0; n < allPreviousRounds.length; n++) {
            // const bar = [...foo].pop();
            const lastNet = [...allPreviousRounds[n].nets].pop();
            allPreviousLastNets.push(lastNet);
        }



        const tempAllLastNetsIds = [];
        for (let m = 0; m < allPreviousLastNets.length; m++) {
            for (let o = 0; o < allPreviousLastNets[m].performance.length; o++) {
                tempAllLastNetsIds.push(allPreviousLastNets[m].performance[o]);
            }
        }


        const allLastNetsIds = [...new Set(tempAllLastNetsIds)]; // ALL LAST NETS OF ALL PREVIOUS ROUND - SOME PROBLEM HERE TO REMOVE DUPLICATE




        // CONVERT ARRAY OF OBJECT TO ONLY OBJECT 
        const allPerformanceIds = objectToIds(performances);
        const allLeftedPerformance = objectToIds(leftedPerformance);
        // console.log({ allLeftedPerformance, leftedPerformance });


        const findPerformances = await Performance.find({ _id: { $in: allPerformanceIds } }).populate({ path: "participant", select: "firstname lastname" });




        // CREATING NET AND PERFORMANCE OF THE PLAYER 
        const allNetsIds = [];


        if (!findThisRound || findThisRound === null) {
            // CREATE NEW ROUND DOCUMENT 

            let ranking = findPerformances;

            // CREATE RANKING 
            if (roundNum === 2) {
                ranking = findPerformances.sort(rankingRound1);
            } else if (roundNum === 3) {
                ranking = findPerformances.sort(rankingRound2);
            } else if (roundNum === 4) {
                ranking = findPerformances.sort(rankingRound3);
            } else if (roundNum === 5) {
                ranking = findPerformances.sort(rankingRound4);
            }



            // ALGORITHM START
            // CONVERT OBJECT OF ARRAY TO ID OF ARRAY 
            let rankingIds = objectToIds(ranking);

            // DECLARING VARIABLES 
            let j = ranking.length,
                w = 0, // SLICING ELEMENTS FROM ARRAY IF STUCK PERFORMANCE IS MORE THAN 4
                hasLastShortElement = true,
                shortTempLen = null,
                temporary, // THIS WILL HOLD 4 NET WHICH WILL BE ASSIGNED TO THE NET
                fillLastNet = false, // IN THE LAST NET THIS fillLastNet WILL BE TRUE
                runtime = 1; // EVERY TIME WE ASSIGN A NET WE NEED TO INCREASE 1 RUNTIME


            const chunk = 4, // BASICALLY 4 PEOPLE WILL BE IN A NET
                floorMaxRuntime = Math.floor(j / chunk), //  IF WE GET FRACTION AFTER DIVISION WE WILL GET FLOOR VALUE 
                maxRuntime = Math.ceil(j / chunk), // IF WE GET FRACTION AFTER DIVISION WE WILL GET HEIGHT VALUE OF THAT FRACTION
                modulas = j % chunk; // ALL PERFORMANCE % CHUNK = MODULAS / REMENANT (15 % 4 = 3) 


            // FIND LAST NET OF PREVIOUS ROUND
            const previousRankingLastNet = findPreviousRound.nets[findPreviousRound.nets.length - 1].performance;
            const previousRankingLastNetIds = objectToIds(previousRankingLastNet); // CONVERT ARRAY OF OBJECTS TO ARRAY OF IDS


            // FIND LAST TWO NET OF THIS ROUND 
            const lastTwoNetOfThisRound = ranking.slice(floorMaxRuntime * chunk - chunk);
            const lastTwoNetOfThisRoundIds = objectToIds(lastTwoNetOfThisRound);

            // ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨ 
            // IF STUCK PERFORMANCE IS MORE THAN LAST 2 NET THEN DEVIDE THE ARRAY / IN FIRST HALF 
            // THERE WILL BE ALL STUCK PERFORMANCE AND IN SEND HALF 
            // THERE WILL BE ONLY THOSE WHO HASN'T PAY ANY LAST NET GAME THEN SLICE ONE BY ONE
            // PROBLEM ONLY CHECKING FOR 7 ELEMENTS, BUT ALL LAST NETS IDS COULD BE MORE THAN 7
            // console.log({ allLastNetsIds: [...new Set([...allLastNetsIds])], lastTwoNetOfThisRoundIds });
            // FIND PLAYERS WHO WHERE IN THE LAST NET PREVIOUSLY AND THEY ARE ALSO IN THE LAST NET IN THIS ROUND 
            let stuckPerformances = findCommon(allLastNetsIds, lastTwoNetOfThisRoundIds);
            let netOffset = Math.ceil(stuckPerformances.length / chunk) + 1; // LAST TWO NEED WILL BE SEPERATED BY THIS


            // NET OFFSET CAN'T BE LESS THAN TWO, BECAUSE WE ATLEAST WANT TO SET LAST TWO NET 
            netOffset < 2 ? netOffset = 2 : netOffset = netOffset;
            // console.log({ stuckPerformances, netOffset });

            let tooManyStuck = false;
            if (allLastNetsIds.length > lastTwoNetOfThisRoundIds.length) {
                tooManyStuck = true;
                const getStuckFromRanking = findCommon([...rankingIds], [...allLastNetsIds]);
                const nonStuck = findAbsent([...rankingIds], [...getStuckFromRanking]);
                rankingIds = [...getStuckFromRanking, ...nonStuck];
            } else {
                tooManyStuck = false;
            }

            const stuck = stuckPerformances.length;
            const assignedToTemp = [];

            // BY THIS FOR LOOP EVERY FOUR PERFORMANCE WILL BE ASSIGNED TO A NET 
            for (let i = 0; i < j; i += chunk) {
                temporary = []; // JUST FOR REFRESHING THE ARRAY SO IT WOULDN'T HAVE ANY ITEM



                if (tooManyStuck) {
                    temporary = rankingIds.slice(i, chunk + i);
                } else {
                    // IF LAST NET HAS MORE THAN ZERO AND STUCK PERFORMANCE LIST OF THIS ROUND IS GRATER THAN ZERO  
                    if (modulas !== 0 && stuck > 0) {
                        // CHECK WE ARE IN LAST TWO NET / PACK
                        if (runtime > maxRuntime - netOffset) {

                            // IF THE PLAYERS WHO IS BEEN ASSIGNED IN LAST NET CHECK IF THEY EVER PLAYED IN LAST NET OF ANY ROUND 
                            // IF THEY PLAYED IN LAST ROUND ASSIGN THEM AFTER LAST NET OF PREVIOUS ROUND 
                            if (!fillLastNet) {
                                if (stuck > chunk) {
                                    for (let s = 0; s < chunk; s++) {
                                        try {
                                            const findNetItem = rankingIds.find(r => r.toString() === stuckPerformances[w].toString());
                                            temporary.push(findNetItem);
                                            w++;
                                        } catch (undefinedErr) {
                                            // console.log(undefinedErr);
                                        }
                                    }
                                    if (temporary.length < chunk) {
                                        const rankTemp = findAbsent(rankingIds, assignedToTemp);
                                        if (hasLastShortElement) {
                                            shortTempLen = chunk - temporary.length;
                                            hasLastShortElement = false;
                                        }
                                        // PUSH FROM RANK - HERE I NEED TO SOLVE
                                        for (let l = 0; l < shortTempLen; l++) {
                                            temporary.push(rankTemp[l]);
                                        }
                                    }


                                } else {
                                    // FIRST NET OF THE PACK 
                                    // FOUR PEOPLE NET - PUSH TEMP PEOPLE 
                                    for (let s = 0; s < stuck; s++) {
                                        const findNetItem = rankingIds.find(r => r.toString() === stuckPerformances[s].toString());
                                        temporary.push(findNetItem);
                                    }

                                    // CHECK HERE 

                                    const rankTemp = findAbsent(rankingIds.slice(i), temporary);
                                    // PUSH FROM RANK - HERE I NEED TO SOLVE
                                    for (let l = 0; l < chunk - stuck; l++) {
                                        temporary.push(rankTemp[l]);
                                    }

                                }
                            } else {
                                // LAST NET OF THE PACK 
                                temporary = findAbsent(rankingIds, assignedToTemp);
                                // const foundCommon = findCommon(stuckPerformances, temporary);
                                // console.log({ stuckPerformances, temporary });
                            }
                        } else {
                            temporary = rankingIds.slice(i, chunk + i);
                        }
                    } else {
                        temporary = rankingIds.slice(i, chunk + i);
                    }
                }


                assignedToTemp.push(...temporary);




                const newNet = new Net({
                    sl: runtime,
                    performance: temporary,
                    event: req.params.eventID,
                });

                const net = await newNet.save();
                allNetsIds.push(net._id);


                if (i === j - (modulas + chunk)) {
                    fillLastNet = true;
                }
                runtime++;
            }




            const new_round = new Round({
                no: roundNum,
                event: req.params.eventID,
                performances: assignedToTemp,
                nets: allNetsIds,
                left: allLeftedPerformance
            });


            const round = await new_round.save();
            const updateNetRound = await Net.updateMany({ _id: { $in: allNetsIds } }, { round: round._id }, { new: true });
            // ALGORITHM ENDS HERE 

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




            const deleteNets = await Net.deleteMany({ event: eventID, round: findThisRound._id });



            // ALGORITHM START
            // CONVERT OBJECT OF ARRAY TO ID OF ARRAY 
            let rankingIds = objectToIds(ranking);

            // DECLARING VARIABLES 
            let j = ranking.length,
                w = 0, // SLICING ELEMENTS FROM ARRAY IF STUCK PERFORMANCE IS MORE THAN 4
                hasLastShortElement = true,
                shortTempLen = null,
                temporary, // THIS WILL HOLD 4 NET WHICH WILL BE ASSIGNED TO THE NET
                fillLastNet = false, // IN THE LAST NET THIS fillLastNet WILL BE TRUE
                runtime = 1; // EVERY TIME WE ASSIGN A NET WE NEED TO INCREASE 1 RUNTIME


            const chunk = 4, // BASICALLY 4 PEOPLE WILL BE IN A NET
                floorMaxRuntime = Math.floor(j / chunk), //  IF WE GET FRACTION AFTER DIVISION WE WILL GET FLOOR VALUE 
                maxRuntime = Math.ceil(j / chunk), // IF WE GET FRACTION AFTER DIVISION WE WILL GET HEIGHT VALUE OF THAT FRACTION
                modulas = j % chunk; // ALL PERFORMANCE % CHUNK = MODULAS / REMENANT (15 % 4 = 3) 


            // FIND LAST NET OF PREVIOUS ROUND
            const previousRankingLastNet = findPreviousRound.nets[findPreviousRound.nets.length - 1].performance;
            const previousRankingLastNetIds = objectToIds(previousRankingLastNet); // CONVERT ARRAY OF OBJECTS TO ARRAY OF IDS


            // FIND LAST TWO NET OF THIS ROUND 
            const lastTwoNetOfThisRound = ranking.slice(floorMaxRuntime * chunk - chunk);
            const lastTwoNetOfThisRoundIds = objectToIds(lastTwoNetOfThisRound);

            // IF STUCK PERFORMANCE IS MORE THAN LAST 2 NET THEN DEVIDE THE ARRAY / IN FIRST HALF 
            // THERE WILL BE ALL STUCK PERFORMANCE AND IN SEND HALF 
            // THERE WILL BE ONLY THOSE WHO HASN'T PAY ANY LAST NET GAME THEN SLICE ONE BY ONE
            // PROBLEM ONLY CHECKING FOR 7 ELEMENTS, BUT ALL LAST NETS IDS COULD BE MORE THAN 7
            // console.log({ allLastNetsIds: [...new Set([...allLastNetsIds])], lastTwoNetOfThisRoundIds });
            // FIND PLAYERS WHO WHERE IN THE LAST NET PREVIOUSLY AND THEY ARE ALSO IN THE LAST NET IN THIS ROUND 
            let stuckPerformances = findCommon(allLastNetsIds, lastTwoNetOfThisRoundIds);
            let netOffset = Math.ceil(stuckPerformances.length / chunk) + 1; // LAST TWO NEED WILL BE SEPERATED BY THIS


            // NET OFFSET CAN'T BE LESS THAN TWO, BECAUSE WE ATLEAST WANT TO SET LAST TWO NET 
            netOffset < 2 ? netOffset = 2 : netOffset = netOffset;
            // console.log({ stuckPerformances, netOffset });

            let tooManyStuck = false;
            if (allLastNetsIds.length > lastTwoNetOfThisRoundIds.length) {
                tooManyStuck = true;
                const getStuckFromRanking = findCommon([...rankingIds], [...allLastNetsIds]);
                const nonStuck = findAbsent([...rankingIds], [...getStuckFromRanking]);
                rankingIds = [...getStuckFromRanking, ...nonStuck];
            } else {
                tooManyStuck = false;
            }

            const stuck = stuckPerformances.length;
            const assignedToTemp = [];





            // BY THIS FOR LOOP EVERY FOUR PERFORMANCE WILL BE ASSIGNED TO A NET 
            for (let i = 0; i < j; i += chunk) {
                temporary = []; // JUST FOR REFRESHING THE ARRAY SO IT WOULDN'T HAVE ANY ITEM



                if (tooManyStuck) {
                    temporary = rankingIds.slice(i, chunk + i);
                } else {
                    // IF LAST NET HAS MORE THAN ZERO AND STUCK PERFORMANCE LIST OF THIS ROUND IS GRATER THAN ZERO  
                    if (modulas !== 0 && stuck > 0) {
                        // CHECK WE ARE IN LAST TWO NET / PACK
                        if (runtime > maxRuntime - netOffset) {

                            // IF THE PLAYERS WHO IS BEEN ASSIGNED IN LAST NET CHECK IF THEY EVER PLAYED IN LAST NET OF ANY ROUND 
                            // IF THEY PLAYED IN LAST ROUND ASSIGN THEM AFTER LAST NET OF PREVIOUS ROUND 
                            if (!fillLastNet) {
                                if (stuck > chunk) {
                                    for (let s = 0; s < chunk; s++) {
                                        try {
                                            const findNetItem = rankingIds.find(r => r.toString() === stuckPerformances[w].toString());
                                            temporary.push(findNetItem);
                                            w++;
                                        } catch (undefinedErr) {
                                            // console.log(undefinedErr);
                                        }
                                    }
                                    if (temporary.length < chunk) {
                                        const rankTemp = findAbsent(rankingIds, assignedToTemp);
                                        if (hasLastShortElement) {
                                            shortTempLen = chunk - temporary.length;
                                            hasLastShortElement = false;
                                        }
                                        // PUSH FROM RANK - HERE I NEED TO SOLVE
                                        for (let l = 0; l < shortTempLen; l++) {
                                            temporary.push(rankTemp[l]);
                                        }
                                    }


                                } else {
                                    // FIRST NET OF THE PACK 
                                    // FOUR PEOPLE NET - PUSH TEMP PEOPLE 
                                    for (let s = 0; s < stuck; s++) {
                                        const findNetItem = rankingIds.find(r => r.toString() === stuckPerformances[s].toString());
                                        temporary.push(findNetItem);
                                    }

                                    // CHECK HERE 

                                    const rankTemp = findAbsent(rankingIds.slice(i), temporary);
                                    // PUSH FROM RANK - HERE I NEED TO SOLVE
                                    for (let l = 0; l < chunk - stuck; l++) {
                                        temporary.push(rankTemp[l]);
                                    }

                                }
                            } else {
                                // LAST NET OF THE PACK 
                                temporary = findAbsent(rankingIds, assignedToTemp);
                                // const foundCommon = findCommon(stuckPerformances, temporary);
                                // console.log({ stuckPerformances, temporary });
                            }
                        } else {
                            temporary = rankingIds.slice(i, chunk + i);
                        }
                    } else {
                        temporary = rankingIds.slice(i, chunk + i);
                    }
                }


                assignedToTemp.push(...temporary);




                const newNet = new Net({
                    sl: runtime,
                    performance: temporary,
                    event: req.params.eventID,
                });

                const net = await newNet.save();
                allNetsIds.push(net._id);


                if (i === j - (modulas + chunk)) {
                    fillLastNet = true;
                }
                runtime++;
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







// CHECK WHICH ELEMENTS OF AN ARRAY IS ABSENT IN ANOTHER ARRAY 
function findAbsent(longArr, shortArr) {
    return longArr.filter(function (el) {
        return !shortArr.find(ass => ass === el);
    });
}


function findCommon(longArr, shortArr) {
    return longArr.filter(function (el) {
        return shortArr.find(ass => ass.toString() === el.toString());
    });
}


function objectToIds(selectedObjectArr) {
    const newArr = [];
    for (let i = 0; i < selectedObjectArr.length; i++) {
        newArr.push(selectedObjectArr[i]._id);
    }
    return newArr;
}










module.exports = router;


