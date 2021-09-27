const express = require('express');
const formidable = require('formidable');
const csv = require('csvtojson');


const Event = require('../models/Event');
const Participant = require('../models/Participant');
const Performance = require('../models/Performance');


const { check, validationResult } = require('express-validator');
const { wholeRanking } = require('../utils/ranking');
const updatedPerformance = require('../utils/updatedPerformance');
const { replaceKeys } = require('../utils/helpers');


const router = express.Router();






router.get('/:eventID', async (req, res, next) => {
    const allPerformance = await Performance.find({ event: req.params.eventID }).populate({ path: "participant", select: "firstname lastname" });
    res.status(200).json({ performances: allPerformance });
});




/* ⛏️⛏️ CREATE PARTICIPANT OR PERFORMANCE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.post('/:eventID',
    check('firstname', "Firstname must not empty").notEmpty(),
    check('lastname', "Lastname must not empty").notEmpty(),
    check('city', "City must not empty").notEmpty(),
    async (req, res, next) => {
        const valErrs = validationResult(req);

        // console.log(req.body);
        if (!valErrs.isEmpty()) {
            console.log(valErrs);
            return res.status(400).json({ errors: valErrs.errors });
        } else {
            try {

                const { firstname, lastname, email, cell, birthdate, city, payment_amount, payment_method } = req.body;
                const new_participant = new Participant({
                    firstname,
                    lastname,
                    email,
                    cell,
                    birthdate,
                    city,
                    payment_amount,
                    payment_method,
                    event: req.params.eventID
                });
                const participant = await new_participant.save();
                const event = await Event.findByIdAndUpdate({ _id: req.params.eventID }, { $push: { participants: participant._id } }, { new: true });
                const new_performance = new Performance({
                    participant: participant._id,
                    event: req.params.eventID
                });

                const performance = await new_performance.save();

                res.status(200).json({ msg: 'Create partipipant and referancing to event', participant, performance });
            } catch (error) {
                res.json(error);
            }
        }
    });















/* ⛏️⛏️ CREATE MULTIPLE PARTICIPANT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.post('/multiple/:eventID', (req, res, next) => {


    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }


        csv()
            .fromFile(files.file.path)
            .then((jsonObj) => {
                // const exampleObj = {
                //     'First Name': 'Kaitlin',
                //     'Last Name': 'Ro',
                //     Email: 'kaitlinro1@gmail.com',
                //     'Mobile Number': '+12089714339',
                //     Gender: 'Female',
                //     Birthdate: '02/15/1995',
                //     'Total Amount': '12.0',
                //     'Outstanding Balance': '0.0',
                //     Status: 'Spot Reserved',
                //     Payment: 'Paid',
                //     City: 'Rexburg',
                // }


                // // console.log("JSON OBJECT");
                // console.log("JSON OBJECT - ", jsonObj);


                const errors = [];
                const allParticipant = [];
                let msg = null;
                for (let obj of jsonObj) {
                    const newParticipant = replaceKeys(obj, req.params.eventID);
                    if (newParticipant.firstname && newParticipant.lastname && newParticipant.city) {
                        allParticipant.push(newParticipant);
                    } else {
                        msg = "Some participant doesn't has firstname, lastname or city those are not included"
                        // errors.push({ errType: "missing_fields", msg: "Some participant doesn't has firstname, lastname or city those are not included" });
                    }
                }
                if (msg) errors.push({ msg });

                // console.log("All Participant - ", allParticipant);



                if (errors.length > 0) {
                    // console.log("No errors");
                    Participant.insertMany(allParticipant).then(function (participant) {
                        // console.log(allParticipant);
                        // console.log("Has errors");
                        // console.log("Data inserted", participant);  // Success
                        const performanceList = [];
                        for (let per of participant) {
                            performanceList.push({ participant: per._id, event: req.params.eventID });
                        }
                        // console.log("insert many performance - ");
                        Performance.insertMany(performanceList).then(p => {
                            console.log("Inserted all performance - ", p);
                        });

                        participant.forEach((p, i) => {
                            // console.log(p._id);
                            Event.findByIdAndUpdate({ _id: req.params.eventID }, { $push: { participants: p._id } }, { new: true }).then((data) => {
                                // console.log(data);
                            }).catch(eventErr => {
                                console.log(eventErr);
                            });
                        });



                        res.json({ errors, eventID: req.params.eventID, files: participant });
                    }).catch(function (error) {
                        console.log(error)      // Failure
                    });
                } else {
                    // console.log("Has errors");
                    Participant.insertMany(allParticipant).then(function (participant) {
                        // console.log(participant);
                        const performanceList = [];
                        for (let per of participant) {
                            performanceList.push({ participant: per._id, event: req.params.eventID });
                        }
                        // console.log("insert many performance - ");
                        Performance.insertMany(performanceList).then(p => {
                            console.log("Inserted all performance - ", p);
                        });
                        // console.log("Data inserted", participant)  // Success
                        participant.forEach((p, i) => {
                            Event.findByIdAndUpdate({ _id: req.params.eventID }, { $push: { participants: p._id } }, { new: true }).then((data) => {
                                // console.log(data);
                            }).catch(eventErr => {
                                console.log(eventErr);
                            });
                        });

                        res.json({ msg: "All participant added successfully", eventID: req.params.eventID, files: participant });
                    }).catch(function (error) {
                        console.log(error)      // Failure
                    });
                }


                // Function call
            });

    });

    // const newParticipant = new Participant({
    //     name: name,
    //     address: address
    // });
    // const participant = await newParticipant.save();
    // const event = await Event.findByIdAndUpdate({ _id: eventID }, { $push: { participants: participant._id } }, { new: true });
    // res.status(200).json({ msg: 'Create partipipant and referancing to event', participant, event });
});





// ⛏️⛏️ UPDATE PERFORMANCE AND ROUND (Round 1 - 4) ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.put('/update-performance/:eventID/:round', (req, res, next) => {
    // console.log(req.body);
    const { updatePerformance, updateTeam } = req.body;
    const { round, event } = req.params;
    // console.log("--------------------------------------------------------------------------");
    // console.log("--------------------------------------------------------------------------");
    // console.log("--------------------------------------------------------------------------");
    // console.log("--------------------------------------------------------------------------");
    console.log(updatePerformance);
    // console.log(updateTeam);


    updateTeam.forEach((ut, i) => {
        let t1pd = ut.team1.score - ut.team2.score;
        let t2pd = ut.team2.score - ut.team1.score;


        // if(ut.game === 1){

        // }
        let t1p = 0, t2p = 0;
        if (t1pd > t2pd) {
            t1p = 1;
        } else if (t1pd < t2pd) {
            t2p = 1;
        }


        // SHOULD USE UPDATE MANY 
        // TEAM 1
        Performance.findByIdAndUpdate(ut.team1.player1, updatedPerformance(ut, round, ut.team1.score, t1p, t1pd, ut.netID), (err, docs) => { if (err) throw err });
        Performance.findByIdAndUpdate(ut.team1.player2, updatedPerformance(ut, round, ut.team1.score, t1p, t1pd, ut.netID), (err, docs) => { if (err) throw err });

        // TEAM 2
        Performance.findByIdAndUpdate(ut.team2.player1, updatedPerformance(ut, round, ut.team2.score, t2p, t2pd, ut.netID), (err, docs) => { if (err) throw err });
        Performance.findByIdAndUpdate(ut.team2.player2, updatedPerformance(ut, round, ut.team2.score, t2p, t2pd, ut.netID), (err, docs) => { if (err) throw err });
    });



    updatePerformance.forEach((pu, i) => {
        let point = 0, pointDeferential = 0, score = 0;
        if (pu.score > 0) {
            point = 1;
            pointDeferential = pu.score;
            score = pu.score;
        }
        Performance.findByIdAndUpdate(pu.pId, updatedPerformance(pu, round, score, point, pointDeferential, pu.netID), (err, docs) => { if (err) throw err });
    });



    /*
    performanceUpdate.forEach((pu, i) => {
        Performance.findOne({ _id: pu.performanceID })
            .then(doc => Performance.updateOne({ _id: doc._id }, updatedPerformance(pu, req.params.round, doc, pu.netID)))
            .then(result => console.log("Updated - ", result))
            .catch(err => console.log(err));
    });
    */

    // UPDATE EXISTING PERFORMANCE
    res.status(200).json({ msg: 'Get net and participant' });
});







