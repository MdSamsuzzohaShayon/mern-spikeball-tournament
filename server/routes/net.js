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
        if (findRound || findRound == null) {
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
                    console.log("Round 2");
                    ranking = findPerformances.sort(rankingRound1);
                } else if (roundNum === 3) {
                    ranking = findPerformances.sort(rankingRound2);
                } else if (roundNum === 4) {
                    ranking = findPerformances.sort(rankingRound3);
                } else if (roundNum === 5) {
                    ranking = findPerformances.sort(rankingRound4);
                }

                console.log("Ranking - ", ranking);
                console.log("------------------------BREAK--------------------------");

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
                    console.log("NET sl - ", netNo);
                    console.log("NET - ", net);
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
        }

        /*
        // AT FIRST FIND NET AND CHECK FOR NET ALREADY EXIST OR NOT 
        const findPerformance = await Performance.find({ event: req.params.eventID });
        // console.log(findPerformance);
        const ranking = findPerformance.sort(rankingRound);

        // CREATE NETS 
        // console.log(ranking);
        let net;
        let i, j, temporary, chunk = 4, netNo = 1;
        for (i = 0, j = ranking.length; i < j; i += chunk) {
            temporary = ranking.slice(i, i + chunk);


            const newNet = new Net({
                sl: netNo,
                $push: { performance: ranking._id },
                event: req.params.eventID,
                round: req.params.round
            });
            net = await newNet.save();

            for (let k of temporary) {
                const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { $push: { performance: k._id } }, { new: true });
            }


            netNo++;
        }
        */

        res.status(201).json({ msg: "rank performance and inatilize performance", params: req.params })

    } catch (error) {
        console.log(error);
    }
});













// ⛏️⛏️ RANDOM REASSIGN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 










module.exports = router;


