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

function translateHandler(req, res, next)
{
	let qObj = req.query;
	let data = {"English": "", "Spanish": ""};
	res.json({});
	if(qObj.english != undefined)
	{
		var translate = requestObject;
		translate.q[0] = qObj.english;
		console.log("Want to translate: ", translate.q[0]);
		APIrequest(
		{ // HTTP header stuff
			url: url,
			method: "POST",
			headers: {"content-type": "application/json"},
			// will turn the given object into JSON
			json: translate},
			// callback function for API request
			// APIcallback
			function(err, APIresHead, APIresBody) {
				// gets three objects as input
				if ((err) || (APIresHead.statusCode != 200)) {
					// API is not working
					console.log("Got API error");
					console.log(APIresBody);
				} else {
					if (APIresHead.error) {
						// API worked but is not giving you data
						console.log(APIresHead.error);
					} else {
						data.English = qObj.english;
						data.Spanish = APIresBody.data.translations[0].translatedText;
						console.log(data);
						//res.json = data;
						//res.send(JSON.stringify(data));
						next();
					}
				}
			} // end callback function
		); // end APIRequest call
	}
	next();
}

/*
function APIcallback(err, APIresHead, APIresBody) {
	// gets three objects as input
	if ((err) || (APIresHead.statusCode != 200)) {
	    // API is not working
	    console.log("Got API error");
	    console.log(APIresBody);
	} else {
	    if (APIresHead.error) {
			// API worked but is not giving you data
			console.log(APIresHead.error);
	    } else {
			//console.log("In Spanish: ", 
		    //APIresBody.data.translations[0].translatedText);
			//console.log("\n\nJSON was:");
			//console.log(JSON.stringify(APIresBody, undefined, 2));
			// print it out as a string, nicely formatted
			//document.getElementById("answer").textContent = APIresBody.data.translations[0].translatedText;
			var data = {"English": "", "Spanish": ""};
			data.English = "";
			data.Spanish = APIresBody.data.translations[0].translatedText;
			console.log(data);
			return data;
	    }
	}
} // end callback function
*/

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
app.use(fileNotFound);

app.listen(port, function() { console.log('Listening..'); } );
