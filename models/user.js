const {Schema, model} = require('mongoose');

module.exports.User = model('User', Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    }
}, {timestamps: true}));