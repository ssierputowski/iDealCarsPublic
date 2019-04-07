const express = require('express'); 
const multer = require('multer');

const CustomerServiceRecord = require('../models/customerServiceRecord');
const router = express.Router();
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

// Disk-file storage code for storing on the app vehicleImages file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, 'customerVehicleImages');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});
router.post('',  multer({ storage: storage }).single('vehicleImage'),
(req, res, next) => {
    console.log(req.body);
    const url = req.protocol + '://' + req.get('host');
    const customerServiceRecord = new CustomerServiceRecord({
        id: req.body.id,
        customerId: req.body.customerId,
        vehicleId: req.body.vehicleId,
        mileage: req.body.mileage,
        servicePerformed: req.body.servicePerformed,
        serviceDate: req.body.serviceDate,
        dateReturned: req.body.dateReturned,
        mechanic: req.body.mechanic,
        serviceNotes: req.body.serviceNotes,
        servicePrice: req.body.servicePrice,
        paymentReceived: req.body.paymentReceived
    });
    customerServiceRecord.save().then(newCustomerServiceRecord => {
        res.status(201).json({
            message: 'CustomerServiceRecord created successfully',
            customerServiceRecord: {
                ...newCustomerServiceRecord,
                id: newCustomerServiceRecord._id,
            }
        });
    });
});

//DELETE method for Customer dialog/ Records, node.js code-->may not need this OPTIONS above
router.delete('/:id', function(req, res, next) {
    console.log('Deleting a CustomerServiceRecord');
    CustomerServiceRecord.findByIdAndRemove(req.params.id, req.body, function(err, deletedCustomerServiceRecord){
        if(err){
            res.send("Error deleting customerServiceRecord");
        } else{
            res.json(deletedCustomerServiceRecord);
        }
    });
});

// EDIT function on Customer Edit dialog
router.put('/:id', multer({ storage: storage }).single('vehicleImage'),
(req,res,next) => {
    let vehicleImage = req.body.vehicleImage;
    console.log(req.file);
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        vehicleImage = url + '/customerVehicleImages/' + req.file.filename;
    }
    const customerServiceRecord = new CustomerServiceRecord({
        _id: req.body.id,
        customerId: req.body.customerId,
        vehicleId: req.body.vehicleId,
        mileage: req.body.mileage,
        servicePerformed: req.body.servicePerformed,
        serviceDate: req.body.serviceDate,
        dateReturned: req.body.dateReturned,
        mechanic: req.body.mechanic,
        serviceNotes: req.body.serviceNotes,
        servicePrice: req.body.servicePrice,
        paymentReceived: req.body.paymentReceived
    });
    CustomerServiceRecord.updateOne({_id: req.params.id}, customerServiceRecord).then(result => {
        console.log(result);
        res.status(200).json({message: 'Update success!'})
    });
})

/* //For EDIT helper function
router.get('/:id', (req, res, next) => {
    CustomerServiceRecord.findById(req.params).then(customerServiceRecord => {
        if(customerServiceRecord) {
            res.status(200).json(customerServiceRecord);
        } else {
            res.status(404).json({message: 'CustomerServiceRecord not found!'});
        }
    });
});
 */
// find by vehicleId helper===>changed here from vehicleId
router.get('/:customerId', (req, res, next) => {
    const customerServiceRecordQuery = CustomerServiceRecord.find({customerId: req.params.customerId});
    customerServiceRecordQuery.then(documents => {
        res.status(200).json({
            message: 'Customer Vehicle Record fetched successfully',
            customerServiceRecords: documents,
        });
    });console.log(res);
});

/* router.get('', (req, res, next) => {
    const customerServiceRecordQuery = CustomerServiceRecord.find();
    customerServiceRecordQuery.then(documents => {
        res.status(200).json({
            message: 'CustomersServiceRecord fetched successfully',
            customerServiceRecords: documents,
        });
    });
}); */

module.exports = router;