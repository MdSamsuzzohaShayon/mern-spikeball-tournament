const express = require('express');
const Event = require('../models/Event');
const Net = require('../models/Net');
const Performance = require('../models/Performance');
const Round = require('../models/Round');
const { rankingRound1, rankingRound2, rankingRound3, rankingRound4, wholeRanking, rankingRoundNine, rankingRoundThirteen } = require('../utils/ranking');
const updatedPerformance = require('../utils/updatedPerformance');

const router = express.Router();
// arr[Math.floor(Math.random() * arr.length)];





// ⛏️⛏️ ASSIGN PLAYER TO THE NET - CREATE CREATE MORE NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/assign-net/:eventID/:roundNum', async (req, res, next) => {
    try {

        const { performances, leftedPerformance } = req.body;
        const roundNum = parseInt(req.params.roundNum);
        // console.log(req.body);
        const findRound = await Round.findOne({ event: req.params.eventID, no: roundNum });

        // console.log("Found rounds - ", findRound);
        if (!findRound || findRound === null) {


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
            console.log("Update existing");
            // console.log(findRound.performances);
            const allPerformanceIds = [];
            for (let per of findRound.performances) {
                allPerformanceIds.push(per._id);
            }

            const findPerformances = await Performance.find({ _id: { $in: allPerformanceIds } }).populate({ path: "participant", select: "firstname lastname" });
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



            // CREATING NET AND PERFORMANCE OF THE PLAYER            

            let i, j, temporary, chunk = 4, netNo = 1, k = 0;

            for (i = 0, j = ranking.length; i < j; i += chunk) {
                temporary = ranking.slice(i, i + chunk);
                const performance = [];

                for (let k of temporary) {
                    performance.push(k._id);
                }

                const updateNet = await Net.findOneAndUpdate({ _id: findRound.nets[k]._id }, { performance: performance });


                netNo++;
                k++;
            }

        }


        res.status(201).json({ msg: "rank performance and inatilize performance", params: req.params })

    } catch (error) {
        console.log(error);
    }
});






























// ⛏️⛏️ RANDOM REASSIGN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/random-assign-net/:eventID/:roundNum', async (req, res, next) => {
    try {

        console.log("Random assign");


        const { performances, leftedPerformance } = req.body;
        const roundNum = parseInt(req.params.roundNum);
        // console.log(req.body);
        const findRound = await Round.findOne({ event: req.params.eventID, no: roundNum });



        if (!findRound || findRound === null) {
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
            const allperformances = [];




            let i, j, temporary, chunk = 4, netNo = 1;
            for (i = 0, j = randomPerformance.length; i < j; i += chunk) {
                temporary = randomPerformance.slice(i, i + chunk);


                const newNet = new Net({
                    sl: netNo,
                    // performance: performanceIds,
                    event: req.params.eventID,
                });
                const net = await newNet.save();
                // console.log("NET sl - ", netNo);
                // console.log("NET - ", net);
                allNetsIds.push(net._id);


                let netPerformanceIds = [];
                for (let k of temporary) {
                    allperformances.push(k._id);
                }
                const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { performance: netPerformanceIds }, { new: true });
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




        } else {

            // UPDATE EXISTING ROUND OR RESORT OR REASSIGN
            console.log("Update existing");
            // console.log(findRound.performances);
            const allPerformanceIds = [];
            for (let per of findRound.performances) {
                allPerformanceIds.push(per._id);
            }

            let randomPerformance = [];
            while (randomPerformance.length < allPerformanceIds.length) {
                let random = allPerformanceIds[Math.floor(Math.random() * allPerformanceIds.length)];
                randomPerformance.push(random);
                randomPerformance = [...new Set(randomPerformance)];
            }




            // CREATING NET AND PERFORMANCE OF THE PLAYER            

            let i, j, temporary, chunk = 4, netNo = 1, k = 0;

            for (i = 0, j = randomPerformance.length; i < j; i += chunk) {
                temporary = randomPerformance.slice(i, i + chunk);
                const performance = [];

                for (let k of temporary) {
                    performance.push(k._id);
                }

                const updateNet = await Net.findOneAndUpdate({ _id: findRound.nets[k]._id }, { performance: performance });


                netNo++;
                k++;
            }

        }




        res.status(201).json({ msg: "rank performance and inatilize performance", params: req.params })

    } catch (error) {
        console.log(error);
    }
});

















module.exports = router;


