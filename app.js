const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

mongoose.connect('mongodb://localhost/ebayPuzzle');
const db = mongoose.connection;
db.on('error', () => console.log("connection error"));

app.use(session({
    secret: 'ebay',
    resave: true,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/client'));

const routes = require('./routes/router');
app.use('/', routes);

app.use((req, res, next) => {
    let error = new Error('Page Not Found');
    error.status = 404;
    next(error);
} );

app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        error: err
    });
});

app.listen(3000, () => console.log('listening in port 3000'));
