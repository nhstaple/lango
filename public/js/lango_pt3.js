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

/*
   This flipcard component is based on the flipcard component by
   Alex Devero, at:
   
      https://reactjsexample.com/react-flipping-card-with-tutorial/

   It was modified for ECS 162 by Nina Amenta, May 2019.
*/
function cardReq() {
  var str = "card?spanish=" + document.getElementById("trans").textContent + "&correct=true";
  console.log("sanity check cardReq AJAX\n" + str);
  makeCorsRequest(str);
  return;
}

var cardContainer = document.getElementById("root");
/** Header. **/

var Header =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "header"
      }, React.createElement("div", {
        className: "buttonWrapper"
      }, React.createElement("a", {
        id: "addRedirect",
        href: "/user/add.html"
      }, "Add")), React.createElement("div", {
        id: "title"
      }, "Lango!"));
    }
  }]);

  return Header;
}(React.Component);
/** Footer. **/


var Footer =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Footer, _React$Component2);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Footer).apply(this, arguments));
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
}(React.Component); // React component for the front side of the card


var CardFront =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(CardFront, _React$Component3);

  function CardFront() {
    _classCallCheck(this, CardFront);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardFront).apply(this, arguments));
  }

  _createClass(CardFront, [{
    key: "render",
    value: function render(props) {
      return React.createElement("div", {
        id: "front",
        className: "card-side side-front"
      }, React.createElement("div", {
        className: "card-side-container"
      }, React.createElement("h2", {
        id: "trans"
      }, this.props.text)));
    }
  }]);

  return CardFront;
}(React.Component); // React component for the back side of the card


var CardBack =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(CardBack, _React$Component4);

  function CardBack() {
    _classCallCheck(this, CardBack);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardBack).apply(this, arguments));
  }

  _createClass(CardBack, [{
    key: "render",
    value: function render(props) {
      return React.createElement("div", {
        id: "back",
        className: "card-side side-back"
      }, React.createElement("div", {
        className: "card-side-container"
      }, React.createElement("h2", {
        id: "congrats"
      }, this.props.text)));
    }
  }]);

  return CardBack;
}(React.Component);

function flipCard() {
  var counter = 0;
  var wait = setInterval(function (counter) {
    console.log("Flip! " + counter);
    if (counter >= 2) {
      console.log("stop flipping!");
      clearInterval(wait);
      getFlashCard();
    }
    if(counter == 0) 
    {
      document.getElementById("card").classList.add("is-flipped");
      document.getElementById("front").classList.add("is-flipped");
    }
    else
    {
      document.getElementById("card").classList.remove("is-flipped");
      document.getElementById("front").classList.remove("is-flipped");
    } 
    counter++;
  }, 1500);
}

var CardWrapper =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(CardWrapper, _React$Component5);

  function CardWrapper() {
    _classCallCheck(this, CardWrapper);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardWrapper).apply(this, arguments));
  }

  _createClass(CardWrapper, [{
    key: "checkReturn",
    value: function checkReturn(event) {
      if (event.charCode == 13) {
        flipCard();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "reviewMain"
      }, React.createElement(Header, null), React.createElement("div", {
        id: "card",
        className: "card-container"
      }, React.createElement("div", {
        className: "buttonWrapper"
      }, React.createElement("button", {
        id: "flipButton",
        onClick: this.flipCard
      }, "Check Answer")), React.createElement("div", {
        className: "card-body"
      }, React.createElement(CardBack, {
        text: "Correct!"
      }), React.createElement(CardFront, {
        text: ""
      }))), React.createElement("div", {
        id: "form"
      }, React.createElement("textarea", {
        id: "cardInput",
        type: "text",
        name: "english",
        placeholder: "English",
        onKeyPress: this.checkReturn
      })), React.createElement(Footer, null));
    }
  }]);

  return CardWrapper;
}(React.Component); // Render Card component


ReactDOM.render(React.createElement(CardWrapper, null), cardContainer);
getUsername();
getFlashCard();