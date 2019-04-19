let mongoose = require('mongoose');

// User Schema
let userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    canvasIcsURL: {
        type: String,
        required: false
    },
})

let User = module.exports = mongoose.model('User', userSchema);