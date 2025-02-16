const express = require('express');
const router = express.Router();



router.get('/home', (req, res, next) => {
    res.status(200).json({ "Msg": `Testing server on port: ${process.env.PORT}` });
});




module.exports = router;