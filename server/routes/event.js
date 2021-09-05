const express = require('express');
const Event = require('../models/Event');
const Net = require('../models/Net');
const Performance = require('../models/Performance');
const Round = require('../models/Round');


const { rankingRound, wholeRanking, rankingRoundNine, rankingRoundThirteen } = require('../utils/ranking');
const updatedPerformance = require('../utils/updatedPerformance');

const router = express.Router();
// arr[Math.floor(Math.random() * arr.length)];







// ⛏️⛏️ GET ALL EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  
router.get('/', async (req, res, next) => {
    try {
        const docs = await Event.find();
        // console.log("Get all events");
        // console.log(docs);
        res.status(200).json({ msg: 'Get All Events', events: docs });
    } catch (error) {
        res.json(error);
    }
});





// ⛏️⛏️ GET SINGLE EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  
router.get('/:id', async (req, res, next) => {
    try {
        const event = await Event.findById({ _id: req.params.id }).populate('participants').exec();
        // Story.find().populate({ path: 'fans', select: 'name' }).populate({ path: 'fans', select: 'email' });
        res.status(200).json({ msg: 'Get Single Events', events: event });
    } catch (error) {
        res.json(error);
    }
});











// ⛏️⛏️ ASSIGN PLAYER TO THE NET FOR THE FIRST ROUND - CREATE PERFORMANCE FOR ALL PLAYER  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/assign-initial-net/:eventID', async (req, res, next) => {
    try {
        // console.log("Hit");
        // console.log(req.params.eventID);
        // const findNets = "Nets";
        const findNets = await Net.find({ event: req.params.eventID });
        // console.log("True - l65", findNets);
        if (findNets.length < 1) {
            // RANDOMIZE PARTICIPANT 
            const event = await Event.findById({ _id: req.params.eventID }).populate('participants').exec();
            const participants = event.participants;
            let randomParticipant = [];
            while (randomParticipant.length < participants.length) {
                let random = participants[Math.floor(Math.random() * participants.length)];
                randomParticipant.push(random);
                randomParticipant = [...new Set(randomParticipant)];
            }




            // CREATING NET AND PERFORMANCE OF THE PLAYER 
            const allNetsIds = [];
            const allPerformanceIds = [];



            let i, j, temporary, chunk = 4, netNo = 1;
            for (i = 0, j = randomParticipant.length; i < j; i += chunk) {
                temporary = randomParticipant.slice(i, i + chunk);


                const newNet = new Net({
                    sl: netNo,
                    // performance: performanceIds,
                    event: event._id,
                });
                const net = await newNet.save();
                allNetsIds.push(net._id);


                for (let k of temporary) {
                    const newPerformance = new Performance({
                        participant: k._id,
                        event: event._id,
                        net: net._id,
                        round: 1
                    });
                    const performance = await newPerformance.save();
                    allPerformanceIds.push(performance._id);
                    const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { $push: { performance: performance._id } }, { new: true });
                }
                netNo++;
            }



            const new_round = new Round({
                no: 1,
                event: event._id,
                performances: allPerformanceIds,
                nets: allNetsIds
            });
            console.log(new_round);
            const round = await new_round.save();
            const updateNetRound = await Net.updateMany({ event: event._id }, { round: round._id }, { new: true });




            res.status(200).json({ msg: 'Assign to initial net randomly', round });
        } else {
            res.status(201).json({ msg: "Have already assigned nets", findNets });
        }

    } catch (error) {
        console.log(error);
    }

});



