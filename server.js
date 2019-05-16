const express = require('express')
const port = 55562

//**  Google Tranlsate API stuff. **//
const APIrequest = require('request');
const http = require('http');

const APIkey = "AIzaSyCjBxZ4uZsoN7kjmYFn6sGLwEmBmzmEsiU";
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey

let requestObject = 
{
	"source": "en",
	"target": "es",
	"q": [
		   "Hello world!"
	]
}

function callbackClosure (res, translate, next) {
	function APIcallback (err, APIresHead, APIresBody) {
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
          				"English" : requestObject.q[0],
          				"Spanish" : APIresBody.data.translations[0].translatedText
					};
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
		// console.log("Want to translate: ", translate.q[0]);
		callbackClosure(res, translate, next);
	}
}

function fileNotFound(req, res)
{
	let url = req.url;
	res.type('text/plain');
	res.status(404);
	res.send('Cannot find ' + url);
	return;
}

const app = express()
app.use(express.static('public'));
app.get('/translate', translateHandler);
// app.post('/translate', translateHandler);
app.use(fileNotFound);

app.listen(port, function() { console.log('Listening..'); } );
