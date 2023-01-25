const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max:25,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max:50,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema);