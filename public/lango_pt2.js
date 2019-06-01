// lango_part1.jsx
"use strict";

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

var Login =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    var _this;

    _classCallCheck(this, Login);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Login).call(this, props));
    _this.state = {
      userID: null
    };
    return _this;
  }

  _createClass(Login, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "login"
      }, React.createElement("a", {
        id: "googleLogin",
        href: "auth/google"
      }, React.createElement("div", {
        class: "loginWrapper"
      }, React.createElement("div", {
        id: "googleIconWrapper"
      }, React.createElement("img", {
        id: "googleIcon",
        src: "https://image.flaticon.com/teams/slug/google.jpg"
      })), React.createElement("div", {
        id: "loginTextWrapper"
      }, "Login with Google."))));
    }
  }]);

  return Login;
}(React.Component);

var Welcome =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Welcome, _React$Component2);

  function Welcome(props) {
    var _this2;

    _classCallCheck(this, Welcome);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Welcome).call(this, props));
    _this2.state = null;
    return _this2;
  }

  _createClass(Welcome, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "welcome"
      }, React.createElement("div", {
        id: "welcomeText"
      }, "Welcome to Lango!"), React.createElement("div", {
        id: "welcomeSub"
      }, "Customize your vocabulary."));
    }
  }]);

  return Welcome;
}(React.Component);

var WelcomePage =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(WelcomePage, _React$Component3);

  function WelcomePage(props) {
    var _this3;

    _classCallCheck(this, WelcomePage);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(WelcomePage).call(this, props));
    _this3.state = null;
    return _this3;
  }

  _createClass(WelcomePage, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "welcomePage"
      }, React.createElement(Welcome, null), React.createElement(Login, null));
    }
  }]);

  return WelcomePage;
}(React.Component);

ReactDOM.render(React.createElement(WelcomePage, null), document.getElementById('root'));

function LoginToInsert() 
{
	console.log("The user signed in.");
	ReactDOM.render(
   		React.createElement(CreatePage, null),
    		document.getElementById('root'));
}
