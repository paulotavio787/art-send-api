const mongoose = require("mongoose");

const EmailSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Emails", EmailSchema)