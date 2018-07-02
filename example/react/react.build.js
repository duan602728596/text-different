/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./react.src.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./react.src.js":
/*!**********************!*\
  !*** ./react.src.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var TextDifferentForReact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! TextDifferentForReact */ \"TextDifferentForReact\");\n/* harmony import */ var TextDifferentForReact__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(TextDifferentForReact__WEBPACK_IMPORTED_MODULE_2__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar oldScript = \"/*\\n666\\n */\\n\\nimport React, { Component } from 'react';\\nimport style from './style.sass';\\n\\nclass Text extends Component{\\n  constructor(){\\n    super(...arguments);\\n    \\n    this.state = {\\n      len: 0,\\n      loading: false,\\n      text: 'Hello, world!'\\n    };\\n  }\\n  render(){\\n    return (\\n      <div className={ style.text }>\\n        <h1>{ this.state.text }</h1>\\n      </div>\\n    );\\n  }\\n}\\n\\nexport default Text;\";\nvar newScript = \"/*\\n766\\n */\\n\\nimport React, { Component } from 'react';\\nimport {\\n  Table,\\n  message,\\n  Button  \\n} from 'antd';\\nimport style from './style.sass';\\n\\nclass Text extends Component{\\n  constructor(){\\n    super(...arguments);\\n    \\n    this.state = {\\n      text: 'Hello, world!'\\n    };\\n  }\\n  componentDidMount(){\\n    // Do something.\\n  }\\n  render(){\\n    return (\\n      <div className={ style.text }>\\n        <h2>{ this.state.text }</h2>\\n        <Button type=\\\"primary\\\">Click</Button>\\n      </div>\\n    );\\n  }\\n}\\n\\nexport default Text;\";\n\nvar Example =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Example, _Component);\n\n  function Example() {\n    var _this;\n\n    _classCallCheck(this, Example);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Example).apply(this, arguments));\n    _this.state = {\n      oldCode: oldScript,\n      newCode: newScript\n    };\n    return _this;\n  }\n\n  _createClass(Example, [{\n    key: \"onChange\",\n    value: function onChange() {\n      this.setState({\n        oldCode: 'var a = 5;',\n        newCode: 'var a = 6;'\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TextDifferentForReact__WEBPACK_IMPORTED_MODULE_2___default.a, {\n        oldCode: this.state.oldCode,\n        newCode: this.state.newCode,\n        type: \"javascript\"\n      });\n    }\n  }]);\n\n  return Example;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Example, null), document.getElementById('root'));\n\n//# sourceURL=webpack:///./react.src.js?");

/***/ }),

/***/ "TextDifferentForReact":
/*!***********************************************!*\
  !*** external "window.TextDifferentForReact" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = window.TextDifferentForReact;\n\n//# sourceURL=webpack:///external_%22window.TextDifferentForReact%22?");

/***/ }),

/***/ "react":
/*!*******************************!*\
  !*** external "window.React" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = window.React;\n\n//# sourceURL=webpack:///external_%22window.React%22?");

/***/ }),

/***/ "react-dom":
/*!**********************************!*\
  !*** external "window.ReactDOM" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = window.ReactDOM;\n\n//# sourceURL=webpack:///external_%22window.ReactDOM%22?");

/***/ })

/******/ });