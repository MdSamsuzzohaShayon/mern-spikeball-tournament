const express = require('express');
const Event = require('../models/Event');
const Net = require('../models/Net');
const Performance = require('../models/Performance');

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
    } catch (error) {
        console.log(error);
    }

});










// ⛏️⛏️ GET PERFORMANCE AND NET (Round 1 - 4) ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.get('/get-performance/:eventID', async (req, res, next) => {
    try {
        const findNets = await Net.find({ event: req.params.eventID }).populate([{ path: "performance", select: "participant net round", populate: { path: 'participant', select: 'firstname lastname' } }]).exec();
        // const findPerformance = await Performance.find({ event: req.params.eventID });
        res.status(200).json({ msg: 'Getting performance', findNets });
    } catch (error) {
        console.log(error);
    }
});




// ⛏️⛏️ UPDATE PERFORMANCE AND ROUND (Round 1 - 4) ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.put('/update-one-to-four/:netID', async (req, res, next) => {
    // FIND THE NET AND PERFORMANCE AND UPDATE PERFORMANCE
    const net = await Net.findOne({ _id: req.params.netID }).populate({ path: "performance", populate: { path: "participant" } });
    // const net = await Net.findOne({ _id: req.params.netID }, {$pull: {performance: ["6120ccc897bd511d81fe9908"]}});
    // UPDATE EXISTING PERFORMANCE
    res.status(200).json({ msg: 'Get net and participant', net });
});




// ⛏️⛏️ UPDATE PERFORMANCE AND ROUND (Round 1 - 4) ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.put('/update-one-to-four/:netID', async (req, res, next) => {
    // FIND THE NET AND PERFORMANCE AND UPDATE PERFORMANCE
    const net = await Net.findOne({ _id: req.params.netID }).populate({ path: "performance", populate: { path: "participant" } });
    // const net = await Net.findOne({ _id: req.params.netID }, {$pull: {performance: ["6120ccc897bd511d81fe9908"]}});
    // UPDATE EXISTING PERFORMANCE
    res.status(200).json({ msg: 'Get net and participant', net });
});











module.exports = router;