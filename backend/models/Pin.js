const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max:25,
    },
    title: {
        type: String,
        required: true,
        min: 6,
        max:50,
    },
    desc: {
        type: String,
        required: true,
        min: 6,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max:5,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Pin', PinSchema);