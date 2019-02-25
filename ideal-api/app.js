const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const customerRoutes = require('./routes/customer');

const app = express();

<<<<<<< HEAD
mongoose.connect('mongodb+srv://jmathis:' + process.env.MONGO_ATLAS_PW + '@ideal-cars-szrks.mongodb.net/test', { useNewUrlParser: true })
=======
/**'mongodb+srv://EWD:zipGEoVPTIRJvIEh@cluster0-tcbpt.mongodb.net/node-angular?retryWrites=true' */

/**'mongodb+srv://jmathis:' + process.env.MONGO_ATLAS_PW + '@ideal-cars-szrks.mongodb.net/test' */

mongoose.connect('mongodb+srv://jmathis:' + process.env.MONGO_ATLAS_PW + '@ideal-cars-szrks.mongodb.net/test')
>>>>>>> 254234dc2bfd279d77a67ba20829a0014f0c9484
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

