const express = require('express');
const multer = require('multer');
const Customer = require('../models/customer');

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

router.post('', multer({ storage: storage }).single('vehicleImage'),
(req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const customer = new Customer({
        id: req.body.id,
        customerId: req.body.customerId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        
    });
    customer.save().then(newCustomer => {
        res.status(201).json({
            message: 'Customer created successfully',
            customer: {
                ...newCustomer,
                id: newCustomer._id,
            }
        });
    });
});

//DELETE method for Customer dialog/ Records, node.js code-->may not need this OPTIONS above
router.delete('/:id', function(req, res, next) {
    console.log('Deleting a Customer');
    Customer.findByIdAndRemove(req.params.id, req.body, function(err, deletedCustomer){
        if(err){
            res.send("Error deleting customer");
        } else{
            res.json(deletedCustomer);
        }
    });
});

// EDIT function on Customer Edit dialog
router.put('/:id', multer({ storage: storage }).single('vehicleImage'),
(req,res,next) => {
    let vehicleImage = req.body.vehicleImage;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        vehicleImage = url + '/customerVehicleImages/' + req.file.filename;
    }
    const customer = new Customer({
        _id: req.body.id,
        customerId: req.body.customerId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
    });
    Customer.updateOne({_id: req.params.id}, customer).then(result => {
        res.status(200).json({message: 'Update success!'})
    });
})

//For EDIT helper function
router.get('/:id', (req, res, next) => {
    Customer.findById(req.params).then(customer => {
        if(customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({message: 'Customer not found!'});
        }
    });
});


router.get('', (req, res, next) => {
    const customerQuery = Customer.find();
    customerQuery.then(documents => {
        res.status(200).json({
            message: 'Customers fetched successfully',
            customers: documents,
        });
    });
});

module.exports = router;