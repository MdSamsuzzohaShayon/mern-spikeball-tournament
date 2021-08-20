// NET SHOULD HAVE A SERILIZE ID - 1, 2, 3, 4 


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// https://stackoverflow.com/questions/28357965/mongoose-auto-increment/68815559#68815559
const netSchema = new Schema({
    sl: {
        type: Number,
        required: true,

    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'participant'
        }
    ],
    event: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'event'
    },
    round: {
        type: Number,
        required: true
    }

});
module.exports = mongoose.model('net', netSchema);