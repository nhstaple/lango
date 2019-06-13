/*
  Node functions to handle AJAX requests
*/

const sqlite3 = require("sqlite3").verbose();
const dbFileName = "Collection.db";
const  db = new sqlite3.Database(dbFileName);
const APIrequest = require('request');

// API url contains our API key
const APIurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=766088011c39025e7563742fcd2ba8b3&per_page=12&format=json&nojsoncallback=1&sort=relevance&tag_mode=all&tags="


// entry point
function handler (request, response, next) {
    if (request.query.tags) {
	handleTagQuery(request.query.tags, response); }
    else if (request.query.add) {
	handleAddQuery(request.query.add, response); }
    else next();
}


// adds the url of a photo to the database
function handleAddQuery(url, response) {
    
    // start database operation
    cmd = "INSERT INTO photos (fileName) VALUES ('"+url+"')";
    db.run(cmd, dbCallback);

    // run when database operation is complete
    function dbCallback(err) {
	response.send("OK");
    }
}

// answer a tag query by getting answer from flickr API
function handleTagQuery ( params, response ) {

    // construct query 
    // should be sequence of tags, connected by commas
    let tags = params.split(" ");
    if (tags.length > 0) {
	let query = APIurl+tags[0];
	for (let i=1; i< tags.length; i++) {
	    query = query+","+tags[i];
	}
	
        // API call to get selection of photos from Flickr
	// The call that makes a request to the API
	APIrequest(
	    { // HTTP header stuff
		url: query,
		method: "GET"
	    },
	    // callback function for API request
	    APIcallback
	);
    }

    // closure will contain the response object
    function APIcallback (err, object) {
	response.send(object.body);
    }
}

exports.handler = handler;

