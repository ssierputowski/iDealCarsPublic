const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

<<<<<<< HEAD
const Customer = require('./models/customer');

// I am making a conflict

// This file is the server logic for the app

=======
>>>>>>> dc19f9ea01afb9dee4620abb401baeed30323288
const userRoutes = require('./routes/user');
const customerRoutes = require('./routes/customer');
const vehicleRoutes = require('./routes/vehicle');
const partRoutes = require('./routes/part')

const app = express();

mongoose.connect('mongodb+srv://jmathis:' + process.env.MONGO_ATLAS_PW + '@ideal-cars-szrks.mongodb.net/test')
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const customer = new Customer();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/customers', customerRoutes);
app.use( '/api/vehicles', vehicleRoutes);
app.use( '/api/parts/', partRoutes);

module.exports = app;

