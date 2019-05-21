'use strict';

/** Functions. **/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function storeReq() {
    var str = "store?english=" + document.getElementById("cardInput").value + "&spanish=" + document.getElementById("translation").textContent;
    makeCorsRequest(str);
    return;
}

function submitReq() {
    var str = "translate?english=" + document.getElementById("cardInput").value;
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

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header(props) {
        _classCallCheck(this, Header);

        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

        _this.state = null;
        return _this;
    }

    _createClass(Header, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "header" },
                React.createElement(
                    "div",
                    { id: "buttonWrapper" },
                    React.createElement(
                        "button",
                        { id: "reviewButton" },
                        "Start Review"
                    )
                ),
                React.createElement(
                    "div",
                    { id: "title" },
                    "Lango!"
                )
            );
        }
    }]);

    return Header;
}(React.Component);

/** Translation. **/


var Translation = function (_React$Component2) {
    _inherits(Translation, _React$Component2);

    function Translation(props) {
        _classCallCheck(this, Translation);

        var _this2 = _possibleConstructorReturn(this, (Translation.__proto__ || Object.getPrototypeOf(Translation)).call(this, props));

        _this2.state = null;
        return _this2;
    }

    _createClass(Translation, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "translationWrapper" },
                React.createElement(
                    "div",
                    { id: "form" },
                    React.createElement("textarea", { id: "cardInput", type: "text", name: "english", placeholder: "English", onKeyPress: checkReturn })
                ),
                React.createElement(
                    "div",
                    { id: "resultBox" },
                    React.createElement(
                        "div",
                        { id: "translation" },
                        "Spanish"
                    )
                )
            );
        }
    }]);

    return Translation;
}(React.Component);

/** Save Button. **/


var SaveButton = function (_React$Component3) {
    _inherits(SaveButton, _React$Component3);

    function SaveButton(props) {
        _classCallCheck(this, SaveButton);

        var _this3 = _possibleConstructorReturn(this, (SaveButton.__proto__ || Object.getPrototypeOf(SaveButton)).call(this, props));

        _this3.state = null;
        return _this3;
    }

    _createClass(SaveButton, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "saveWrapper" },
                React.createElement(
                    "button",
                    { id: "saveButton", onClick: storeReq },
                    "Save"
                )
            );
        }
    }]);

    return SaveButton;
}(React.Component);

/** Footer. **/


var Footer = function (_React$Component4) {
    _inherits(Footer, _React$Component4);

    function Footer(props) {
        _classCallCheck(this, Footer);

        var _this4 = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

        _this4.state = null;
        return _this4;
    }

    _createClass(Footer, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "footer" },
                "Nick Stapleton"
            );
        }
    }]);

    return Footer;
}(React.Component);

/** The whole enchilada. **/


var CreatePage = function (_React$Component5) {
    _inherits(CreatePage, _React$Component5);

    function CreatePage(props) {
        _classCallCheck(this, CreatePage);

        var _this5 = _possibleConstructorReturn(this, (CreatePage.__proto__ || Object.getPrototypeOf(CreatePage)).call(this, props));

        _this5.state = { page: "create" };
        return _this5;
    }

    _createClass(CreatePage, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "main" },
                React.createElement(Header, null),
                React.createElement(Translation, null),
                React.createElement(SaveButton, null),
                React.createElement(Footer, null)
            );
        }
    }]);

    return CreatePage;
}(React.Component);

ReactDOM.render(React.createElement(CreatePage, null), document.getElementById('root'));