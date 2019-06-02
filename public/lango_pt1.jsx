// lango_part1.jsx
"use strict";

/** Functions. **/
function storeReq()
{
	let str = "store?english=" + document.getElementById("cardInput").value
			+ "&spanish=" + document.getElementById("translation").textContent;
	makeCorsRequest(str);
	return;
}

function submitReq()
{
	let str = "translate?english=" + document.getElementById("cardInput").value;
	makeCorsRequest(str);
	return;
}

/** Checks if the user hit return. **/
function checkReturn(event) {
    if (event.charCode == 13) {
       // let newPhrase = document.getElementById("cardInput").value;
	   // this.setState({opinion: newPhrase} );
	   submitReq();
    }
}

/** Part 1 React **/
/** Header. **/
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
    }
    render() {
        return (
        <div id="header">
            <div id="buttonWrapper">
                <button id="reviewButton">Start Review</button>
            </div>
            <div id="title">Lango!</div>
        </div>
        );
    }
}

/** Translation. **/
class Translation extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
    }
    render() {
        return (
            <div id="translationWrapper">
				<div id="form">
					<textarea id="cardInput" type="text" name="english" placeholder="English" onKeyPress={checkReturn}>
                    </textarea>
				</div>
				<div id="resultBox">
					<div id="translation">Spanish</div>
				</div>
			</div>
        );
    }
}

/** Save Button. **/
class SaveButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
    }
    render() {
        return (
            <div id="saveWrapper">
				<button id="saveButton" onClick={storeReq}>Save</button>
			</div>
        );
    }
}

/** Footer. **/
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
    }
    render() {
        return (
        <div id="footer">
            Nick Stapleton
        </div>
        );
    }
}

/** The whole enchilada. **/
class CreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: "create"};
    }
    render() {
        return (
        <div id="translateMain">
            <Header />
            <Translation />
            <SaveButton />
            <Footer />
        </div>
        );
    }
}


ReactDOM.render(
    <CreatePage />,
    document.getElementById('root'));
