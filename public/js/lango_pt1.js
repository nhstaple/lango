// lango_part1.jsx
"use strict";
/** Functions. **/

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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


var Header =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    var _this;

    _classCallCheck(this, Header);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Header).call(this, props));
    _this.state = null;
    return _this;
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "header"
      }, React.createElement("div", {
        className: "buttonWrapper"
      }, React.createElement("button", {
        id: "reviewButton"
      }, "Start Review")), React.createElement("div", {
        id: "title"
      }, "Lango!"));
    }
  }]);

  return Header;
}(React.Component);
/** Translation. **/


var Translation =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Translation, _React$Component2);

  function Translation(props) {
    var _this2;

    _classCallCheck(this, Translation);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Translation).call(this, props));
    _this2.state = null;
    return _this2;
  }

  _createClass(Translation, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "translationWrapper"
      }, React.createElement("div", {
        id: "form"
      }, React.createElement("textarea", {
        id: "cardInput",
        type: "text",
        name: "english",
        placeholder: "English",
        onKeyPress: checkReturn
      })), React.createElement("div", {
        id: "resultBox"
      }, React.createElement("div", {
        id: "translation"
      }, "Spanish")));
    }
  }]);

  return Translation;
}(React.Component);
/** Save Button. **/


var SaveButton =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(SaveButton, _React$Component3);

  function SaveButton(props) {
    var _this3;

    _classCallCheck(this, SaveButton);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(SaveButton).call(this, props));
    _this3.state = null;
    return _this3;
  }

  _createClass(SaveButton, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "saveWrapper"
      }, React.createElement("button", {
        id: "saveButton",
        onClick: storeReq
      }, "Save"));
    }
  }]);

  return SaveButton;
}(React.Component);
/** Footer. **/


var Footer =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(Footer, _React$Component4);

  function Footer(props) {
    var _this4;

    _classCallCheck(this, Footer);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Footer).call(this, props));
    _this4.state = null;
    return _this4;
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "footer"
      }, "User Name");
    }
  }]);

  return Footer;
}(React.Component);
/** The whole enchilada. **/


var CreatePage =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(CreatePage, _React$Component5);

  function CreatePage(props) {
    var _this5;

    _classCallCheck(this, CreatePage);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(CreatePage).call(this, props));
    _this5.state = {
      page: "create"
    };
    return _this5;
  }

  _createClass(CreatePage, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "translateMain"
      }, React.createElement(Header, null), React.createElement(Translation, null), React.createElement(SaveButton, null), React.createElement(Footer, null));
    }
  }]);

  return CreatePage;
}(React.Component);

ReactDOM.render(React.createElement(CreatePage, null), document.getElementById('root'));