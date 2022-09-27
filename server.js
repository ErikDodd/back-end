'use strict';
// This will be our server


// Set Up
// -------------

require('dotenv').config();
// Express Server
const express = require('express');
// Allows for Cross Origin Resource Sharing
const cors = require('cors');
// load data
const data = require('./data/data.json');
// start our server
const app = express();

// Middleware
// The app.use() function is used to mount the specified middleware functions(s) at the path which is being specified 
app.use(cors());

// Declare our PORT Variable
const PORT = process.env.PORT || 3001;

// Listening for Connection
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

// Declare Endpoints
// -----------------

app.get('/', (req, res) => {
    res.send('Hello from the home route!');
});

app.get('/supplies', (req, res) => {
    res.send(data.lists[1].items);
});

app.get('/food', (req, res) => {
    res.send(data.lists[1].items);
});

// Catch all endpoint:

app.get('*', (req, res) => {
    res.status(404).send('Page Not Found');
});

