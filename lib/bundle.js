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
	
	var _pipe = __webpack_require__(1);
	
	var _pipe2 = _interopRequireDefault(_pipe);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	console.log('loaded');
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.canvas = document.getElementById("main");
	    this.ctx = this.canvas.getContext("2d");
	  }
	
	  _createClass(Game, [{
	    key: 'start',
	    value: function start() {
	      this.drawBackground();
	      var pipe = new _pipe2.default(1, this.ctx, [67, 67]);
	      pipe.createCanvas();
	      pipe.draw();
	      pipe.drawPipe(0);
	    }
	  }, {
	    key: 'drawBackground',
	    value: function drawBackground() {
	      this.ctx.beginPath();
	      this.ctx.lineWidth = 5;
	      this.ctx.strokeRect(5, 5, 620, 430);
	      this.ctx.fill();
	      this.ctx.closePath();
	
	      for (var i = 1; i < 10; i++) {
	        this.ctx.beginPath();
	        this.ctx.lineWidth = 2;
	        this.ctx.moveTo(i * 62 + 5, 5);
	        this.ctx.lineTo(i * 62 + 5, 435);
	        this.ctx.stroke();
	        this.ctx.closePath();
	      }
	
	      for (var _i = 1; _i < 7; _i++) {
	        this.ctx.beginPath();
	        this.ctx.lineWidth = 2;
	        this.ctx.moveTo(5, _i * 62 + 5);
	        this.ctx.lineTo(625, _i * 62 + 5);
	        this.ctx.stroke();
	        this.ctx.closePath();
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	var game = new Game();
	game.start();

/***/ },
/* 1 */
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
	
	var Pipe = function () {
	  function Pipe(type, ctx, coord) {
	    _classCallCheck(this, Pipe);
	
	    this.x = coord[0];
	    this.y = coord[1];
	  }
	
	  _createClass(Pipe, [{
	    key: "draw",
	    value: function draw() {
	      this.ctx = this.canvas.getContext("2d");
	      this.ctx.beginPath();
	      this.ctx.lineWidth = 2;
	      this.ctx.rect(0, 0, 60, 60);
	      this.ctx.fillStyle = "#E3E3E3";
	      this.ctx.fill();
	      this.ctx.closePath();
	    }
	  }, {
	    key: "createCanvas",
	    value: function createCanvas() {
	      var canvas = document.createElement("canvas");
	      canvas.setAttribute("width", "60px");
	      canvas.setAttribute("height", "60px");
	      canvas.setAttribute("class", "tile");
	      canvas.addEventListener('click', function () {
	        return console.log('click');
	      });
	      this.canvas = canvas;
	      this.draw();
	      var spaces = document.getElementById("spaces");
	      document.body.appendChild(canvas);
	    }
	  }, {
	    key: "drawPipe",
	    value: function drawPipe(type) {
	      switch (type) {
	        case 0:
	          this.ctx.beginPath();
	          this.ctx.lineWidth = 2;
	          this.ctx.rect(this.x + 21, this.y + 1, 20, 60);
	          this.ctx.fillStyle = "gray";
	          this.ctx.fill();
	
	          this.ctx.closePath();
	      }
	    }
	  }]);
	
	  return Pipe;
	}();
	
	exports.default = Pipe;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map