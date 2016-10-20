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
	
	var _space = __webpack_require__(1);
	
	var _space2 = _interopRequireDefault(_space);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	console.log('loaded');
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.spaces = [];
	    this.options = [];
	
	    this.canvas = document.getElementById("sludge");
	
	    this.ctx = this.canvas.getContext('2d');
	    this.t = 1;
	    this.points = [];
	
	    this.grid = [];
	
	    for (var i = 0; i < 7; i++) {
	      var row = [];
	      for (var j = 0; j < 10; j++) {
	        row.push([]);
	      }
	      this.grid.push(row);
	    }
	    this.grid[3][0].push({ type: 'start', exit: "right", pos: { x: 0, y: 3 } });
	    this.currentSludgeSpace = this.grid[3][0][0];
	    for (var _i = 0; _i < 60; _i++) {
	      this.points.push({ x: _i, y: 213 }, { x: _i, y: 213 });
	    }
	
	    this.animateSludge();
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
	        var space = void 0;
	        if (i === 31) {
	          space = new _space2.default([0, 0], i, spaces, "start", this.handleClick.bind(this));
	        } else {
	          space = new _space2.default([0, 0], i, spaces, "tile", this.handleClick.bind(this));
	        }
	        space.createCanvas();
	        this.spaces.push(space);
	      }
	    }
	  }, {
	    key: 'handleClickMove',
	    value: function handleClickMove() {
	      this.options.forEach(function (option) {
	        var pos = 0;
	        var id = setInterval(frame, 1);
	        function frame() {
	          if (pos === 61) {
	            clearInterval(id);
	          } else {
	            pos++;
	            var str = option.canvas.style;
	            var sub = parseInt(str.top.substring(0, str.top.length - 2));
	            option.canvas.style.top = sub + 1;
	          }
	        }
	      });
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(space, e) {
	      e.preventDefault();
	      space.ctx.fillStyle = "#f4f4f4";
	      space.ctx.fillRect(0, 0, space.canvas.width, space.canvas.height);
	
	      var option = this.options[this.options.length - 1].canvas;
	      var type = parseInt(option.getAttribute('type'));
	
	      var newOption = new _space2.default([0, 0], option.getAttribute('id'), null, "option");
	      newOption.createCanvas();
	      newOption.generateRandomPipe();
	      newOption.canvas.style.top = -61;
	      this.options.unshift(newOption);
	
	      var sideTiles = document.getElementById("side-tiles");
	      sideTiles.insertBefore(newOption.canvas, sideTiles.childNodes[0]);
	
	      space.drawPipe(type);
	      option.parentElement.removeChild(option);
	      this.options.pop();
	      this.handleClickMove();
	    }
	  }, {
	    key: 'generateSideTiles',
	    value: function generateSideTiles() {
	      for (var i = 1; i < 6; i++) {
	        var spaces = document.getElementById("side-tiles");
	        var option = new _space2.default([0, 0], i + 'choice', spaces, "option");
	        option.createCanvas();
	        option.generateRandomPipe();
	        option.canvas.style.top = 61 * (i - 1);
	        this.options.push(option);
	      }
	    }
	  }, {
	    key: 'checkNextSpace',
	    value: function checkNextSpace() {
	      var y = this.currentSludgeSpace.pos.y;
	      var x = this.currentSludgeSpace.pos.x;
	
	      switch (this.currentSludgeSpace.exit) {
	        case 'right':
	          this.grid[y][x + 1].push('test');
	          alert('yess');
	          return;
	        default:
	          return;
	      }
	    }
	  }, {
	    key: 'animateSludge',
	    value: function animateSludge() {
	
	      if (this.points.length > 2) {
	        requestAnimationFrame(this.animateSludge.bind(this));
	      } else {
	        this.checkNextSpace();
	      }
	      var points = this.points;
	      // draw a line segment from the last waypoint
	      // to the current waypoint
	      this.ctx.beginPath();
	      this.ctx.lineWidth = 20;
	      this.ctx.strokeStyle = 'green';
	      this.ctx.moveTo(points[0].x, points[0].y);
	      this.ctx.lineTo(points[1].x, points[1].y);
	      this.ctx.stroke();
	      this.points.shift();
	      // increment "t" to get the next waypoint
	      this.t++;
	    }
	
	    // calc waypoints traveling along vertices
	    // calcWaypoints(vertices){
	    //   const waypoints = [];
	    //   for(let i = 1; i < vertices.length; i++){
	    //       const pt0 = vertices[i-1];
	    //       const pt1 = vertices[i];
	    //       const dx = pt1.x - pt0.x;
	    //       const dy = pt1.y - pt0.y;
	    //       for(let j = 0; j < 100; j++){
	    //           const x= pt0.x + dx * j / 100;
	    //           const y= pt0.y + dy * j / 100;
	    //           waypoints.push({x: x,y: y});
	    //       }
	    //   }
	    //   return(waypoints);
	    // }
	
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
	
	var INSIDE_COLOR = "#8ed2f9";
	var BORDER_COLOR = "#6e9cb7";
	var SIZE = 60;
	
	var Space = function () {
	  function Space(coord, id, parent, klass, handleClick) {
	    _classCallCheck(this, Space);
	
	    this.x = coord[0];
	    this.y = coord[1];
	    this.id = id;
	    this.parent = parent;
	    this.klass = klass;
	    this.canvas = null;
	    this.handleClick = handleClick;
	    this.possible = [];
	  }
	
	  _createClass(Space, [{
	    key: "addNewOption",
	    value: function addNewOption() {}
	  }, {
	    key: "createCanvas",
	    value: function createCanvas() {
	      var canvas = document.createElement("canvas");
	
	      canvas.setAttribute("width", "60px");
	      canvas.setAttribute("height", "60px");
	      canvas.setAttribute("class", this.klass);
	      canvas.setAttribute("row", "" + this.id);
	
	      this.canvas = canvas;
	      this.ctx = canvas.getContext('2d');
	
	      if (this.klass === "tile") {
	        canvas.addEventListener('click', this.handleClick.bind(null, this));
	      } else if (this.klass === "start") {
	        this.drawPipe(2);
	      }
	
	      if (this.parent) {
	        this.parent.appendChild(canvas);
	      }
	    }
	  }, {
	    key: "drawPipe",
	    value: function drawPipe(type) {
	      // this.canvas.setAttribute("class", "space");
	      // this.klass = "space";
	      switch (type) {
	        case 0:
	          return;
	        case 1:
	          this.ctx.beginPath();
	          this.ctx.strokeStyle = BORDER_COLOR;
	          this.ctx.lineWidth = 5;
	          this.ctx.moveTo(18, 0);
	          this.ctx.lineTo(18, 60);
	          this.ctx.moveTo(41, 0);
	          this.ctx.lineTo(41, 60);
	          this.ctx.stroke();
	
	          this.ctx.closePath();
	          this.ctx.beginPath();
	          this.ctx.rect(20, 0, 18, 60);
	          this.ctx.fillStyle = INSIDE_COLOR;
	          this.ctx.fill();
	          this.ctx.closePath();
	          this.possible = ["top", "bottom"];
	          return;
	        case 2:
	          this.ctx.beginPath();
	          this.ctx.strokeStyle = BORDER_COLOR;
	          this.ctx.lineWidth = 5;
	          this.ctx.moveTo(0, 18);
	          this.ctx.lineTo(60, 18);
	          this.ctx.moveTo(0, 41);
	          this.ctx.lineTo(60, 41);
	          this.ctx.stroke();
	          this.ctx.closePath();
	
	          this.ctx.beginPath();
	          this.ctx.rect(0, 20, 60, 18);
	          this.ctx.fillStyle = INSIDE_COLOR;
	          this.ctx.fill();
	          this.ctx.closePath();
	          this.possible = ["left", "right"];
	          return;
	        case 3:
	
	          this.ctx.strokeStyle = INSIDE_COLOR;
	          this.ctx.beginPath();
	          this.ctx.arc(0, 0, 30, 0, 0.5 * Math.PI, false);
	          this.ctx.lineWidth = 20;
	          this.ctx.stroke();
	
	          this.ctx.strokeStyle = BORDER_COLOR;
	
	          this.ctx.beginPath();
	          this.ctx.arc(0, 0, 18, 0, 0.5 * Math.PI, false);
	          this.ctx.lineWidth = 5;
	          this.ctx.stroke();
	
	          this.ctx.beginPath();
	          this.ctx.arc(0, 0, 41, 0, 0.5 * Math.PI, false);
	          this.ctx.lineWidth = 5;
	          this.ctx.stroke();
	          this.possible = ["left", "top"];
	          return;
	
	        case 4:
	          this.ctx.strokeStyle = INSIDE_COLOR;
	          this.ctx.beginPath();
	          this.ctx.arc(60, 0, 30, 0, 0.5 * Math.PI, true);
	          this.ctx.lineWidth = 20;
	          this.ctx.stroke();
	
	          this.ctx.strokeStyle = BORDER_COLOR;
	
	          this.ctx.beginPath();
	          this.ctx.arc(60, 0, 18, 0, 0.5 * Math.PI, true);
	          this.ctx.lineWidth = 5;
	          this.ctx.stroke();
	
	          this.ctx.beginPath();
	          this.ctx.arc(60, 0, 41, 0, 0.5 * Math.PI, true);
	          this.ctx.lineWidth = 5;
	          this.ctx.stroke();
	          this.possible = ["right", "top"];
	          return;
	        case 5:
	          this.ctx.strokeStyle = INSIDE_COLOR;
	          this.ctx.beginPath();
	          this.ctx.arc(0, 60, 30, 0, 0.5 * Math.PI, true);
	          this.ctx.lineWidth = 20;
	          this.ctx.stroke();
	
	          this.ctx.strokeStyle = BORDER_COLOR;
	
	          this.ctx.beginPath();
	          this.ctx.arc(0, 60, 18, 0, 0.5 * Math.PI, true);
	          this.ctx.lineWidth = 5;
	          this.ctx.stroke();
	
	          this.ctx.beginPath();
	          this.ctx.arc(0, 60, 41, 0, 0.5 * Math.PI, true);
	          this.ctx.lineWidth = 5;
	          this.ctx.stroke();
	          this.possible = ["left", "bottom"];
	          return;
	        case 6:
	          this.ctx.strokeStyle = INSIDE_COLOR;
	          this.ctx.beginPath();
	          this.ctx.arc(60, 60, 30, 0, 0.5 * Math.PI, true);
	          this.ctx.lineWidth = 20;
	          this.ctx.stroke();
	
	          this.ctx.strokeStyle = BORDER_COLOR;
	
	          this.ctx.beginPath();
	          this.ctx.arc(60, 60, 18, 0, 0.5 * Math.PI, true);
	          this.ctx.lineWidth = 5;
	          this.ctx.stroke();
	
	          this.ctx.beginPath();
	          this.ctx.arc(60, 60, 41, 0, 0.5 * Math.PI, true);
	          this.ctx.lineWidth = 5;
	          this.ctx.stroke();
	          this.possible = ["right", "bottom"];
	          return;
	        case 7:
	          this.ctx.beginPath();
	          this.ctx.strokeStyle = BORDER_COLOR;
	          this.ctx.lineWidth = 5;
	
	          this.ctx.moveTo(0, 18);
	          this.ctx.lineTo(60, 18);
	          this.ctx.moveTo(0, 41);
	          this.ctx.lineTo(60, 41);
	          this.ctx.stroke();
	          this.ctx.closePath();
	
	          this.ctx.beginPath();
	          this.ctx.strokeStyle = BORDER_COLOR;
	          this.ctx.lineWidth = 5;
	          this.ctx.moveTo(18, 0);
	          this.ctx.lineTo(18, 60);
	          this.ctx.moveTo(41, 0);
	          this.ctx.lineTo(41, 60);
	          this.ctx.stroke();
	
	          this.ctx.closePath();
	          this.ctx.beginPath();
	          this.ctx.rect(20, 0, 18, 60);
	          this.ctx.fillStyle = INSIDE_COLOR;
	          this.ctx.fill();
	          this.ctx.closePath();
	
	          this.ctx.beginPath();
	          this.ctx.rect(0, 20, 60, 18);
	          this.ctx.fillStyle = INSIDE_COLOR;
	          this.ctx.fill();
	          this.ctx.closePath();
	          this.possible = ["left", "top", "right", "bottom"];
	      }
	    }
	  }, {
	    key: "generateRandomPipe",
	    value: function generateRandomPipe() {
	      var rand = Math.floor(Math.random() * 7 + 1);
	      this.canvas.setAttribute("type", rand);
	      console.log(rand);
	      this.drawPipe(rand);
	    }
	  }]);
	
	  return Space;
	}();
	
	exports.default = Space;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map