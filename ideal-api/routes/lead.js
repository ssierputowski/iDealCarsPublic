const express = require('express');

const Lead = require('../models/lead');

const router = express.Router();

router.post('', (req, res, next) => {
    console.log(req.body);
    const lead = new Lead ({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        comment: req.body.comment,
        car: req.body.car,
        employee: req.body.employee,
        id: req.body.id
    });
    lead.save().then(newlead => {
        res.status(201).json({
            message: 'Lead created successfully',
            lead: {
                ...newLead,
                id: newLead._id,
            }
        });
    });
});

router.get('', (req,res,next) => {
    const leadQuery = Lead.find();
    leadQuery.then(documents => {
        res.status(200).json({
            message: 'Lead fetched successfully',
            leads: documents
        });
    });
});

module.exports = router;