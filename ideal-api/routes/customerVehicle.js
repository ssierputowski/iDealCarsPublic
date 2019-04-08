const express = require('express');
const multer = require('multer');

const CustomerVehicle = require('../models/customerVehicle');

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
// For SAVE vehicle for vehicle dialog-entry
router.post('', multer({ storage: storage }).single('vehicleImage'),
(req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const customerVehicle = new CustomerVehicle({
        id: req.body.id,
        customerId: req.body.customerId,
        vehicleId: req.body.vehicleId,
        vehicleYear: req.body.vehicleYear,
        vehicleMake: req.body.vehicleMake,
        vehicleModel: req.body.vehicleModel,
        vehicleColor: req.body.vehicleColor,
        vehicleDetails: req.body.vehicleDetails,
        vehiclePriceSold: req.body.vehiclePriceSold,
        vehicleImage: url + '/customerVehicleImages/' + req.file.filename
    });
    customerVehicle.save().then(newCustomerVehicle => {
        res.status(201).json({
            message: 'customerVehicle created successfully',
            customerVehicle: {
                ...newCustomerVehicle,
                id: newCustomerVehicle._id,
            }
        });
    });
});

//DELETE method for customerVehicle Inventory, node.js code-->may not need this OPTIONS above
router.delete('/:id', function(req, res, next) {
    console.log('Deleting a customerVehicle');
    CustomerVehicle.findByIdAndRemove(req.params.id, req.body, function(err, deletedCustomerVehicle){
        if(err){
            res.send("Error deleting vehicle");
        } else{
            res.json(deletedCustomerVehicle);
        }
    });
});

// EDIT function on dialogVin
router.put('/:id', multer({ storage: storage }).single('vehicleImage'),
(req,res,next) => {
    let vehicleImage = req.body.vehicleImage;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        vehicleImage = url + '/customerVehicleImages/' + req.file.filename;
    }
    const customerVehicle = new CustomerVehicle({
        _id: req.body.id,
        customerId: req.body.customerId,
        vehicleId: req.body.vehicleId,
        vehicleYear: req.body.vehicleYear,
        vehicleMake: req.body.vehicleMake,
        vehicleModel: req.body.vehicleModel,
        vehicleColor: req.body.vehicleColor,
        vehicleDetails: req.body.vehicleDetails,
        vehiclePriceSold: req.body.vehiclePriceSold,
        vehicleImage: vehicleImage
    });
    CustomerVehicle.updateOne({_id: req.params.id}, customerVehicle).then(result => {
        res.status(200).json({message: 'Update success!'})
    });

})
//For EDIT helper function
/* router.get('/:id', (req, res, next) => {
    CustomerVehicle.findById(req.params).then(customerVehicle => {
        if(customerVehicle) {
            res.status(200).json(customerVehicle);
        } else {
            res.status(404).json({message: 'customerVehicle not found!'});
        }
    });
}); */

router.get('/:customerId', (req, res, next) => { 
    const customerVehicleQuery = CustomerVehicle.find({customerId: req.params.customerId});
    customerVehicleQuery.then(documents => {
        res.status(200).json({
            message: 'customerVehicles fetched successfully',
            customerVehicles: documents,
        });
    });  
});

/* router.get('', (req, res, next) => {
    const customerVehicleQuery = CustomerVehicle.find();
    customerVehicleQuery.then(documents => {
        res.status(200).json({
            message: 'customerVehicles fetched successfully',
            customerVehicles: documents,
        });
    });console.log(res); 
}); */

module.exports = router;