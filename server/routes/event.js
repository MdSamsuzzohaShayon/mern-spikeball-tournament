const express = require('express');
const { check, validationResult } = require('express-validator');

const Event = require('../models/Event');
const Net = require('../models/Net');
const Performance = require('../models/Performance');
const Round = require('../models/Round');
const Participant = require('../models/Participant');


const { ensureAuth, ensureGuast } = require('../config/auth');
const { rankingRound, wholeRanking, rankingRoundNine, rankingRoundThirteen } = require('../utils/ranking');

const router = express.Router();
// arr[Math.floor(Math.random() * arr.length)];





/* ⛏️⛏️ CREATE AN EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.post('/', ensureAuth,
    check('title', "Title must not empty and a valid email").notEmpty(),
    (req, res, next) => {
        const valErrs = validationResult(req);
        if (!valErrs.isEmpty()) {
            return res.status(400).json({ errors: valErrs.errors });
        } else {
            // console.log(req.body);
            Event.create({
                title: req.body.title,
                date: req.body.date,
            }, (err, docs) => {
                res.status(200).json({ request: 'Success', event: docs });
                // console.log(docs);
            });
        }
    });







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




/* ⛏️⛏️ DELETE AN EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.delete('/:id', ensureAuth, async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete({ _id: req.params.id });
        const participant = await Participant.deleteMany({ _id: { $in: event.participants } });
        // console.log("Deleted participant - ", participant);
        const performance = await Performance.deleteMany({ event: req.params.id });
        const net = await Net.deleteMany({ event: req.params.id });
        const round = await Round.deleteMany({ event: req.params.id });
        res.status(200).json({ msg: 'Event deleted', event, participant, performance, net });
    } catch (error) {
        console.log(error)
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
















/*
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

*/

























module.exports = router;