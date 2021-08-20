const express = require('express');
const Event = require('../models/Event');
const Net = require('../models/Net');

const router = express.Router();
// arr[Math.floor(Math.random() * arr.length)];




// ⛏️⛏️ ASSIGN PLAYER TO THE NET FOR THE FIRST ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/assign-initial-net/:eventID', async (req, res, next) => {
    const event = await Event.findById({ _id: req.params.eventID }).populate('participants').exec();
    const participants = event.participants;
    let randomParticipant = [];
    // RANDOMIZE PARTICIPANT 
    while (randomParticipant.length < participants.length) {
        let random = participants[Math.floor(Math.random() * participants.length)];
        randomParticipant.push(random);
        randomParticipant = [...new Set(randomParticipant)];
    }


    let i, j, temporary, chunk = 4, netNo = 1;
    for (i = 0, j = randomParticipant.length; i < j; i += chunk) {
        temporary = randomParticipant.slice(i, i + chunk);
        const newNet = new Net({
            sl: netNo,
            participants: temporary,
            event: event._id,
            round: 1
        });
        const net = await newNet.save();
        netNo++;
    }


    res.status(200).json({ msg: 'Assign to initial net randomly', randomParticipant });
});





// ⛏️⛏️ CREATE ROUND ONE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 







module.exports = router;