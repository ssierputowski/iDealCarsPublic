const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerServiceRecordSchema = mongoose.Schema({
        customerId: { type: String, required: true },
        vehicleId: { type: String, required: true },
        mileage: { type: String, required: true },
        servicePerformed: { type: String, required: true },
        serviceDate: { type: String, required: true },
        dateReturned: { type: String, required: true },
        mechanic: { type: String, required: true },
        serviceNotes: { type: String, required: false },
        servicePrice: { type: String, required: true },
        paymentReceived: { type: String, required: true }
    
});
customerServiceRecordSchema.plugin(uniqueValidator);
module.exports = mongoose.model('CustomerServiceRecord', customerServiceRecordSchema);