// https://mongoosejs.com/docs/subdocs.html
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    point: { type: Number, default: 0 },
    pointDeferential: { type: String, default: '0-0' },
});





scoreSchema.pre('validate', function (next) {
    console.log('Child - 2');
    next();
});

scoreSchema.pre('save', function (next) {
    console.log('child - 3');
    next();
});

const performanceSchema = new Schema({
    participant: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "participant"
    },
    event: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'event'
    },
    net: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'net'
    },
    round1: scoreSchema,
    round2: scoreSchema,
    round3: scoreSchema,
    round4: scoreSchema,
    round124Total: scoreSchema,
    round5: scoreSchema,
    round6: scoreSchema,
    round7: scoreSchema,
    round8: scoreSchema,
    round9: scoreSchema,
    round10: scoreSchema,
    round11: scoreSchema,
    round12: scoreSchema,
    round13: scoreSchema,
    round14: scoreSchema,
    round15: scoreSchema,
    // nested: {
    //     stuff: {
    //         type: String,
    //         lowercase: true,
    //         trim: true
    //     }
    // },
});

performanceSchema.pre('validate', function (next) {
    console.log('parent - 1');
    next();
});

performanceSchema.pre('save', function (next) {
    console.log('parent - 4');
    next();
});


module.exports = mongoose.model('performance', performanceSchema);