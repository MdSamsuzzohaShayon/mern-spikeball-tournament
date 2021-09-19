const express = require('express');
const Performance = require('../models/Performance');
const Round = require('../models/Round');
const Net = require('../models/Net');

const { rankingRound1, wholeRanking, rankingRound2Ind, rankingRound3Ind, rankingRound4Ind } = require('../utils/ranking');


const router = express.Router();
// arr[Math.floor(Math.random() * arr.length)];





// get-net 
// ⛏️⛏️ GET SINGLE ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.get('/get-single-round/:eventID/:round', async (req, res, next) => {
    try {
        const findRound = await Round.findOne({ event: req.params.eventID, no: req.params.round })
            .populate({
                path: "nets",
                select: "performance",
                populate: {
                    path: 'performance',
                    select: 'participant nog net game1 game2 game3 game4 game5 game6 game7 game8 game9 game10 game11 game12 game13 game14 game15',
                    populate: {
                        path: "participant",
                        select: "firstname lastname"
                    }
                }
            })
            // .populate({
            //     path: "left",
            //     select: "performance",
            //     populate: {
            //         path: 'performance',
            //         select: 'participant',
            //         populate: {
            //             path: "participant",
            //             select: "firstname lastname"
            //         }
            //     }
            // })
            .exec();


        // console.log(findRound);
        let leftRound = null;
        
        if (findRound) {
            leftRound = await Performance.find({ _id: { $in: findRound.left } })
                .populate({
                    path: "participant",
                    select: "firstname lastname"

                });
        }
        res.status(200).json({ msg: 'Getting Rounds', findRound, leftRound });
    } catch (error) {
        console.log(error);
    }
});







// ⛏️⛏️ ASSIGN PLAYER TO THE NET - CREATE CREATE MORE NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.get('/ranking/:eventID', async (req, res, next) => {
    try {
        const performance = await Performance.find({ event: req.params.eventID }).populate({ path: "participant", select: "firstname lastname" });
        const allPerformances = performance.sort(wholeRanking);



        const rounds = await Round.find({ event: req.params.eventID }).populate({
            path: 'performances',
            select: 'participant net game1 game2 game3 game4 game5 game6 game7 game8 game9 game10 game11 game12 game13 game14 game15',
            populate: {
                path: "participant",
                select: "firstname lastname"
            }
        }).exec();




        let round1 = null, round2 = null, round3 = null, round4 = null, round5 = null;
        const round1Slice = rounds.filter(r => r.no === 1)[0];
        if (round1Slice) {
            const round1Asscending = round1Slice.performances.sort(rankingRound1);
            round1 = round1Asscending.filter(r => r.game1 || r.game2 || r.game3);
        }



        const round2Slice = rounds.filter(r => r.no === 2)[0];
        // console.log(round2Slice);
        if (round2Slice) {
            const round2Asscending = round2Slice.performances.sort(rankingRound2Ind);
            round2 = round2Asscending.filter(r => r.game4 || r.game5 || r.game6);
            // console.log(round2);
        }




        const round3Slice = rounds.filter(r => r.no === 3)[0];
        if (round3Slice) {
            const round3Asscending = round3Slice.performances.sort(rankingRound3Ind);
            round3 = round3Asscending.filter(r => r.game7 || r.game8 || r.game9);
        }


        const round4Slice = rounds.filter(r => r.no === 4)[0];
        if (round4Slice) {
            const round4Asscending = round4Slice.performances.sort(rankingRound4Ind);
            round4 = round4Asscending.filter(r => r.game10 || r.game11 || r.game12);
        }


        const round5Slice = rounds.filter(r => r.no === 5)[0];
        if (round5Slice) {
            const round4Asscending = round5Slice.performances.sort(rankingRound4Ind);
            round5 = round4Asscending.filter(r => r.game10 || r.game11 || r.game12);
        }



        res.status(201).json({ msg: "rank performance and inatilize performance", allPerformances, round1, round2, round3, round4, round5 })

    } catch (error) {
        console.log(error);
    }
});













// ⛏️⛏️ RANDOM REASSIGN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 





// ⛏️⛏️ DELETE A ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.delete('/:eventID/:roundNum', async (req, res, next) => {
    try {
        const deleteRound = await Round.findOneAndDelete({ no: req.params.roundNum, event: req.params.eventID });
        // console.log(deleteRound);
        const deleteNets = await Net.deleteMany({ round: deleteRound._id });
        // console.log(req.params);
        res.status(200).json({ msg: 'Getting performance', deleteRound, deleteNets });
    } catch (error) {
        console.log(error);
    }
});







module.exports = router;


