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
	    this.points = [];
	    this.grid = [];
	    for (var i = 0; i < 7; i++) {
	      var row = [];
	      for (var j = 0; j < 10; j++) {
	        row.push({});
	      }
	      this.grid.push(row);
	    }
	
	    // this.grid[3][0] = {type:'start', exit: "right", pos:{x:3, y:0}};
	
	    for (var _i = 0; _i < 61; _i++) {
	      this.points.push({ x: _i, y: 213 });
	    }
	  }
	
	  _createClass(Game, [{
	    key: 'start',
	    value: function start() {
	      this.generateSpaces();
	      this.generateSideTiles();
	      // debugger
	
	      window.setTimeout(this.start.animate.bind(this.start, this.currentSludgeSpace.exit), 1000);
	    }
	  }, {
	    key: 'generateSpaces',
	    value: function generateSpaces() {
	      for (var i = 0; i < 7; i++) {
	        var spaces = document.getElementById("spaces");
	        var space = void 0;
	        var row = [];
	        for (var j = 0; j < 10; j++) {
	          if (i === 3 && j === 3) {
	            this.start = new _space2.default([i, j], [i, j], spaces, "start", this.handleClick.bind(this), this.fillNextPipe.bind(this));
	            this.start.createCanvas();
	            this.currentSludgeSpace = this.start;
	            this.currentSludgeSpace.exit = 'bottom';
	            this.start.type = 1;
	            this.start.drawPipe(1);
	            row.push(this.start);
	          } else {
	            space = new _space2.default([i, j], [i, j], spaces, "tile", this.handleClick.bind(this), this.fillNextPipe.bind(this));
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
	        var option = new _space2.default([0, 0], i + 'choice', spaces, "option", null, this.fillNextPipe.bind(this));
	        option.createCanvas();
	        option.generateRandomPipe();
	        // option.animate('right');
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
	      space.ctx.fillStyle = "#f4f4f4";
	      space.ctx.fillRect(0, 0, space.canvas.width, space.canvas.height);
	
	      var row = space.canvas.getAttribute('row');
	      var col = space.canvas.getAttribute('col');
	
	      var option = this.options[this.options.length - 1].canvas;
	      var type = parseInt(option.getAttribute('type'));
	      var newOption = new _space2.default([0, 0], [row, col], null, "option", null, this.fillNextPipe.bind(this));
	      newOption.createCanvas();
	      newOption.generateRandomPipe();
	      newOption.canvas.style.top = -61;
	      this.options.unshift(newOption);
	
	      var sideTiles = document.getElementById("side-tiles");
	      sideTiles.insertBefore(newOption.canvas, sideTiles.childNodes[0]);
	
	      space.drawPipe(type);
	      space.type = type;
	
	      var posInGrid = this.grid[row][col];
	      posInGrid.pos = { x: row, y: col };
	      posInGrid.possible = space.possible;
	      posInGrid.exit = space.exits;
	      console.log(posInGrid);
	
	      option.parentElement.removeChild(option);
	      this.options.pop();
	      this.handleClickMove();
	    }
	  }, {
	    key: 'fillNextPipe',
	    value: function fillNextPipe() {
	      var y = this.currentSludgeSpace.y;
	      var x = this.currentSludgeSpace.x;
	      // debugger
	      switch (this.currentSludgeSpace.exit) {
	        case 'right':
	          debugger;
	          if (this.grid[x][y + 1].possible && this.grid[x][y + 1].possible.includes('left')) {
	            this.currentSludgeSpace = this.spaces[x][y + 1];
	            this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.left);
	            this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.left;
	          } else {
	            alert('you lose');
	          }
	          return;
	        case 'left':
	          if (this.grid[x][y - 1].possible && this.grid[x][y - 1].possible.includes('right')) {
	            this.currentSludgeSpace = this.spaces[x][y - 1];
	            this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.right);
	            this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.right;
	          } else {
	            alert('you lose');
	          }
	          return;
	        case 'bottom':
	          if (this.grid[x + 1][y].possible && this.grid[x + 1][y].possible.includes('top')) {
	            this.currentSludgeSpace = this.spaces[x + 1][y];
	            this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.top);
	            this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.top;
	          } else {
	            alert('you lose');
	          }
	          return;
	        case 'top':
	          if (this.grid[x - 1][y].possible && this.grid[x - 1][y].possible.includes('bottom')) {
	            this.currentSludgeSpace = this.spaces[x - 1][y];
	            this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.bottom);
	            this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.bottom;
	          } else {
	            alert('you lose');
	          }
	          return;
	        default:
	          return;
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	var game = new Game();
	game.start();
	
	// checkNextSpace(){
	//   const y = parseInt(this.currentSludgeSpace.pos.y);
	//   const x =  parseInt(this.currentSludgeSpace.pos.x);
	//   switch (this.currentSludgeSpace.exit){
	//     case 'right':
	//
	//       if (this.grid[x][y + 1].possible.includes('left')){
	//         for (let i = 0; i < 60; i++){
	//           this.points.push({x: i + 1 + this.times * 62,y:213});
	//         }
	//         this.times ++;
	//
	//         this.currentSludgeSpace = this.grid[x][y+1];
	//
	//         this.currentSludgeSpace['exit'] =  this.grid[x][y+1].exit.left;
	//         this.animateSludge();
	//       }
	//       return;
	//     default:
	//       return;
	//   }
	// }
	
	// animateSludge(){
	//   if(this.points.length > 4)
	//   { requestAnimationFrame(this.animateSludge.bind(this));
	//   } else{
	//     this.checkNextSpace();
	//   }
	//   let points = this.points;
	//   // draw a line segment from the last waypoint
	//   // to the current waypoint
	//   this.ctx.beginPath();
	//   this.ctx.lineWidth = 20;
	//   this.ctx.strokeStyle = 'green';
	//   this.ctx.moveTo(points[0].x,points[0].y);
	//   this.ctx.lineTo(points[1].x,points[1].y);
	//   this.ctx.stroke();
	//   this.points.shift();
	//   // increment "t" to get the next waypoint
	//   this.t++;
	// }

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
	  function Space(coord, rowCol, parent, klass, handleClick, handleFill) {
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
	    this.handleFill = handleFill;
	
	    this.endPercent = 60;
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
	
	      if (this.klass === "tile") {
	        canvas.addEventListener('click', this.handleClick.bind(null, this));
	      } else if (this.klass === "start") {}
	
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
	          this.exits = { top: "bottom", bottom: "top" };
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
	          this.exits = { left: "right", right: "left" };
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
	          this.exits = { left: "bottom", bottom: "left" };
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
	          this.exits = { right: "bottom", bottom: "right" };
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
	        default:
	          return false;
	      }
	    }
	  }, {
	    key: "animateVertical",
	    value: function animateVertical(direction) {
	      if (direction === 'bottom') {
	        this.ctx.beginPath();
	        this.ctx.rect(21, 0, 18, this.curPerc);
	        this.curPerc++;
	        this.ctx.fillStyle = 'green';
	        this.ctx.fill();
	        this.ctx.closePath();
	        if (this.curPerc < this.endPercent) {
	          {
	            requestAnimationFrame(this.animateVertical.bind(this, direction));
	          }
	        } else {
	          this.handleFill();
	        }
	      } else {
	        this.ctx.beginPath();
	        this.ctx.rect(21, this.curPerc, 18, this.endPercent - this.curPerc);
	        this.curPerc--;
	        this.ctx.fillStyle = 'green';
	        this.ctx.fill();
	        this.ctx.closePath();
	        if (this.curPerc !== 0) {
	          {
	            requestAnimationFrame(this.animateVertical.bind(this, direction));
	          }
	        } else {
	          this.handleFill();
	        }
	      }
	      return;
	    }
	  }, {
	    key: "animateHorizontal",
	    value: function animateHorizontal(direction) {
	      if (direction === 'right') {
	        this.ctx.beginPath();
	        this.ctx.rect(0, 20, this.curPerc, 18);
	        this.curPerc++;
	        this.ctx.fillStyle = 'green';
	        this.ctx.fill();
	        this.ctx.closePath();
	        if (this.curPerc < this.endPercent) {
	          {
	            requestAnimationFrame(this.animateHorizontal.bind(this, direction));
	          }
	        } else {
	          this.handleFill();
	        }
	      } else {
	        this.ctx.beginPath();
	        this.ctx.rect(this.curPerc, 20, this.endPercent - this.curPerc, 18);
	        this.curPerc--;
	        this.ctx.fillStyle = 'green';
	        this.ctx.fill();
	        this.ctx.closePath();
	        if (this.curPerc !== 0) {
	          {
	            requestAnimationFrame(this.animateHorizontal.bind(this, direction));
	          }
	        } else {
	          this.handleFill();
	          // debugger
	        }
	      }
	      return;
	    }
	  }, {
	    key: "animateType3",
	    value: function animateType3(direction) {
	      // debugger
	      if (direction === 'top') {
	        this.ctx.strokeStyle = 'green';
	        this.ctx.beginPath();
	        this.ctx.arc(0, 0, 30, 0.5 * Math.PI * this.curPerc / 100, 0.5 * Math.PI, false);
	        this.ctx.lineWidth = 20;
	        this.ctx.stroke();
	        this.curPerc--;
	        if (this.curPerc !== 0) {
	          {
	            requestAnimationFrame(this.animateType3.bind(this, direction));
	          }
	        } else {
	          this.handleFill();
	        }
	      } else {
	        this.ctx.strokeStyle = 'green';
	        this.ctx.beginPath();
	        this.ctx.arc(0, 0, 30, 0, this.curPerc / 100 * 0.5 * Math.PI, false);
	        this.ctx.lineWidth = 20;
	        this.ctx.stroke();
	        this.curPerc++;
	        if (this.curPerc < 100) {
	          {
	            requestAnimationFrame(this.animateType3.bind(this, direction));
	          }
	        } else {
	          this.handleFill();
	        }
	      }
	    }
	  }, {
	    key: "generateRandomPipe",
	    value: function generateRandomPipe() {
	      var rand = Math.floor(Math.random() * 3 + 1);
	      // rand = 3;
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