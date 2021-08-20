const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roundSchema = new Schema({
    roundNo: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('round', roundSchema);