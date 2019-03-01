const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = mongoose.Schema({
    customerId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    /* vehicleInfo: {
        vehicleId: { type: String, required: true, unique: true },
        vehicleYear: { type: Number, required: true },
        vehicleMake: { type: String, required: true },
        vehicleModel: { type: String, required: true },
        vehicleColor: { type: String, required: true },
        vehicleDetails: { type: String, required: true },
        vehicleImage: { type: String }
    },
    */
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    /*serviceRecords: {
        servicePerformed: { type: String, required: true },
        serviceDate: { type: String, required: true },
        dateReturned: { type: String, required: true },
        mechanic: { type: String, required: true },
        serviceNotes: { type: [String], required: false },
        servicePrice: { type: Number, required: true },
        paymentReceived: { type: Boolean, required: true }
    }
    */
});

customerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Customer', customerSchema);