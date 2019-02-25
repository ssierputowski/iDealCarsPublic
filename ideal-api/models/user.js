const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    jobRole: { type: String, required: true },
    image: { type: String, required: false },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);