const path = require('path');
require('dotenv').config({path: 'config/.env'});

const express = require('express');
const app = express();
const cors = require('cors');
const indexRoute = require('./routes/index');


app.use(cors({origin: process.env.HOSTNAME}));


app.use('/api', indexRoute);


const PORT = process.env.PORT;

app.listen(PORT, () => console.log('Server is running on: ' + PORT));