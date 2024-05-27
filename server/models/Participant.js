const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// First Name, Last Name, birthday (age) Phone # and city 
const participantSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: String,
    cell: String,
    birthdate: String,
    payment_amount: String,
    payment_method: String,
    city: String,
    event: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'event'
    }
});






module.exports = mongoose.model('participant', participantSchema);