// get-net 
// ⛏️⛏️ GET PERFORMANCE AND NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.get('/get-single-round/:eventID/:round', async (req, res, next) => {
    try {
        const findRound = await Round.findOne({ event: req.params.eventID, no: req.params.round })
            .populate({
                path: "nets",
                select: "performance",
                populate: {
                    path: 'performance',
                    select: 'participant net game1 game2 game3 game4 game5 game6 game7 game8 game9 game10 game11 game12 game13 game14 game15',
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
        // console.log("findRound.left");
        // console.log(findRound.left);
        // 0|spikebal |     at /home/telex/spikeball/server/routes/event.js:174:74
        // 0|spikebal |     at runMicrotasks (<anonymous>)
        // 0|spikebal |     at processTicksAndRejections (internal/process/task_queues.js:95:5)
        // 0|spikebal | TypeError: Cannot read property 'left' of null
        // 0|spikebal |     at /home/telex/spikeball/server/routes/event.js:174:74
        // 0|spikebal |     at runMicrotasks (<anonymous>)
        // 0|spikebal |     at processTicksAndRejections (internal/process/task_queues.js:95:5)
        // 0|spikebal | TypeError: Cannot read property 'left' of null
        // 0|spikebal |     at /home/telex/spikeball/server/routes/event.js:174:74
        // 0|spikebal |     at runMicrotasks (<anonymous>)
        // 0|spikebal |     at processTicksAndRejections (internal/process/task_queues.js:95:5)
        
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






/*
// ⛏️⛏️ GET PERFORMANCE AND NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.get('/get-net/:eventID/:round', async (req, res, next) => {
    try {
        // const findNets = await Net.find({ event: req.params.eventID }).populate([{ path: "performance", select: "participant net round", populate: { path: 'participant', select: 'firstname lastname' } }]).exec();

        const findNets = await Net.find({ event: req.params.eventID, round: req.params.round })
            .populate([{
                path: "performance",
                select: "participant net game1 game2 game3 game4 game5 game6 game7 game8 game9 game10 game11 game12 game13 game14 game15",
                populate: {
                    path: 'participant',
                    select: 'firstname lastname'
                }
            }])
            .exec();
        res.status(200).json({ msg: 'Getting performance', findNets });
    } catch (error) {
        console.log(error);
    }
});
*/



// ⛏️⛏️ GET PERFORMANCE AND NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.delete('/delete-round/:eventID/:roundNum', async (req, res, next) => {
    try {
        const deleteRound = await Round.findOneAndDelete({ no: req.params.roundNum, event: req.params.eventID });
        console.log(deleteRound);
        const deleteNets = await Net.deleteMany({ round: deleteRound._id });
        // console.log(req.params);
        res.status(200).json({ msg: 'Getting performance', deleteRound, deleteNets });
    } catch (error) {
        console.log(error);
    }
});






// ⛏️⛏️ UPDATE PERFORMANCE AND ROUND (Round 1 - 4) ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.put('/update-performance/:eventID/:round', (req, res, next) => {
    // FIND THE NET AND PERFORMANCE AND UPDATE PERFORMANCE
    // const nets = await Net.findOne({ _id: req.params.netID }).populate({ path: "performance", populate: { path: "participant" } });
    // const net = await Net.findOne({ _id: req.params.netID }, {$pull: {performance: ["6120ccc897bd511d81fe9908"]}});
    // console.log("Round - ",req.params.round);

    const performanceUpdate = req.body;
    // console.log("Updated performance", performanceUpdate);
    performanceUpdate.forEach((pu, i) => {
        // console.log(pu);
        // console.log(updatedPerformance(pu, req.params.round));
        Performance.findByIdAndUpdate(pu.performanceID, updatedPerformance(pu, req.params.round), (err, docs) => {
            // console.log(pu);
            if (err) throw err;
            // console.log("Found - ", docs);
        });
    });
    // UPDATE EXISTING PERFORMANCE
    res.status(200).json({ msg: 'Get net and participant' });
});












// ⛏️⛏️ ASSIGN PLAYER TO THE NET FOR ROUND ROUND 9 - CREATE CREATE MORE NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/assign-nineth-net/:eventID/:round', async (req, res, next) => {
    try {
        const findPerformance = await Performance.find({ event: req.params.eventID });
        // console.log(findPerformance);
        const ranking = findPerformance.sort(rankingRoundNine);

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

        res.status(201).json({ msg: "rank performance and inatilize performance", ranking, net })

    } catch (error) {
        console.log(error);
    }

});





// ⛏️⛏️ ASSIGN PLAYER TO THE NET FOR ROUND ROUND 9 - CREATE CREATE MORE NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/assign-thirteen-net/:eventID/:round', async (req, res, next) => {
    try {
        const findPerformance = await Performance.find({ event: req.params.eventID });
        // console.log(findPerformance);
        const ranking = findPerformance.sort(rankingRoundThirteen);

        // CREATE NETS 
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

        res.status(201).json({ msg: "rank performance and inatilize performance", ranking, net })

    } catch (error) {
        console.log(error);
    }

});










// ⛏️⛏️ GET ALL PERFORMANCES OF ALL NETS OF A SINGLE EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.get('/get-performance/:eventID', async (req, res, next) => {
    // console.log("Get performance");
    const performances = await Performance.find({ event: req.params.eventID }).populate({ path: "participant", select: "firstname lastname" }).exec();
    const rankingPerformance = performances.sort(wholeRanking)
    // console.log(performances.length);
    res.status(200).json({ msg: 'Get all performance of an event', rankingPerformance });
});

















module.exports = router;