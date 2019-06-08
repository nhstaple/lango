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
  var str = "card";
  makeCorsRequest(str);
  return;
}

const cardContainer = document.getElementById("root");

var CardInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CardInput, _React$Component);

  function CardInput() {
    _classCallCheck(this, CardInput);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardInput).apply(this, arguments));
  }

  _createClass(CardInput, [{
    key: "render",
    value: function render() {
      return React.createElement("fieldset", null, React.createElement("input", {
        name: this.props.name,
        id: this.props.id,
        type: this.props.type || 'text',
        placeholder: this.props.placeholder,
        required: true
      }));
    }
  }]);

  return CardInput;
}(React.Component); // React component for textarea


var CardTextarea =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(CardTextarea, _React$Component2);

  function CardTextarea() {
    _classCallCheck(this, CardTextarea);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardTextarea).apply(this, arguments));
  }

  _createClass(CardTextarea, [{
    key: "render",
    value: function render() {
      return React.createElement("fieldset", null, React.createElement("textarea", {
        name: this.props.name,
        id: this.props.id,
        placeholder: this.props.placeholder,
        required: true
      }));
    }
  }]);

  return CardTextarea;
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
        className: "card-side side-back"
      }, React.createElement("div", {
        className: "card-side-container"
      }, React.createElement("h2", {
        id: "congrats"
      }, this.props.text)));
    }
  }]);

  return CardBack;
}(React.Component); // React component for the card (main component)


var Card =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(Card, _React$Component5);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, _getPrototypeOf(Card).apply(this, arguments));
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "card-container"
      }, React.createElement("div", {
        className: "card-body"
      }, React.createElement(CardBack, {
        text: "Correct!"
      }), React.createElement(CardFront, {
        text: "Volare"
      })));
    }
  }]);

  return Card;
}(React.Component); // Render Card component


ReactDOM.render(React.createElement(Card, null), cardContainer);