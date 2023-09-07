// ⛏️⛏️ ALL IMPORTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
require('dotenv').config({ path: 'config/.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


const indexRoute = require('./routes/index');
const adminRoute = require('./routes/admin');
const eventRoute = require('./routes/event');
const performanceRoute = require('./routes/performance');
const netRoute = require('./routes/net');
const roundRoute = require('./routes/round');





// ⛏️⛏️ MONGO DB DATABASE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
    if (err) throw err;
    console.log("Db is connected successfully ");
});






// ⛏️⛏️ MIDDLEWARE SETUP ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
app.use(cors({ origin: process.env.HOSTNAME, credentials: true }));
app.use(express.json());



// ⛏️⛏️ ROUTES ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
app.use('/api', indexRoute);
app.use('/api/admin', adminRoute);
app.use('/api/event', eventRoute);
app.use('/api/net', netRoute);
app.use('/api/performance', performanceRoute);
app.use('/api/round', roundRoute);




// ⛏️⛏️ SERVER ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));