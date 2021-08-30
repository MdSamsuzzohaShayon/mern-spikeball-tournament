const express = require('express');
const Event = require('../models/Event');
const Net = require('../models/Net');
const Performance = require('../models/Performance');
const { compareRanking } = require('../utils/helpers');
const updatedPerformance = require('../utils/updatedPerformance');

const router = express.Router();
// arr[Math.floor(Math.random() * arr.length)];







// ⛏️⛏️ GET ALL EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  
router.get('/', async (req, res, next) => {
    try {
        const docs = await Event.find();
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
        console.log(req.params.eventID);
        // const findNets = "Nets";
        const findNets = await Net.find({ event: req.params.eventID });
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
            let net;
            let i, j, temporary, chunk = 4, netNo = 1;
            for (i = 0, j = randomParticipant.length; i < j; i += chunk) {
                temporary = randomParticipant.slice(i, i + chunk);


                const newNet = new Net({
                    sl: netNo,
                    // performance: performanceIds,
                    event: event._id,
                    round: 1
                });
                net = await newNet.save();


                for (let k of temporary) {
                    const newPerformance = new Performance({
                        participant: k._id,
                        event: event._id,
                        net: net._id,
                        round: 1
                    });
                    const performance = await newPerformance.save();
                    const updateNet = await Net.findByIdAndUpdate({ _id: net._id }, { $push: { performance: performance._id } }, { new: true });
                }



                netNo++;
            }


            res.status(200).json({ msg: 'Assign to initial net randomly', net });
        } else {
            res.status(201).json({ msg: "Have already assigned nets", findNets });
        }

    } catch (error) {
        console.log(error);
    }

});










// ⛏️⛏️ GET PERFORMANCE AND NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.get('/get-net/:eventID/:round', async (req, res, next) => {
    try {
        // const findNets = await Net.find({ event: req.params.eventID }).populate([{ path: "performance", select: "participant net round", populate: { path: 'participant', select: 'firstname lastname' } }]).exec();

        const findNets = await Net.find({ event: req.params.eventID, round: req.params.round })
            .populate([{
                path: "performance",
                select: "participant net round1 round2 round3 round4 round5 round6 round7 round8 round9 round10 round11 round12 round13 round14 round15",
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



// ⛏️⛏️ GET PERFORMANCE AND NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.delete('/delete-net/:eventID/:round', async (req, res, next) => {
    try {
        // const deleteNets = await Net.deleteMany({ event: req.params.eventID, round: req.params.round });
        const deleteNet =await Net.deleteMany({ event: req.params.eventID, round: req.params.round })
        res.status(200).json({ msg: 'Getting performance', deleteNet });
    } catch (error) {
        console.log(error);
    }
});






// ⛏️⛏️ UPDATE PERFORMANCE AND ROUND (Round 1 - 4) ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.put('/update-one-to-four/:eventID/:round', (req, res, next) => {
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




// // ⛏️⛏️ UPDATE PERFORMANCE AND ROUND (Round 1 - 4) ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
// router.put('/update-one-to-four/:netID', async (req, res, next) => {
//     // FIND THE NET AND PERFORMANCE AND UPDATE PERFORMANCE
//     const net = await Net.findOne({ _id: req.params.netID }).populate({ path: "performance", populate: { path: "participant" } });
//     // const net = await Net.findOne({ _id: req.params.netID }, {$pull: {performance: ["6120ccc897bd511d81fe9908"]}});
//     // UPDATE EXISTING PERFORMANCE
//     res.status(200).json({ msg: 'Get net and participant', net });
// });






// ⛏️⛏️ ASSIGN PLAYER TO THE NET FOR ROUND ROUND 5 - CREATE CREATE MORE NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/assign-fifth-net/:eventID/:round', async (req, res, next) => {
    try {
        const findPerformance = await Performance.find({ event: req.params.eventID });
        // console.log(findPerformance);
        const ranking = findPerformance.sort(compareRanking);

        // CREATE NETS 
        console.log(ranking);
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























module.exports = router;