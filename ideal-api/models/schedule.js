const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const scheduleSchema = mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    schedule: {
        weekOf: { type: String, required: true },
        sunday: {
            timeIn: { type: String, required: true },
            timeOut: { type: String, required: true },
            recordedIn: { type: String },
            recordedOut: { type: String }
        },
        monday: {
            timeIn: { type: String, required: true },
            timeOut: { type: String, required: true },
            recordedIn: { type: String },
            recordedOut: { type: String }
        },
        tuesday: {
            timeIn: { type: String, required: true },
            timeOut: { type: String, required: true },
            recordedIn: { type: String },
            recordedOut: { type: String }
        },
        wednesday: {
            timeIn: { type: String, required: true },
            timeOut: { type: String, required: true },
            recordedIn: { type: String },
            recordedOut: { type: String }
        },
        thursday: {
            timeIn: { type: String, required: true },
            timeOut: { type: String, required: true },
            recordedIn: { type: String },
            recordedOut: { type: String }
        },
        friday: {
            timeIn: { type: String, required: true },
            timeOut: { type: String, required: true },
            recordedIn: { type: String },
            recordedOut: { type: String }
        },
        saturday: {
            timeIn: { type: String, required: true },
            timeOut: { type: String, required: true },
            recordedIn: { type: String },
            recordedOut: { type: String }
        },
    }
});

scheduleSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Schedule', scheduleSchema);