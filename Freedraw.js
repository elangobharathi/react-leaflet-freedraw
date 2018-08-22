'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leafletFreedraw = require('leaflet-freedraw');

Object.keys(_leafletFreedraw).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _leafletFreedraw[key];
    }
  });
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _leafletFreedraw2 = _interopRequireDefault(_leafletFreedraw);

var _reactLeaflet = require('react-leaflet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Freedraw = function (_MapLayer) {
  _inherits(Freedraw, _MapLayer);

  function Freedraw() {
    _classCallCheck(this, Freedraw);

    return _possibleConstructorReturn(this, (Freedraw.__proto__ || Object.getPrototypeOf(Freedraw)).apply(this, arguments));
  }

  _createClass(Freedraw, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      return new _leafletFreedraw2.default(_extends({}, props));
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      this.leafletElement.mode(toProps.mode);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var map = this.props.leaflet.map;

      map.addLayer(this.leafletElement);
      this.attachEvents();
    }
  }, {
    key: 'attachEvents',
    value: function attachEvents() {
      this.leafletElement.on('markers', this.props.onMarkers);
      this.leafletElement.on('mode', this.props.onModeChange);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Freedraw;
}(_reactLeaflet.MapLayer);

exports.default = (0, _reactLeaflet.withLeaflet)(Freedraw);

