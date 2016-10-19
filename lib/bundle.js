/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _space = __webpack_require__(2);
	
	var _space2 = _interopRequireDefault(_space);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	console.log('loaded');
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.spaces = [];
	    this.options = [];
	  }
	
	  _createClass(Game, [{
	    key: 'start',
	    value: function start() {
	      this.generateSpaces();
	      this.generateSideTiles();
	    }
	  }, {
	    key: 'generateSpaces',
	    value: function generateSpaces() {
	      for (var i = 1; i < 71; i++) {
	        var spaces = document.getElementById("spaces");
	        var space = new _space2.default([0, 0], i, spaces, "tile");
	        space.createCanvas();
	        this.spaces.push(space);
	      }
	    }
	  }, {
	    key: 'generateSideTiles',
	    value: function generateSideTiles() {
	      for (var i = 1; i < 6; i++) {
	        var spaces = document.getElementById("side-tiles");
	        var option = new _space2.default([0, 0], i + 'choice', spaces, "option");
	        option.createCanvas();
	        option.generateRandomPipe();
	        this.options.push(option);
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	var game = new Game();
	game.start();

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEFAULTS = {
	  type: "0"
	};
	var SIZE = 60;
	
	var Space = function () {
	  function Space(coord, id, parent, klass) {
	    _classCallCheck(this, Space);
	
	    this.x = coord[0];
	    this.y = coord[1];
	    this.id = id;
	    this.parent = parent;
	    this.klass = klass;
	  }
	
	  _createClass(Space, [{
	    key: "handleClick",
	    value: function handleClick(e) {
	      e.preventDefault();
	      this.ctx.fillStyle = "#f4f4f4";
	      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	      this.drawPipe(1);
	    }
	  }, {
	    key: "createCanvas",
	    value: function createCanvas() {
	      var canvas = document.createElement("canvas");
	      canvas.setAttribute("width", "60px");
	      canvas.setAttribute("height", "60px");
	      canvas.setAttribute("class", this.klass);
	      canvas.setAttribute("id", "" + this.id);
	
	      if (this.klass != "option") {
	        canvas.addEventListener('click', this.handleClick.bind(this));
	      }
	      this.canvas = canvas;
	      this.ctx = canvas.getContext('2d');
	
	      this.parent.appendChild(canvas);
	      this.drawPipe(0);
	    }
	  }, {
	    key: "drawPipe",
	    value: function drawPipe(type) {
	
	      switch (type) {
	        case 0:
	          return;
	        case 1:
	          this.ctx.beginPath();
	          this.ctx.fillStyle = "gray";
	          this.ctx.rect(15, 0, 4, 60);
	          this.ctx.rect(39, 0, 4, 60);
	          this.ctx.fill();
	          this.ctx.closePath();
	
	          this.ctx.beginPath();
	          this.ctx.rect(19, 0, 20, 60);
	          this.ctx.fillStyle = "lightgray";
	          this.ctx.fill();
	          this.ctx.closePath();
	          return;
	        case 2:
	          this.ctx.beginPath();
	          this.ctx.fillStyle = "gray";
	          this.ctx.rect(0, 15, 60, 4);
	          this.ctx.rect(0, 39, 60, 4);
	          this.ctx.fill();
	          this.ctx.closePath();
	
	          this.ctx.beginPath();
	          this.ctx.rect(0, 19, 60, 20);
	          this.ctx.fillStyle = "lightgray";
	          this.ctx.fill();
	          this.ctx.closePath();
	          return;
	      }
	    }
	  }, {
	    key: "generateRandomPipe",
	    value: function generateRandomPipe() {
	      var rand = Math.floor(Math.random() * 2 + 1);
	      this.canvas.setAttribute("type", rand);
	      this.drawPipe(rand);
	    }
	  }]);
	
	  return Space;
	}();
	
	exports.default = Space;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map