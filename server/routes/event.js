/*


const express = require('express');
const router = express.Router();
// arr[Math.floor(Math.random() * arr.length)];

// ⛏️⛏️ ASSIGN PLAYER TO THE NET FOR THE FIRST ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.post('/assign-initial-net/:eventID', async (req, res, next) => {
    const event = await Event.findById({ _id: req.params.eventID }).populate('participants').exec();
    // const participant = event
    res.status(200).json({ msg: 'Get Single Events', events: event });
});





module.exports = router;


*/