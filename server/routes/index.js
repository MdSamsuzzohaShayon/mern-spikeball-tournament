const express = require('express');
const router = express.Router();



router.get('/home', (req, res, next) => {
    res.status(200).json({ "Msg": "success" });
});


router.post('/home/add', (req, res, next) => {
    console.log(req.body);
    res.status(200).json({ request: 'Success' });
});



module.exports = router;