// global variables
const port = // add port here
const query = require('./flickrQuery');

const express = require('express');
const request = require('request');

const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');
const sqlite = require('sqlite3');


const app = express();
app.use('/', printURL);
app.get('/*',express.static('public'));
app.get('/query', query.handler);
app.use( fileNotFound );
app.listen(port, function (){console.log('Listening on '+port+'...');} );


// Some middleware functions
// A middleware function either has to send back response or call next

// always calls next
function printURL (req, res, next) {
    console.log(req.url);
    next();
}

// never calls next
function fileNotFound(req, res) {
    let url = req.url;
    res.send('Cannot find '+url);
    }

