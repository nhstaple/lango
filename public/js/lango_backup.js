'use strict';

/** Part 1 React **/
/** Header. **/
function header() {
    var title = React.createElement(
        "div",
        { id: "title" },
        "Lango!"
    );
    
    var buttonWrapper = React.createElement(
        "div",
        { id: "buttonWrapper" },
        React.createElement(
            "button",
            { id: "reviewButton" },
            "Start Review")
    );
    
    return React.createElement(
        "div",
        { id: "header" },
        buttonWrapper,
        title
    );
}

/**  translation area **/
function translation() {
    var form = React.createElement(
        "div",
        { id: "form"},
        React.createElement(
            "textarea",
            { id: "cardInput",
              type: "text",
              name: "english",
              placeholder: "English",
              onKeyPress: checkReturn },
        )
    );
    var resultBox = React.createElement(
        "div",
        { id: "resultBox"},
        React.createElement(
            "div",
            { id: "translation" },
            "Spanish"
        )
    );
    return React.createElement(
        "div",
        { id: "translationWrapper"},
        form,
        resultBox)
    ;
}

/**  save button **/
function saveButton() {
    return React.createElement(
        "div",
        {id: "saveWrapper"},
        React.createElement(
            "button",
            { id: "saveButton",
              onClick: storeReq },
            "Save"
        )
    );
}

/** Footer. **/
function footer() {
    return React.createElement(
        "div",
        { id: "footer"},
        "Username"  
    );
}

/** Checks if the user hit return. **/
function checkReturn(event) {
    if (event.charCode == 13) {
       // let newPhrase = document.getElementById("cardInput").value;
	   // this.setState({opinion: newPhrase} );
	   submitReq();
    }
}

var main = React.createElement(
	"main",
    null,
    header(),
    translation(),
    saveButton(),
    footer()
);

ReactDOM.render(main, document.getElementById("root"));
