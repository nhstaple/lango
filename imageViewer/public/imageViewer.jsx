/*
    Front-end code for photo collection
*/


// called when the Submit button is pushed 
function gotKeyword() {

    // get what the user put into the textbox
    let keyWordStr = document.getElementById("keywordBox").value;

    // send an AJAX request
    let oReq = new XMLHttpRequest();
    let  url = "query?tags="+keyWordStr;;
    oReq.open("GET", url);
    oReq.onload=gotJSONNowWhat;
    oReq.send();

    // callback function
    // picks up oReq in closure
    function gotJSONNowWhat() {
	let resp = JSON.parse(oReq.responseText);
	showPhotos(resp);
    }
}
    

// displays a new group of photos
function showPhotos(photoDesc) {

    // get photo src urls out of response JSON and into an array
    // decodes Flickr photo server syntax
    let descriptions = photoDesc.photos.photo;
    let photoURLs = [];
    let n = descriptions.length;
    console.log("Got "+n+" photos");
    for (let i=0; i<n; i++) {
	let d = descriptions[i];
	let imgURL = "https://farm"+d.farm+
		".staticflickr.com/"+d.server+
		"/"+d.id+"_"+d.secret+"_z.jpg";
	photoURLs.push(imgURL);
    }

    // use React to display photos
    let reactDiv = document.getElementById("react");
    ReactDOM.render(
        <ImageCarousel urlList={photoURLs} />,
		    reactDiv);
}

// A react component that shows a collection of images, one by one.
// Defined as a class and stores some state (the index of displayed image)
class ImageCarousel extends React.Component {

    constructor(props) {
	super(props); // call constructor of parent class
	this.state = { index: 0 };

	// methods that will get called asynchronously
	this.advance = this.advance.bind(this);
	this.addCurrent = this.addCurrent.bind(this);
	this.replyFromServer = this.replyFromServer.bind(this);
    }

    // select a photo when user clicks on it
    advance() {
    	// change the index to see next photo
	let i = this.state.index+1;
	if (i >= this.props.urlList.length) {
	   i = 0;
	   }
	this.setState({index: i});
    }

    // Send AJAX query to insert selected photo into database
    addCurrent() {
	let oReq = new XMLHttpRequest();
	let photo = this.props.urlList[this.state.index];
	let url = "query?add="+photo;
	oReq.open("GET", url);
	oReq.onload = this.replyFromServer;
	oReq.send();
	}

    // callback for database add
    replyFromServer() {
	console.log("database operation AJAX response received");
    }

    // React method called when props are changed
    // This will not be on the final.
    getDerivedStateFromProps() {
        this.setState({index: 0});
    }

    render() {
        // set up some local variables
	let photos = this.props.urlList;
	let i = this.state.index;

	return (
	       <div className='display'>
	       <div className='ImageCarousel'>
	           <Tile photo={photos[i]} pFun={this.advance} />
	       </div>
	       <div className='buttonBox'>
	          <p className='prompt'>
		       Click on image to advance
		  </p>
       	          <button className='nice'
		  	  onClick={this.addCurrent}>
		      Add to Collection
		  </button>
              </div>
	      </div>
	); // return
    } // render
    
} // class


// A react component for an image tile
function Tile(props) {

        // set-up - unpack props and set local variables
	let src = props.photo;
	let pFun = props.pFun;
	
	// the image gets an onclick function that calls the
	// parent element's function which was passed as a prop.
	return (
	    <div className='imageTile'>
	       <img src={src} onClick={function(e) { pFun();} } />
	     </div>
	) // return
} // end of function Tile

