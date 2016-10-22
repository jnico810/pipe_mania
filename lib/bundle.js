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
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var game = new _game2.default();
	
	document.getElementById('play').addEventListener('click', function () {
	  game.startGame();
	  document.getElementById('menu').setAttribute('class', 'hidden');
	  document.getElementById('main').setAttribute('class', '');
	  document.getElementById('sludge').setAttribute('class', '');
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _space = __webpack_require__(2);
	
	var _space2 = _interopRequireDefault(_space);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// const SLUDGE_COLOR = "#7AF679";
	var SLUDGE_COLOR = "red";
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.sludge = document.getElementById('sludge');
	    this.reset();
	  }
	
	  _createClass(Game, [{
	    key: 'reset',
	    value: function reset() {
	      document.getElementById('spaces').innerHTML = '';
	      document.getElementById('side-tiles').innerHTML = '';
	      this.sludge.getContext('2d').clearRect(0, 0, this.sludge.width, this.sludge.height);
	      this.sludge.style.top = 0;
	      this.sludge.style.left = 0;
	      this.spaces = [];
	      this.options = [];
	      this.grid = [];
	      this.difficulty = 0.5;
	      this.currSpill = 0;
	      this.playing = false;
	      this.setupGrid();
	      this.generateSpaces();
	      this.generateSideTiles();
	    }
	  }, {
	    key: 'setupGrid',
	    value: function setupGrid() {
	      for (var i = 0; i < 7; i++) {
	        var row = [];
	        for (var j = 0; j < 10; j++) {
	          row.push({});
	        }
	        this.grid.push(row);
	      }
	    }
	  }, {
	    key: 'startGame',
	    value: function startGame() {
	      this.reset();
	      window.setTimeout(this.start.animate.bind(this.start, this.currentSludgeSpace.exit), 3000);
	      this.playing = true;
	    }
	  }, {
	    key: 'generateSpaces',
	    value: function generateSpaces() {
	      for (var i = 0; i < 7; i++) {
	        var spaces = document.getElementById("spaces");
	        var space = void 0;
	        var row = [];
	        for (var j = 0; j < 10; j++) {
	          if (i === 3 && j === 0) {
	            this.start = new _space2.default([i, j], [i, j], spaces, "start", this.handleClick.bind(this), this.fillNextPipe.bind(this), this.difficulty);
	            this.start.createCanvas();
	            this.currentSludgeSpace = this.start;
	            this.currentSludgeSpace.exit = 'right';
	            this.start.type = 8;
	            this.start.drawPipe(this.start.type);
	            row.push(this.start);
	          } else {
	            space = new _space2.default([i, j], [i, j], spaces, "tile", this.handleClick.bind(this), this.fillNextPipe.bind(this), this.difficulty);
	            space.createCanvas();
	            row.push(space);
	          }
	        }
	        this.spaces.push(row);
	      }
	    }
	  }, {
	    key: 'generateSideTiles',
	    value: function generateSideTiles() {
	      for (var i = 1; i < 6; i++) {
	        var spaces = document.getElementById("side-tiles");
	        var option = new _space2.default([0, 0], i + 'choice', spaces, "option", null, this.fillNextPipe.bind(this), this.difficulty);
	        option.createCanvas();
	        option.generateRandomPipe();
	        option.canvas.style.top = 61 * (i - 1);
	        this.options.push(option);
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
	      if (this.playing && !space.locked) {
	        space.ctx.fillStyle = "#f4f4f4";
	        space.ctx.fillRect(0, 0, space.canvas.width, space.canvas.height);
	
	        var row = space.canvas.getAttribute('row');
	        var col = space.canvas.getAttribute('col');
	
	        var option = this.options[this.options.length - 1].canvas;
	        var type = parseInt(option.getAttribute('type'));
	        var newOption = new _space2.default([0, 0], [row, col], null, "option", null, this.fillNextPipe.bind(this), this.difficulty);
	        newOption.createCanvas();
	        newOption.generateRandomPipe();
	        newOption.canvas.style.top = -61;
	        this.options.unshift(newOption);
	
	        var sideTiles = document.getElementById("side-tiles");
	        sideTiles.insertBefore(newOption.canvas, sideTiles.childNodes[0]);
	
	        space.drawPipe(type);
	        space.canvas.setAttribute('class', 'tile');
	        space.type = type;
	
	        var posInGrid = this.grid[row][col];
	        posInGrid.pos = { x: row, y: col };
	        posInGrid.possible = space.possible;
	        posInGrid.exit = space.exits;
	
	        option.parentElement.removeChild(option);
	        this.options.pop();
	        this.handleClickMove();
	      }
	    }
	  }, {
	    key: 'spillSludge',
	    value: function spillSludge() {
	      var ctx = this.sludge.getContext('2d');
	      ctx.beginPath();
	      ctx.arc(60, 60, this.currSpill, 0, 2 * Math.PI, true);
	      ctx.fillStyle = SLUDGE_COLOR;
	      ctx.fill();
	      ctx.closePath();
	      this.currSpill++;
	      if (this.currSpill < 30) {
	        requestAnimationFrame(this.spillSludge.bind(this));
	      } else {
	        this.gameOver();
	      }
	    }
	  }, {
	    key: 'gameOver',
	    value: function gameOver() {
	      document.getElementById('menu').setAttribute('class', '');
	      document.getElementById('main').setAttribute('class', 'opacity-low');
	      document.getElementById('sludge').setAttribute('class', 'opacity-medium');
	      document.getElementById('message').innerHTML = 'YOU LOSE MWHAHAHA!';
	    }
	  }, {
	    key: 'fillNextPipe',
	    value: function fillNextPipe() {
	
	      var y = this.currentSludgeSpace.y;
	      var x = this.currentSludgeSpace.x;
	
	      switch (this.currentSludgeSpace.exit) {
	        case 'right':
	          if (this.grid[x][y + 1] && this.grid[x][y + 1].possible && this.grid[x][y + 1].possible.includes('left')) {
	            this.currentSludgeSpace = this.spaces[x][y + 1];
	            this.currentSludgeSpace.locked = true;
	            this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.left);
	            this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.left;
	          } else {
	            this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().right - 60;
	            this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top - 30;
	            this.spillSludge();
	          }
	          return;
	        case 'left':
	          if (this.grid[x][y - 1] && this.grid[x][y - 1].possible && this.grid[x][y - 1].possible.includes('right')) {
	            this.currentSludgeSpace = this.spaces[x][y - 1];
	            this.currentSludgeSpace.locked = true;
	            this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.right);
	            this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.right;
	          } else {
	            this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().left - 60;
	            this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top - 30;
	            this.spillSludge();
	          }
	          return;
	        case 'bottom':
	          if (this.grid[x + 1][y] && this.grid[x + 1][y].possible && this.grid[x + 1][y].possible.includes('top')) {
	            this.currentSludgeSpace = this.spaces[x + 1][y];
	            this.currentSludgeSpace.locked = true;
	            this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.top);
	            this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.top;
	          } else {
	            this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().left - 30;
	            this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top;
	            this.spillSludge();
	          }
	          return;
	        case 'top':
	          if (this.grid[x - 1][y] && this.grid[x - 1][y].possible && this.grid[x - 1][y].possible.includes('bottom')) {
	            this.currentSludgeSpace = this.spaces[x - 1][y];
	            this.currentSludgeSpace.locked = true;
	            this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.bottom);
	            this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.bottom;
	          } else {
	            this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().left - 30;
	            this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top - 60;
	            this.spillSludge();
	          }
	          return;
	        default:
	          return;
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
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
	
	// const INSIDE_COLOR = "#E5F7FF";
	var INSIDE_COLOR = "white";
	// const BORDER_COLOR = "#6e9cb7";
	var BORDER_COLOR = "black";
	// const SLUDGE_COLOR = "#7AF679"
	var SIZE = 60;
	
	// const SLUDGE_COLOR = "#7AF679";
	var SLUDGE_COLOR = "red";
	
	var Space = function () {
	  function Space(coord, rowCol, parent, klass, handleClick, handleFill, difficulty) {
	    _classCallCheck(this, Space);
	
	    this.x = coord[0];
	    this.y = coord[1];
	    this.rowCol = rowCol;
	    this.parent = parent;
	    this.klass = klass;
	    this.canvas = null;
	    this.handleClick = handleClick;
	    this.possible = [];
	    this.exits = {};
	    this.type = 0;
	    this.locked = false;
	    this.handleFill = handleFill;
	    this.difficulty = difficulty;
	
	    this.endPercent = 61;
	    this.curPerc = 0;
	  }
	
	  _createClass(Space, [{
	    key: "createCanvas",
	    value: function createCanvas() {
	      var canvas = document.createElement("canvas");
	
	      canvas.setAttribute("width", "60px");
	      canvas.setAttribute("height", "60px");
	      canvas.setAttribute("class", this.klass);
	      canvas.setAttribute("row", "" + this.rowCol[0]);
	      canvas.setAttribute("col", "" + this.rowCol[1]);
	
	      this.canvas = canvas;
	      this.ctx = canvas.getContext('2d');
	
	      // this.gradient= this.ctx.createLinearGradient(0,0,170,0);
	      // this.gradient.addColorStop("0","#60EE5D");
	      // this.gradient.addColorStop("0.5","black");
	      // this.gradient.addColorStop("1","#60EE5D");
	      // this.gradient.addColorStop("1.0","red");
	      // SLUDGE_COLOR = this.gradient;
	
	      if (this.klass === "tile") {
	        this.drawPipe(0);
	        canvas.addEventListener('click', this.handleClick.bind(null, this));
	      } else if (this.klass === "start") {}
	
	      if (this.parent) {
	        this.parent.appendChild(canvas);
	      }
	    }
	  }, {
	    key: "drawPipe",
	    value: function drawPipe(type) {
	      switch (type) {
	        case 0:
	          this.canvas.setAttribute("class", 'empty');
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
	          this.exits = { top: "bottom", bottom: "top" };
	
	          this.endPercent = 100;
	          this.curPerc = 0;
	          this.speed = 2 * this.difficulty;
	          return;
	        case 2:
	          this.ctx.beginPath();
	          this.ctx.strokeStyle = BORDER_COLOR;
	          this.ctx.lineWidth = 5;
	          this.ctx.moveTo(0, 19);
	          this.ctx.lineTo(60, 19);
	          this.ctx.moveTo(0, 41);
	          this.ctx.lineTo(60, 41);
	          this.ctx.stroke();
	          this.ctx.closePath();
	
	          this.ctx.beginPath();
	          this.ctx.rect(0, 21, 60, 17);
	          this.ctx.fillStyle = INSIDE_COLOR;
	          this.ctx.fill();
	          this.ctx.closePath();
	          this.possible = ["left", "right"];
	          this.exits = { left: "right", right: "left" };
	          this.offSet = 0;
	          this.endPercent = 100;
	          this.curPerc = 0;
	          this.speed = 2 * this.difficulty;
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
	          this.exits = { left: "top", top: "left" };
	          this.curPerc = 100;
	          this.endPercent = 0;
	          this.speed = 2 * this.difficulty;
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
	          this.exits = { right: "top", top: "right" };
	
	          this.curPerc = 100;
	          this.endPercent = 0;
	          this.speed = 2 * this.difficulty;
	          return;
	        case 5:
	          this.ctx.strokeStyle = INSIDE_COLOR;
	          this.ctx.beginPath();
	          this.ctx.arc(0, 60, 30, 3 * Math.PI / 2, 0, false);
	          this.ctx.lineWidth = 20;
	          this.ctx.stroke();
	
	          this.ctx.strokeStyle = BORDER_COLOR;
	
	          this.ctx.beginPath();
	          this.ctx.arc(0, 60, 19, 3 * Math.PI / 2, 0, false);
	          this.ctx.lineWidth = 5;
	          this.ctx.stroke();
	
	          this.ctx.beginPath();
	          this.ctx.arc(0, 60, 41, 3 * Math.PI / 2, 0, false);
	          this.ctx.lineWidth = 5;
	          this.ctx.stroke();
	          this.possible = ["left", "bottom"];
	          this.exits = { left: "bottom", bottom: "left" };
	
	          this.curPerc = 0;
	          this.endPercent = 99;
	          this.speed = 2 * this.difficulty;
	          return;
	        case 6:
	          this.ctx.strokeStyle = INSIDE_COLOR;
	          this.ctx.beginPath();
	          this.ctx.arc(60, 60, 30, 0, 0.5 * Math.PI, true);
	          this.ctx.lineWidth = 20;
	          this.ctx.stroke();
	
	          this.ctx.strokeStyle = BORDER_COLOR;
	
	          this.ctx.beginPath();
	          this.ctx.arc(60, 60, 19, 0, 0.5 * Math.PI, true);
	          this.ctx.lineWidth = 5;
	          this.ctx.stroke();
	
	          this.ctx.beginPath();
	          this.ctx.arc(60, 60, 42, 0, 0.5 * Math.PI, true);
	          this.ctx.lineWidth = 5;
	          this.ctx.stroke();
	          this.possible = ["right", "bottom"];
	          this.exits = { right: "bottom", bottom: "right" };
	          this.curPerc = 0;
	          this.endPercent = 100;
	          this.speed = 2 * this.difficulty;
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
	          this.exits = { left: "right", right: "left", top: "bottom", bottom: "top" };
	          return;
	        case 8:
	          //Start
	          this.ctx.beginPath();
	          this.ctx.rect(0, 21, 60, 17);
	          this.ctx.fillStyle = INSIDE_COLOR;
	          this.ctx.fill();
	          this.ctx.closePath();
	
	          this.ctx.beginPath();
	          this.ctx.strokeStyle = BORDER_COLOR;
	          this.ctx.lineWidth = 5;
	          this.ctx.moveTo(0, 19);
	          this.ctx.lineTo(60, 19);
	          this.ctx.moveTo(0, 41);
	          this.ctx.lineTo(60, 41);
	          this.ctx.stroke();
	          this.ctx.closePath();
	
	          this.ctx.strokeStyle = BORDER_COLOR;
	          this.ctx.beginPath();
	          this.ctx.lineWidth = 30;
	          this.ctx.moveTo(2, 19);
	          this.ctx.lineTo(2, 40);
	          this.ctx.stroke();
	          this.ctx.closePath();
	
	          this.offSet = 17;
	          this.endPercent = 74;
	          this.curPerc = 0;
	          this.speed = 2 * this.difficulty;
	          return;
	        default:
	          return;
	
	      }
	    }
	    //1 is vertical, 2 is horizontal
	
	  }, {
	    key: "animate",
	    value: function animate(direction) {
	      // debugger
	      if (this.willFlip(direction)) {
	        this.curPerc = this.endPercent;
	      }
	      switch (this.type) {
	        case 1:
	          this.animateVertical(direction);
	          return;
	        case 2:
	          this.animateHorizontal(direction);
	          return;
	        case 3:
	          this.animateType3(direction);
	          return;
	        case 4:
	          this.animateType4(direction);
	          return;
	        case 5:
	          this.animateType5(direction);
	          return;
	        case 6:
	          this.animateType6(direction);
	          return;
	        case 8:
	          this.animateHorizontal(direction);
	          return;
	        default:
	          break;
	      }
	    }
	  }, {
	    key: "willFlip",
	    value: function willFlip(direction) {
	      switch (this.type) {
	        case 1:
	          if (direction === 'bottom') {
	            // debugger
	            return false;
	          } else {
	            return true;
	          }
	          break;
	        case 2:
	          if (direction === 'right') {
	            return false;
	          } else {
	            return true;
	          }
	          break;
	        case 3:
	          if (direction === 'top') {
	            return false;
	          } else {
	            return true;
	          }
	          break;
	        case 4:
	          if (direction === 'top') {
	            return true;
	          } else {
	            return false;
	          }
	          break;
	        case 5:
	          if (direction === 'bottom') {
	            return false;
	          } else {
	            return true;
	          }
	          break;
	        case 6:
	          if (direction === 'right') {
	            return false;
	          } else {
	            return true;
	          }
	          break;
	        default:
	          return false;
	      }
	    }
	  }, {
	    key: "animateVertical",
	    value: function animateVertical(direction) {
	      if (direction === 'bottom') {
	        this.ctx.beginPath();
	        this.ctx.rect(20, 0, 19, this.curPerc / 100 * 60);
	        this.curPerc = this.curPerc + this.speed;
	        this.ctx.fillStyle = SLUDGE_COLOR;
	        this.ctx.fill();
	        this.ctx.closePath();
	        if (this.curPerc < this.endPercent) {
	          {
	            requestAnimationFrame(this.animateVertical.bind(this, direction));
	          }
	        } else if (this.curPerc === this.endPercent) {
	          this.handleFill();
	          requestAnimationFrame(this.animateVertical.bind(this, direction));
	        } else if (this.curPerc === this.endPercent + 1) {
	          return;
	        }
	      } else {
	        this.ctx.beginPath();
	        this.ctx.rect(20, this.curPerc / 100 * 60, 19, 60 - this.curPerc / 100 * 60);
	        this.curPerc = this.curPerc - this.speed;
	        this.ctx.fillStyle = SLUDGE_COLOR;
	        this.ctx.fill();
	        this.ctx.closePath();
	        if (this.curPerc > 0) {
	          {
	            requestAnimationFrame(this.animateVertical.bind(this, direction));
	          }
	        } else if (this.curPerc === 0) {
	          this.handleFill();
	          requestAnimationFrame(this.animateVertical.bind(this, direction));
	        } else if (this.curPerc === -1) {
	          return;
	        }
	      }
	      return;
	    }
	  }, {
	    key: "animateHorizontal",
	    value: function animateHorizontal(direction) {
	      if (direction === 'right') {
	        this.ctx.beginPath();
	        this.ctx.rect(this.offSet, 21, this.curPerc / 100 * 60, 18);
	        this.curPerc = this.curPerc + this.speed;
	        this.ctx.fillStyle = SLUDGE_COLOR;
	        this.ctx.fill();
	        this.ctx.closePath();
	        if (this.curPerc < this.endPercent) {
	          {
	            requestAnimationFrame(this.animateHorizontal.bind(this, direction));
	          }
	        } else if (this.curPerc === this.endPercent) {
	          this.handleFill();
	          requestAnimationFrame(this.animateHorizontal.bind(this, direction));
	        } else if (this.curPerc === this.endPercent + 1) {
	          return;
	        }
	      } else {
	        this.ctx.beginPath();
	        // debugger
	        this.ctx.rect(this.curPerc / 100 * 60, 21, 60 - this.curPerc / 100 * 60, 18);
	        this.curPerc = this.curPerc - this.speed;
	        this.ctx.fillStyle = SLUDGE_COLOR;
	        this.ctx.fill();
	        this.ctx.closePath();
	        if (this.curPerc > 0) {
	          {
	            requestAnimationFrame(this.animateHorizontal.bind(this, direction));
	          }
	        } else if (this.curPerc === 0) {
	          this.handleFill();
	          requestAnimationFrame(this.animateHorizontal.bind(this, direction));
	        } else if (this.curPerc === -1) {
	          return;
	        }
	      }
	      return;
	    }
	  }, {
	    key: "animateType3",
	    value: function animateType3(direction) {
	      // debugger
	      if (direction === 'top') {
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(0, 0, 30, 0.5 * Math.PI * this.curPerc / 100, 0.5 * Math.PI, false);
	        this.ctx.lineWidth = 18;
	        this.ctx.stroke();
	        this.curPerc = this.curPerc - this.speed;
	        if (this.curPerc > 0) {
	          {
	            requestAnimationFrame(this.animateType3.bind(this, direction));
	          }
	        } else if (this.curPerc === 0) {
	          this.handleFill();
	          {
	            requestAnimationFrame(this.animateType3.bind(this, direction));
	          }
	        } else {
	          return;
	        }
	      } else {
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(0, 0, 30, 0, this.curPerc / 100 * 0.5 * Math.PI, false);
	        this.ctx.lineWidth = 18;
	        this.ctx.stroke();
	        this.curPerc = this.curPerc + this.speed;
	        if (this.curPerc < 100) {
	          {
	            requestAnimationFrame(this.animateType3.bind(this, direction));
	          }
	        } else if (this.curPerc === 100) {
	          this.handleFill();
	          {
	            requestAnimationFrame(this.animateType3.bind(this, direction));
	          }
	        } else {
	          return;
	        }
	      }
	    }
	  }, {
	    key: "animateType4",
	    value: function animateType4(direction) {
	      // debugger
	      if (direction === 'top') {
	        // debugger
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(60, 0, 30, Math.PI / 2 + Math.PI / 2 * this.curPerc / 100, Math.PI / 2, true);
	        this.ctx.lineWidth = 18;
	        this.ctx.stroke();
	        this.curPerc = this.curPerc + this.speed;
	        if (this.curPerc < 100) {
	          {
	            requestAnimationFrame(this.animateType4.bind(this, direction));
	          }
	        } else if (this.curPerc === 100) {
	          this.handleFill();
	          {
	            requestAnimationFrame(this.animateType4.bind(this, direction));
	          }
	        } else {
	          return;
	        }
	      } else {
	        // debugger
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(60, 0, 30, Math.PI, Math.PI / 2 + Math.PI / 2 * this.curPerc / 100, true);
	        this.ctx.lineWidth = 18;
	
	        this.ctx.stroke();
	        this.curPerc = this.curPerc - this.speed;
	        if (this.curPerc > 0) {
	          {
	            requestAnimationFrame(this.animateType4.bind(this, direction));
	          }
	        } else if (this.curPerc === 0) {
	          this.handleFill();
	          {
	            requestAnimationFrame(this.animateType4.bind(this, direction));
	          }
	        } else {
	          return;
	        }
	      }
	    }
	  }, {
	    key: "animateType5",
	    value: function animateType5(direction) {
	
	      if (direction === 'bottom') {
	
	        // debugger;
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(0, 60, 30, 3 * Math.PI / 2, 3 * Math.PI / 2 + 1 * Math.PI / 2 * this.curPerc / 100, false);
	        this.ctx.lineWidth = 18;
	        this.ctx.stroke();
	
	        this.curPerc = this.curPerc + this.speed;
	        if (this.curPerc < 100) {
	          {
	            requestAnimationFrame(this.animateType5.bind(this, direction));
	          }
	        } else if (this.curPerc === 100) {
	          this.handleFill();
	          {
	            requestAnimationFrame(this.animateType5.bind(this, direction));
	          }
	        } else {
	          return;
	        }
	      } else {
	        // debugger
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(0, 60, 30, 0, 3 * Math.PI / 2 + Math.PI / 2 * this.curPerc / 100, true);
	        this.ctx.lineWidth = 18;
	
	        this.ctx.stroke();
	        this.curPerc = this.curPerc - this.speed;
	        if (this.curPerc > 0) {
	          {
	            requestAnimationFrame(this.animateType5.bind(this, direction));
	          }
	        } else if (this.curPerc === 0) {
	          this.handleFill();
	          {
	            requestAnimationFrame(this.animateType5.bind(this, direction));
	          }
	        } else {
	          return;
	        }
	      }
	    }
	  }, {
	    key: "animateType6",
	    value: function animateType6(direction) {
	
	      if (direction === 'right') {
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(60, 60, 30, Math.PI, Math.PI + Math.PI / 2 * this.curPerc / 100, false);
	        this.ctx.lineWidth = 18;
	        this.ctx.stroke();
	
	        this.curPerc = this.curPerc + this.speed;
	        if (this.curPerc < 100) {
	          {
	            requestAnimationFrame(this.animateType6.bind(this, direction));
	          }
	        } else if (this.curPerc === 100) {
	          this.handleFill();
	          {
	            requestAnimationFrame(this.animateType6.bind(this, direction));
	          }
	        } else {
	          return;
	        }
	      } else {
	        // debugger
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(60, 60, 30, 3 * Math.PI / 2, Math.PI + Math.PI / 2 * this.curPerc / 100, true);
	        this.ctx.lineWidth = 18;
	
	        this.ctx.stroke();
	        this.curPerc = this.curPerc - this.speed;
	        if (this.curPerc > 0) {
	          {
	            requestAnimationFrame(this.animateType6.bind(this, direction));
	          }
	        } else if (this.curPerc === 0) {
	          this.handleFill();
	          {
	            requestAnimationFrame(this.animateType6.bind(this, direction));
	          }
	        } else {
	          return;
	        }
	      }
	    }
	  }, {
	    key: "generateRandomPipe",
	    value: function generateRandomPipe() {
	      var rand = Math.floor(Math.random() * 6 + 1);
	      // rand = 6;
	      this.type = rand;
	      this.canvas.setAttribute("type", rand);
	      // console.log(rand);
	      this.drawPipe(rand);
	    }
	  }]);
	
	  return Space;
	}();
	
	exports.default = Space;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map