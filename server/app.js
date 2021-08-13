require('dotenv').config({ path: 'config/.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


const indexRoute = require('./routes/index');
const adminRoute = require('./routes/admin');

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0ss9r.mongodb.net/Spikeball-Events?retryWrites=true&w=majority`;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) throw err;
    console.log("Db is connected successfully ");
});



app.use(cors({ origin: process.env.HOSTNAME }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', indexRoute);
app.use('/api/admin', adminRoute);


const PORT = process.env.PORT;

app.listen(PORT, () => console.log('Server is running on: ' + PORT));