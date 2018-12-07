const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Customer = require('./models/customer');

// I am making a conflict

// This file is the server logic for the app

const userRoutes = require('./routes/user');
const customerRoutes = require('./routes/customer');

const app = express();

mongoose.connect('mongodb://jmathis:ePA0FmXpjtnlzcji@ideal-cars-shard-00-00-szrks.mongodb.net:27017,ideal-cars-shard-00-01-szrks.mongodb.net:27017,ideal-cars-shard-00-02-szrks.mongodb.net:27017/test?ssl=true&replicaSet=ideal-cars-shard-0&authSource=admin&retryWrites=true', { useMongoClient: true })
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

module.exports = app;

