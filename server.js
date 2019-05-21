/** Express stuff.  **/
const express = require('express')

/** Database stuff. **/
const sqlite3 = require("sqlite3").verbose();
const dbFileName = "Flashcards.db";
const db = new sqlite3.Database(dbFileName);
const userID = 1;
const insertCmd = "INSERT into Flashcards\
	(user, english, spanish, seen, correct) VALUES (1, @0, @1, 0, 0)"

function dumpDB() {
		db.all ( 'SELECT * FROM Flashcards', dataCallback);
		function dataCallback( err, data ) {console.log(data)}
	}	

//**  Google Tranlsate API stuff. **//
const APIrequest = require('request');

/** Lets go on the deep dark web yo. **/
const http = require('http');

/** Me data! **/
const port = 55562
const APIkey = "AIzaSyCjBxZ4uZsoN7kjmYFn6sGLwEmBmzmEsiU";

/** Metadata. **/
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey
let requestObject = 
{
	"source": "en",
	"target": "es",
	"q": [
		   "Hello world!"
	]
}

function translateClosure (res, translate, next) {
	console.log("translate closure");
	let APIcallback = function(err, APIresHead, APIresBody) {
		if ((err) || (APIresHead.statusCode != 200)) {
			// API is not working
			console.log("Got API error");
			console.log(APIresBody);
		} else {
			if (APIresHead.error) {
				// API worked but is not giving you data
				console.log(APIresHead.error);
			} else {
				res.json = {
          				"english" : translate.q[0],
          				"spanish" : APIresBody.data.translations[0].translatedText
					};
				console.log(res.json);
				res.send(JSON.stringify(res.json));
				next();
			}
		}
	}
	APIrequest(
	{
		url: url,
		method: "POST",
		headers: {"content-type": "application/json"},
		json: translate
	}, APIcallback);
}

function translateHandler(req, res, next)
{
	console.log("Translate handler.");
	let userQuery = req.query;
	if(userQuery.english != undefined)
	{
		let translate =
		{
			"source": "en",
			"target": "es",
			"q": [
				userQuery.english
			]
		}
		console.log("Want to translate: ", translate);
		translateClosure(res, translate, next);
	}
}

function storeHandler(req, res, next)
{
	console.log("Store handler");
	let card = req.query;
	if(card.english != undefined && card.spanish != undefined && card.english != "" && card.spanish != "Spanish") {
		console.log("Recieved:\n", card);
		let storeClosure = function(err) { storeCallback(err, res); next(); }
		db.run(insertCmd, card.english, card.spanish, storeClosure);
	} else {
		console.log("Error- recieved bad input.\n", card);
	}
}

function storeCallback(err, res) {
	if(err) {
		console.log("Error- ", err);
		res.json({"insert": "failed"});
	} else {
		console.log("Insert success");
		res.json({"insert": "success"});
		dumpDB();
	}
}

function fileNotFound(req, res)
{
	console.log("File not found");
	let url = req.url;
	res.type('text/plain');
	res.status(404);
	res.send('Cannot find ' + url);
	return;
}

const app = express()
app.use(express.static('public'));
app.get('/translate', translateHandler);
app.get('/store', storeHandler);
app.use(fileNotFound);

app.listen(port, function() { console.log('Listening..'); } );