// doc.subdocs.push({ _id: 4815162342 })
// doc.subdocs.pull({ _id: 4815162342 }) // removed
/* ⛏️⛏️ DELETE PARTICIPANT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.delete('/:id', async (req, res, next) => {
    try {
        const participant = await Participant.findByIdAndDelete(req.params.id);
        // console.log(participant);
        // console.log("DELETE parformance");
        const performance = await Performance.findOneAndDelete({ participant: req.params.id });
        // console.log(performance);
        // { $pull: { templates: { _id: templateid } } },
        const event = await Event.findOneAndUpdate({ participants: participant._id }, { $pull: { participants: participant._id } }, { new: true });
        res.status(200).json({ msg: 'Delete a participant', participant, performance, event });
    } catch (error) {
        res.json(error)
    }
});


/* ⛏️⛏️ UPDATE EVENTS OR ADD PARTICIPANTS TO AN EVENTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
/*
router.get('/dashboard/participant', async (req, res, next) => {
    try {
        const participant = await Participant.find();
        res.status(200).json({ participant });
    } catch (error) {
        res.json(error);
    }
});
*/







// ⛏️⛏️ GET ALL PERFORMANCES OF ALL NETS OF A SINGLE EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
router.get('/get-performance/:eventID/:roundNum', async (req, res, next) => {
    console.log(req.params.roundNum);
    // console.log("Get performance");
    const performances = await Performance.find({ event: req.params.eventID }).populate({ path: "participant", select: "firstname lastname" }).exec();
    const rankingPerformance = performances.sort(wholeRanking)
    // console.log(performances.length);
    res.status(200).json({ msg: 'Get all performance of an event', rankingPerformance });
});



module.exports = router;