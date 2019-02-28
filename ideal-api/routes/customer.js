const express = require('express');

const Customer = require('../models/customer');

const router = express.Router();

router.post('', (req, res, next) => {
    console.log(req.body);
    const customer = new Customer({
        fname: req.body.fname,
        lname: req.body.lname,
        carYear: req.body.carYear,
        carMake: req.body.carMake,
        carModel: req.body.carModel,
        telephone: req.body.telephone,
        email: req.body.email
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