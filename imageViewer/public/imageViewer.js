var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
    Front-end code for photo collection
*/

// called when the Submit button is pushed 
function gotKeyword() {

				// get what the user put into the textbox
				var keyWordStr = document.getElementById("keywordBox").value;

				// send an AJAX request
				var oReq = new XMLHttpRequest();
				var url = "query?tags=" + keyWordStr;;
				oReq.open("GET", url);
				oReq.onload = gotJSONNowWhat;
				oReq.send();

				// callback function
				// picks up oReq in closure
				function gotJSONNowWhat() {
								var resp = JSON.parse(oReq.responseText);
								showPhotos(resp);
				}
}

// displays a new group of photos
function showPhotos(photoDesc) {

				// get photo src urls out of response JSON and into an array
				// decodes Flickr photo server syntax
				var descriptions = photoDesc.photos.photo;
				var photoURLs = [];
				var n = descriptions.length;
				console.log("Got " + n + " photos");
				for (var i = 0; i < n; i++) {
								var d = descriptions[i];
								var imgURL = "https://farm" + d.farm + ".staticflickr.com/" + d.server + "/" + d.id + "_" + d.secret + "_z.jpg";
								photoURLs.push(imgURL);
				}

				// use React to display photos
				var reactDiv = document.getElementById("react");
				ReactDOM.render(React.createElement(ImageCarousel, { urlList: photoURLs }), reactDiv);
}

// A react component that shows a collection of images, one by one.
// Defined as a class and stores some state (the index of displayed image)

var ImageCarousel = function (_React$Component) {
				_inherits(ImageCarousel, _React$Component);

				function ImageCarousel(props) {
								_classCallCheck(this, ImageCarousel);

								// call constructor of parent class
								var _this = _possibleConstructorReturn(this, (ImageCarousel.__proto__ || Object.getPrototypeOf(ImageCarousel)).call(this, props));

								_this.state = { index: 0 };

								// methods that will get called asynchronously
								_this.advance = _this.advance.bind(_this);
								_this.addCurrent = _this.addCurrent.bind(_this);
								_this.replyFromServer = _this.replyFromServer.bind(_this);
								return _this;
				}

				// select a photo when user clicks on it


				_createClass(ImageCarousel, [{
								key: "advance",
								value: function advance() {
												// change the index to see next photo
												var i = this.state.index + 1;
												if (i >= this.props.urlList.length) {
																i = 0;
												}
												this.setState({ index: i });
								}

								// Send AJAX query to insert selected photo into database

				}, {
								key: "addCurrent",
								value: function addCurrent() {
												var oReq = new XMLHttpRequest();
												var photo = this.props.urlList[this.state.index];
												var url = "query?add=" + photo;
												oReq.open("GET", url);
												oReq.onload = this.replyFromServer;
												oReq.send();
								}

								// callback for database add

				}, {
								key: "replyFromServer",
								value: function replyFromServer() {
												console.log("database operation AJAX response received");
								}

								// React method called when props are changed

				}, {
								key: "getDerivedStateFromProps",
								value: function getDerivedStateFromProps() {
												this.setState({ index: 0 });
								}
				}, {
								key: "render",
								value: function render() {
												// set up some local variables
												var photos = this.props.urlList;
												var i = this.state.index;

												return React.createElement(
																"div",
																{ className: "display" },
																React.createElement(
																				"div",
																				{ className: "ImageCarousel" },
																				React.createElement(Tile, { photo: photos[i], pFun: this.advance })
																),
																React.createElement(
																				"div",
																				{ className: "buttonBox" },
																				React.createElement(
																								"p",
																								{ className: "prompt" },
																								"Click on image to advance"
																				),
																				React.createElement(
																								"button",
																								{ className: "nice",
																												onClick: this.addCurrent },
																								"Add to Collection"
																				)
																)
												); // return
								} // render

				}]);

				return ImageCarousel;
}(React.Component); // class


// A react component for an image tile


function Tile(props) {

				// set-up - unpack props and set local variables
				var src = props.photo;
				var pFun = props.pFun;

				// the image gets an onclick function that calls the
				// parent element's function which was passed as a prop.
				return React.createElement(
								"div",
								{ className: "imageTile" },
								React.createElement("img", { src: src, onClick: function onClick(e) {
																pFun();
												} })
				); // return
} // end of function Tile