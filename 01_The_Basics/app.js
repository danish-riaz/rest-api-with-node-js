const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


app.use(userRoutes);


app.listen(5001, () => {
    console.log('Server Running at port 5001');
})