/** Express stuff.  **/
const express = require('express')

/** Database stuff. **/
const sqlite3 = require("sqlite3").verbose();
const userDb = new sqlite3.Database("Users.db");
const db = new sqlite3.Database("Flashcards.db");

function dumpDB() {
		db.all( 'SELECT * FROM Flashcards', function( err, data ) {console.log(data)});
}	

/** Last stage Google stuff. **/
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');
const googleLoginData = {
    clientID: "977848302161-13nkin8ultkmnsbc22i2jq2injtt3iof.apps.googleusercontent.com",
    clientSecret: "uruTmipOpYVztCxAErJMSpoZ",
    callbackURL: '/auth/redirect'
};

/**  Google Tranlsate API stuff. **/
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
          				english: translate.q[0],
          				spanish: APIresBody.data.translations[0].translatedText
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

function nameHandler(req, res, next)
{
	console.log("Getting username handler");
	res.json = {
		firstName: req.user.firstName,
		lastName:  req.user.lastName
	};
	res.send(JSON.stringify(res.json));
	next();
}

function storeHandler(req, res, next)
{
	console.log("Store handler");
	let card = req.query;
	if(card.english != undefined && card.spanish != undefined && card.english != "" && card.spanish != "Spanish") {
		console.log("Recieved:\n", card);
		let storeClosure = function(err) { storeCallback(err, res); next(); }
		const insertCmd = "INSERT into Flashcards\
		       (user, english, spanish, seen, correct)\
		VALUES (  @0,       @1,     @2,    0,       0)";
		db.run(insertCmd, req.user.userData, card.english, card.spanish, storeClosure);
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

function isAuthenticated(req, res, next) {
    if (req.user) {
	console.log("Req.session:",req.session);
	console.log("Req.user:",req.user);
	next();
    } else {
	res.redirect('/login.html');  // send response telling
	// Browser to go to login page
    }
}

// function called during login, the second time passport.authenticate
// is called (in /auth/redirect/),
// once we actually have the profile data from Google. 
function gotProfile(accessToken, refreshToken, profile, done) {
    let dbRowID = profile.id;  

	userDb.run("SELECT * from Users", function(err, data) {
		if(err) {
			console.log("init query error");
			console.log(err);
		}
		console.log("Database- ");
		console.log(data);

		console.log("user not in database");
		userDb.run("INSERT or replace into Users (FirstName, LastName, GoogleID) VALUES (@0, @1, @2)",
				profile.name.givenName, profile.name.familyName, dbRowID, function(err) {
			if(err) {
				console.log("insert err");
				console.log(err);
			} else {
				console.log("insert success");
				userDb.all("SELECT * from Users", function(err, Data) {
					if(err) {
						console.log("verification error")
						console.log(err)
					} else {
						console.log(Data);
					}
					done(null, dbRowID); 
				});
			}
		});
	});
}

// Part of Server's sesssion set-up.  
// The second operand of "done" becomes the input to deserializeUser
// on every subsequent HTTP request with this session's cookie. 
passport.serializeUser((dbRowID, done) => {
    console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});

// Called by passport.session pipeline stage on every HTTP request with
// a current session cookie. 
// Where we should lookup user database info. 
// Whatever we pass in the "done" callback becomes req.user
// and can be used by subsequent middleware.
passport.deserializeUser((dbRowID, done) => {
    console.log("deserializeUser. Input is:", dbRowID);
    // here is a good place to look up user data in database using
    // dbRowID. Put whatever you want into an object. It ends up
	// as the property "user" of the "req" object. 
	
	const getUser = "SELECT * FROM Users WHERE GoogleID=" + dbRowID;
	userDb.all(getUser, function(err, data)
	{
		if(err) {
			console.log(err);
			let userData = {userData: dbRowID};
			done(null, userData);
		}
		else if(data[0]) {
			let userData = {
				userData: dbRowID,
				firstName: data[0].FirstName,
				lastName: data[0].LastName
			};
			done(null, userData);
		} else {
			let userData = {userData: dbRowID};
			done(null, userData);
		}
	});

});

passport.use( new GoogleStrategy(googleLoginData, gotProfile) );

const app = express()

// Check validity of cookies at the beginning of pipeline
// Will get cookies out of request, decrypt and check if 
// session is still going on. 
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']  
}));
// app.use(express.static('public'));
// Initializes request object for further handling by passport
app.use(passport.initialize()); 
// If there is a valid cookie, will call deserializeUser()
app.use(passport.session()); 
// Public static files
app.get('/*', express.static('public'));

app.get('/auth/google',
	passport.authenticate('google',{ scope: ['profile'] }) );

app.get("/auth/accept",
	function(req, res, next) {
		console.log(req.user.userData);
		var cmd = "SELECT COUNT(user) FROM Flashcards Where user=" + req.user.userData;
		console.log(cmd);
		db.all(cmd, function(err, data) {
			if(err) {
				console.log("err", err);
			} else {
				console.log(data);
				if(data[0]["COUNT(user)"] == 0) {
					res.redirect("/user/add.html");
				} else{
					res.redirect("/user/review.html");
				}
			}
			next();
		});
	}
);

app.get('/auth/redirect',
	function (req, res, next) {
	    console.log('Logged in and using cookies!')
		next();
	},
	passport.authenticate('google'),
	function (req, res) {
		console.log('Logged in and using cookies!')
	    res.redirect("/auth/accept");
	});

// static files in /user are only available after login
app.get('/user/*',
	isAuthenticated, // only pass on to following function if
	express.static('.') 
       ); 


app.get('/user/translate',
	isAuthenticated,
	translateHandler);
app.get('/user/store', 
	isAuthenticated,
	storeHandler);

app.get('/user/name',
	isAuthenticated,
	nameHandler);

app.use(fileNotFound);

app.listen(port, function() { console.log('Listening..'); } );

