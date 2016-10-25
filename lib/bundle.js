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
	
	var level1 = {
	  grid: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
	  difficulty: 0.28
	};
	
	var level2 = {
	  grid: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 0, 0, 0], [0, 0, 0, 3, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 3, 0], [0, 0, 0, 0, 0, 0, 3, 0, 0, 0], [1, 0, 0, 0, 0, 0, 3, 0, 0, 2], [0, 0, 0, 0, 0, 0, 0, 3, 0, 0]],
	  difficulty: 0.32
	};
	
	var level3 = {
	  grid: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3, 0, 0, 0, 0, 0], [0, 0, 0, 3, 3, 3, 3, 0, 0, 0], [0, 0, 0, 2, 0, 0, 1, 0, 0, 0], [0, 0, 0, 3, 3, 3, 3, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
	  difficulty: 0.40
	};
	var levels = [];
	levels.push(level3, level2, level3);
	
	var game = new _game2.default(levels);
	
	document.getElementById('play').addEventListener('click', function () {
	  game.startGame();
	  document.getElementById('menu').setAttribute('class', 'hidden');
	  document.getElementById('main').setAttribute('class', '');
	  document.getElementById('sludge').setAttribute('class', '');
	});
	
	document.getElementById('fast').addEventListener('click', function () {
	  game.fastForward();
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
	
	var SLUDGE_COLOR = "#7AF679";
	// const SLUDGE_COLOR = "red";
	
	var Game = function () {
	  function Game(levels) {
	    _classCallCheck(this, Game);
	
	    this.levels = levels;
	    this.currentLevelInt = 0;
	    this.sludge = document.getElementById('sludge');
	    this.scoreElement = document.getElementById('score');
	    this.counter = document.getElementById('counter-text');
	    this.totalScore = 0;
	    this.highScore = 0;
	    this.reset();
	  }
	
	  _createClass(Game, [{
	    key: 'reset',
	    value: function reset() {
	      this.fast = false;
	      this.score = 0;
	      this.currentLevel = this.levels[this.currentLevelInt];
	      document.getElementById('level').innerHTML = 'Level ' + (this.currentLevelInt + 1);
	      document.getElementById('spaces').innerHTML = '';
	      document.getElementById('side-tiles').innerHTML = '';
	      document.getElementById('high-score').innerHTML = 'HS: ' + this.highScore;
	
	      this.multiplier = this.currentLevelInt + 1;
	      this.scoreElement.innerHTML = 'Score: ' + this.totalScore;
	
	      this.resetSludge();
	      this.spaces = [];
	      this.options = [];
	      this.grid = [];
	      this.difficulty = this.currentLevel.difficulty;
	      this.currSpill = 0;
	      this.playing = false;
	      this.setupGrid();
	      this.generateSpaces();
	      this.generateSideTiles();
	      window.spaces = this.spaces;
	      window.grid = this.grid;
	    }
	  }, {
	    key: 'resetSludge',
	    value: function resetSludge() {
	      this.sludge.getContext('2d').clearRect(0, 0, this.sludge.width, this.sludge.height);
	      this.sludge.style.top = 0;
	      this.sludge.style.left = 0;
	    }
	  }, {
	    key: 'fastForward',
	    value: function fastForward() {
	      var newSpeed = void 0;
	      if (!this.fast) {
	        newSpeed = 3;
	        this.fast = true;
	        this.multiplier = (this.currentLevelInt + 1) * 2;
	      } else {
	        newSpeed = this.currentLevel.difficulty * 2;
	        this.fast = false;
	        this.multiplier = this.currentLevelInt + 1;
	      }
	      this.spaces.forEach(function (row) {
	        row.forEach(function (space) {
	          space.speed = newSpeed;
	        });
	      });
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
	      this.counter.innerHTML = 'Start placing Tiles NOW!';
	      this.countDownId = window.setInterval(this.countDown.bind(this), 1000);
	      this.playing = true;
	    }
	  }, {
	    key: 'countDown',
	    value: function countDown() {
	      var newNum = parseInt(this.counter.innerHTML) - 1;
	      if (isNaN(newNum)) {
	        this.counter.innerHTML = '4';
	        return;
	      }
	      if (newNum === 0) {
	        window.clearInterval(this.countDownId);
	        this.counter.setAttribute('class', 'hidden');
	
	        this.start.animate(this.currentSludgeSpace.exit);
	        this.playing = true;
	      }
	      this.counter.innerHTML = '' + newNum;
	    }
	  }, {
	    key: 'completeLevel',
	    value: function completeLevel() {
	      document.getElementById('menu').setAttribute('class', '');
	      document.getElementById('main').setAttribute('class', 'opacity-low');
	      document.getElementById('sludge').setAttribute('class', 'opacity-medium');
	      document.getElementById('message').innerHTML = 'Congrats you beat level ' + (this.currentLevelInt + 1) + ' with a score of ' + this.score + '!';
	      this.counter.setAttribute('class', '');
	      this.currentLevelInt++;
	      this.totalScore += this.score;
	    }
	  }, {
	    key: 'generateSpaces',
	    value: function generateSpaces() {
	      var _this = this;
	
	      this.currentLevel.grid.forEach(function (row, i) {
	        var spaces = document.getElementById("spaces");
	        var space = void 0;
	        var newRow = [];
	        row.forEach(function (cell, j) {
	          if (cell === 1) {
	            _this.start = new _space2.default([i, j], spaces, "start", _this.handleClick.bind(_this), _this.fillNextPipe.bind(_this), _this.difficulty);
	            _this.start.createCanvas();
	            _this.currentSludgeSpace = _this.start;
	            _this.currentSludgeSpace.exit = 'right';
	            _this.start.type = 8;
	            _this.start.drawPipe(_this.start.type);
	            newRow.push(_this.start);
	          } else if (cell === 2) {
	            _this.end = new _space2.default([i, j], spaces, "end", _this.handleClick.bind(_this), _this.completeLevel.bind(_this), _this.difficulty);
	            _this.end.createCanvas();
	            _this.end.exit = 'right';
	            _this.grid[i][j] = _this.end;
	            _this.end.type = 9;
	            _this.end.drawPipe(_this.end.type);
	            newRow.push(_this.end);
	          } else if (cell === 3) {
	            space = new _space2.default([i, j], spaces, "barrier", null, _this.fillNextPipe.bind(_this), _this.difficulty);
	            space.createCanvas();
	            newRow.push(space);
	          } else {
	            space = new _space2.default([i, j], spaces, "tile", _this.handleClick.bind(_this), _this.fillNextPipe.bind(_this), _this.difficulty);
	            space.createCanvas();
	            newRow.push(space);
	          }
	        });
	        _this.spaces.push(newRow);
	      });
	    }
	  }, {
	    key: 'generateSideTiles',
	    value: function generateSideTiles() {
	      var spaces = document.getElementById("side-tiles");
	      for (var i = 1; i < 6; i++) {
	        var option = new _space2.default([0, 0], spaces, "option", null, this.fillNextPipe.bind(this), this.difficulty);
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
	    value: function handleClick(space, delayed, e) {
	      var _this2 = this;
	
	      space.canvas.style.pointerEvents = 'none';
	      e.preventDefault();
	      if (!space.locked && space.type > 0 && !delayed) {
	        // space.ctx.fillStyle = "#f4f4f4";
	        space.ctx.fillStyle = "#f4f4f4";
	        space.ctx.fillRect(0, 0, space.canvas.width, space.canvas.height);
	        // space.ctx.fillRect(0, 0, space.canvas.width, space.canvas.height);
	        setTimeout(this.handleClick.bind(this, space, true, e), 150);
	        return;
	      }
	      // debugger
	      space.ctx.fillStyle = "#f4f4f4";
	      space.ctx.fillRect(0, 0, space.canvas.width, space.canvas.height);
	      space.canvas.style.pointerEvents = 'auto';
	      if (this.playing && !space.locked) {
	        (function () {
	
	          //Clears rect
	          var row = space.x;
	          var col = space.y;
	
	          var option = _this2.options[_this2.options.length - 1].canvas;
	          var type = parseInt(option.getAttribute('type'));
	          var spaces = document.getElementById("side-tiles");
	          var newOption = new _space2.default([0, 0], null, "option", null, _this2.fillNextPipe.bind(_this2), _this2.difficulty);
	          newOption.createCanvas();
	          newOption.generateRandomPipe();
	          newOption.canvas.style.top = -61;
	          _this2.options.unshift(newOption);
	
	          var sideTiles = document.getElementById("side-tiles");
	          sideTiles.insertBefore(newOption.canvas, sideTiles.childNodes[0]);
	
	          setTimeout(function () {
	            space.drawPipe(type);
	            space.canvas.setAttribute('class', 'tile');
	            space.type = type;
	            var posInGrid = _this2.grid[row][col];
	            posInGrid.pos = { x: row, y: col };
	            posInGrid.possible = space.possible;
	            posInGrid.exit = space.exits;
	          }, 100);
	
	          option.parentElement.removeChild(option);
	          _this2.options.pop();
	          _this2.handleClickMove();
	        })();
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
	      this.totalScore += this.score;
	      document.getElementById('menu').setAttribute('class', '');
	      document.getElementById('main').setAttribute('class', 'opacity-low');
	      document.getElementById('sludge').setAttribute('class', 'opacity-medium');
	
	      var newMessage = 'Not quite your highscore, but your score was ' + this.totalScore + '!';
	
	      document.getElementById('counter-text').setAttribute('class', 'unselectable');
	      if (this.totalScore > this.highScore) {
	        this.highScore = this.totalScore;
	        newMessage = 'Congrats! You beat your highscore with ' + this.totalScore + ' points!';
	      }
	      document.getElementById('message').innerHTML = newMessage;
	      this.totalScore = 0;
	      this.currentLevelInt = 0;
	    }
	  }, {
	    key: 'fillNextPipe',
	    value: function fillNextPipe() {
	      var y = this.currentSludgeSpace.y;
	      var x = this.currentSludgeSpace.x;
	
	      switch (this.currentSludgeSpace.exit) {
	        case 'right':
	          if (this.grid[x][y + 1] === this.end) {
	            // debugger
	            this.end.animate('right');
	            this.score += this.multiplier;
	            this.scoreElement.innerHTML = 'Score: ' + this.score;
	          } else if (this.grid[x][y + 1] && this.grid[x][y + 1].possible && this.grid[x][y + 1].possible.includes('left')) {
	            this.currentSludgeSpace = this.spaces[x][y + 1];
	            this.currentSludgeSpace.locked = true;
	            this.score += this.multiplier;
	            this.scoreElement.innerHTML = 'Score: ' + this.score;
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
	            this.score += this.multiplier;
	            this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.right);
	            this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.right;
	            this.scoreElement.innerHTML = 'Score: ' + this.score;
	          } else {
	            this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().left - 60;
	            this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top - 30;
	            this.spillSludge();
	          }
	          return;
	        case 'bottom':
	          if (this.grid[x + 1] && this.grid[x + 1][y].possible && this.grid[x + 1][y].possible.includes('top')) {
	            this.currentSludgeSpace = this.spaces[x + 1][y];
	            this.currentSludgeSpace.locked = true;
	            this.score += this.multiplier;
	            this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.top);
	            this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.top;
	            this.scoreElement.innerHTML = 'Score: ' + this.score;
	          } else {
	            this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().left - 30;
	            this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top;
	            this.spillSludge();
	          }
	          return;
	        case 'top':
	          if (this.grid[x - 1] && this.grid[x - 1][y].possible && this.grid[x - 1][y].possible.includes('bottom')) {
	            this.currentSludgeSpace = this.spaces[x - 1][y];
	            this.currentSludgeSpace.locked = true;
	            this.score += this.multiplier;
	            this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.bottom);
	            this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.bottom;
	            this.scoreElement.innerHTML = 'Score: ' + this.score;
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
	
	var INSIDE_COLOR = "#E5F7FF";
	var BORDER_COLOR = "#6e9cb7";
	var SLUDGE_COLOR = "#7AF679";
	
	var Space = function () {
	  function Space(coord, parent, klass, handleClick, handleFill, difficulty) {
	    _classCallCheck(this, Space);
	
	    this.x = coord[0];
	    this.y = coord[1];
	    this.parent = parent;
	    this.klass = klass;
	    this.handleClick = handleClick;
	    this.handleFill = handleFill;
	    this.difficulty = difficulty;
	
	    this.possible = [];
	    this.exits = {};
	    this.type = 0;
	    this.locked = false;
	
	    this.setAttributes = this.setAttributes.bind(this);
	  }
	
	  _createClass(Space, [{
	    key: "createCanvas",
	    value: function createCanvas() {
	      var canvas = document.createElement("canvas");
	
	      canvas.setAttribute("width", "60px");
	      canvas.setAttribute("height", "60px");
	      canvas.setAttribute("class", this.klass);
	      canvas.setAttribute("row", "" + this.x);
	      canvas.setAttribute("col", "" + this.y);
	
	      this.canvas = canvas;
	      this.ctx = canvas.getContext('2d');
	
	      if (this.klass === "tile") {
	        this.drawPipe(0);
	        canvas.addEventListener('click', this.handleClick.bind(null, this, false));
	      }
	      if (this.parent) {
	        this.parent.appendChild(canvas);
	      }
	    }
	  }, {
	    key: "drawLineBorder",
	    value: function drawLineBorder(x, y) {
	      this.ctx.strokeStyle = BORDER_COLOR;
	      this.ctx.beginPath();
	      this.ctx.lineWidth = 5;
	      this.ctx.moveTo(x[0], y[0]);
	      this.ctx.lineTo(x[1], y[1]);
	      this.ctx.moveTo(x[2], y[2]);
	      this.ctx.lineTo(x[3], y[3]);
	      this.ctx.stroke();
	      this.ctx.closePath();
	    }
	  }, {
	    key: "drawInsideRect",
	    value: function drawInsideRect(x, y, width, height) {
	      this.ctx.beginPath();
	      this.ctx.fillStyle = INSIDE_COLOR;
	      this.ctx.rect(x, y, width, height);
	      this.ctx.fill();
	      this.ctx.closePath();
	    }
	  }, {
	    key: "setAttributes",
	    value: function setAttributes(options) {
	      this.possible = options.possible;
	      this.exits = options.exits;
	      this.endPercent = options.endPercent;
	      this.curPerc = options.curPerc;
	      this.speed = 2 * this.difficulty;
	      this.filled = false;
	    }
	  }, {
	    key: "drawArc",
	    value: function drawArc(x1, y1, radius, startAngle, endAngle, clockwise, width, color) {
	      this.ctx.strokeStyle = color;
	      this.ctx.beginPath();
	      this.ctx.arc(x1, y1, radius, startAngle, endAngle, clockwise);
	      this.ctx.lineWidth = width;
	      this.ctx.stroke();
	    }
	  }, {
	    key: "drawPipe",
	    value: function drawPipe(type) {
	      switch (type) {
	        case 0:
	          this.canvas.setAttribute("class", 'empty');
	          return;
	        case 1:
	          this.drawLineBorder([18, 18, 41, 41], [0, 60, 0, 60]);
	          this.drawInsideRect(20, 0, 18, 60);
	
	          this.setAttributes({
	            possible: ["top", "bottom"],
	            exits: { top: "bottom", bottom: "top" },
	            endPercent: 100,
	            curPerc: 0
	          });
	          return;
	        case 2:
	          this.drawLineBorder([0, 60, 0, 60], [19, 19, 41, 41]);
	          this.drawInsideRect(0, 21, 60, 17);
	          this.setAttributes({
	            possible: ["left", "right"],
	            exits: { left: "right", right: "left" },
	            endPercent: 100,
	            curPerc: 0
	          });
	          this.offSet = 0;
	          return;
	        case 3:
	          this.drawArc(0, 0, 30, 0, 0.5 * Math.PI, false, 20, INSIDE_COLOR);
	          this.drawArc(0, 0, 18, 0, 0.5 * Math.PI, false, 5, BORDER_COLOR);
	          this.drawArc(0, 0, 41, 0, 0.5 * Math.PI, false, 5, BORDER_COLOR);
	
	          this.setAttributes({
	            possible: ["left", "top"],
	            exits: { left: "top", top: "left" },
	            endPercent: 0,
	            curPerc: 100
	          });
	          return;
	        case 4:
	          this.drawArc(60, 0, 30, 0, 0.5 * Math.PI, true, 20, INSIDE_COLOR);
	          this.drawArc(60, 0, 18, 0, 0.5 * Math.PI, true, 5, BORDER_COLOR);
	          this.drawArc(60, 0, 41, 0, 0.5 * Math.PI, true, 5, BORDER_COLOR);
	
	          this.setAttributes({
	            possible: ["right", "top"],
	            exits: { right: "top", top: "right" },
	            endPercent: 0,
	            curPerc: 100
	          });
	          return;
	        case 5:
	          this.drawArc(0, 60, 30, 3 * Math.PI / 2, 0, false, 20, INSIDE_COLOR);
	          this.drawArc(0, 60, 19, 3 * Math.PI / 2, 0, false, 5, BORDER_COLOR);
	          this.drawArc(0, 60, 41, 3 * Math.PI / 2, 0, false, 5, BORDER_COLOR);
	
	          this.setAttributes({
	            possible: ["left", "bottom"],
	            exits: { left: "bottom", bottom: "left" },
	            endPercent: 99,
	            curPerc: 0
	          });
	          return;
	        case 6:
	          this.drawArc(60, 60, 30, 0, 0.5 * Math.PI, true, 20, INSIDE_COLOR);
	          this.drawArc(60, 60, 19, 0, 0.5 * Math.PI, true, 5, BORDER_COLOR);
	          this.drawArc(60, 60, 42, 0, 0.5 * Math.PI, true, 5, BORDER_COLOR);
	
	          this.setAttributes({
	            possible: ["right", "bottom"],
	            exits: { right: "bottom", bottom: "right" },
	            endPercent: 100,
	            curPerc: 0
	          });
	          return;
	        case 7:
	          this.drawLineBorder([0, 60, 0, 60], [19, 19, 41, 41]);
	
	          this.drawLineBorder([18, 18, 41, 41], [0, 60, 0, 60]);
	          this.drawInsideRect(20, 0, 18, 60);
	          this.drawInsideRect(0, 21, 60, 17);
	
	          this.setAttributes({
	            possible: ["left", "top", "right", "bottom"],
	            exits: { left: "right", right: "left", top: "bottom", bottom: "top" },
	            endPercent: 100,
	            curPerc: 0
	          });
	          this.offSet = 0;
	          return;
	        case 8:
	          this.drawInsideRect(0, 21, 60, 17);
	          this.drawLineBorder([0, 60, 0, 60], [19, 19, 41, 41]);
	
	          this.ctx.strokeStyle = BORDER_COLOR;
	          this.ctx.beginPath();
	          this.ctx.lineWidth = 30;
	          this.ctx.moveTo(2, 19);
	          this.ctx.lineTo(2, 40);
	          this.ctx.stroke();
	          this.ctx.closePath();
	
	          this.ctx.font = "18px copper";
	          this.ctx.fillText("S", 3, 36);
	
	          this.offSet = 17;
	          this.endPercent = 73;
	          this.curPerc = 0;
	          this.speed = 2 * this.difficulty;
	          return;
	        case 9:
	          this.drawInsideRect(0, 21, 60, 17);
	          this.drawLineBorder([0, 60, 0, 60], [19, 19, 41, 41]);
	
	          this.ctx.strokeStyle = BORDER_COLOR;
	          this.ctx.beginPath();
	          this.ctx.lineWidth = 30;
	          this.ctx.moveTo(58, 19);
	          this.ctx.lineTo(58, 40);
	          this.ctx.stroke();
	          this.ctx.closePath();
	
	          this.ctx.font = "18px copper";
	          this.ctx.fillText("E", 45, 37);
	
	          this.offSet = 0;
	          this.endPercent = 74;
	          this.curPerc = 0;
	          this.speed = 2 * this.difficulty;
	          return;
	        default:
	          return;
	
	      }
	    }
	  }, {
	    key: "animate",
	    value: function animate(direction) {
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
	        case 7:
	          if (direction === 'right' || direction === 'left') {
	            this.animateHorizontal(direction);
	          } else {
	            this.animateVertical(direction);
	          }
	          return;
	        case 8:
	          this.animateHorizontal(direction);
	          return;
	        case 9:
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
	        case 7:
	          if (direction === 'right' || direction === 'bottom') {
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
	          requestAnimationFrame(this.animateVertical.bind(this, direction));
	        } else if (this.curPerc >= this.endPercent && !this.filled) {
	          this.filled = true;
	          this.handleFill();
	          requestAnimationFrame(this.animateVertical.bind(this, direction));
	        } else {
	          this.curPerc = 0;
	          this.endPercent = 100;
	          this.filled = false;
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
	          requestAnimationFrame(this.animateVertical.bind(this, direction));
	        } else if (this.curPerc <= 0 && !this.filled) {
	          this.filled = true;
	          this.handleFill();
	          requestAnimationFrame(this.animateVertical.bind(this, direction));
	        } else {
	          this.curPerc = 0;
	          this.endPercent = 100;
	          this.filled = false;
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
	          requestAnimationFrame(this.animateHorizontal.bind(this, direction));
	        } else if (this.curPerc >= this.endPercent && !this.filled) {
	
	          this.handleFill();
	          this.filled = true;
	          requestAnimationFrame(this.animateHorizontal.bind(this, direction));
	        } else {
	          this.curPerc = 0;
	          this.endPercent = 100;
	          this.filled = false;
	          return;
	        }
	      } else {
	        this.ctx.beginPath();
	        this.ctx.rect(this.curPerc / 100 * 60, 21, 60 - this.curPerc / 100 * 60, 18);
	        this.curPerc = this.curPerc - this.speed;
	        this.ctx.fillStyle = SLUDGE_COLOR;
	        this.ctx.fill();
	        this.ctx.closePath();
	        if (this.curPerc > 0) {
	          requestAnimationFrame(this.animateHorizontal.bind(this, direction));
	        } else if (this.curPerc <= 0 && !this.filled) {
	          this.filled = true;
	          this.handleFill();
	          requestAnimationFrame(this.animateHorizontal.bind(this, direction));
	        } else {
	          this.curPerc = 0;
	          this.endPercent = 100;
	          this.filled = false;
	          return;
	        }
	      }
	      return;
	    }
	  }, {
	    key: "animateType3",
	    value: function animateType3(direction) {
	      if (direction === 'top') {
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(0, 0, 30, 0.5 * Math.PI * this.curPerc / 100, 0.5 * Math.PI, false);
	        this.ctx.lineWidth = 18;
	        this.ctx.stroke();
	        this.curPerc = this.curPerc - this.speed;
	        if (this.curPerc > 0) {
	          requestAnimationFrame(this.animateType3.bind(this, direction));
	        } else if (this.curPerc <= 0 && !this.filled) {
	          this.filled = true;
	          this.handleFill();
	          requestAnimationFrame(this.animateType3.bind(this, direction));
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
	          requestAnimationFrame(this.animateType3.bind(this, direction));
	        } else if (this.curPerc >= 100 && !this.filled) {
	          this.filled = true;
	          this.handleFill();
	          requestAnimationFrame(this.animateType3.bind(this, direction));
	        } else {
	          return;
	        }
	      }
	    }
	  }, {
	    key: "animateType4",
	    value: function animateType4(direction) {
	      if (direction === 'top') {
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(60, 0, 30, Math.PI / 2 + Math.PI / 2 * this.curPerc / 100, Math.PI / 2, true);
	        this.ctx.lineWidth = 18;
	        this.ctx.stroke();
	        this.curPerc = this.curPerc + this.speed;
	        if (this.curPerc < 100) {
	          requestAnimationFrame(this.animateType4.bind(this, direction));
	        } else if (this.curPerc >= 100 && !this.filled) {
	          this.filled = true;
	          this.handleFill();
	          requestAnimationFrame(this.animateType4.bind(this, direction));
	        } else {
	          return;
	        }
	      } else {
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(60, 0, 30, Math.PI, Math.PI / 2 + Math.PI / 2 * this.curPerc / 100, true);
	        this.ctx.lineWidth = 18;
	        this.ctx.stroke();
	        this.curPerc = this.curPerc - this.speed;
	        if (this.curPerc > 0) {
	          requestAnimationFrame(this.animateType4.bind(this, direction));
	        } else if (this.curPerc <= 0 && !this.filled) {
	          this.filled = true;
	          this.handleFill();
	          requestAnimationFrame(this.animateType4.bind(this, direction));
	        } else {
	          return;
	        }
	      }
	    }
	  }, {
	    key: "animateType5",
	    value: function animateType5(direction) {
	      if (direction === 'bottom') {
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(0, 60, 30, 3 * Math.PI / 2, 3 * Math.PI / 2 + 1 * Math.PI / 2 * this.curPerc / 100, false);
	        this.ctx.lineWidth = 18;
	        this.ctx.stroke();
	        this.curPerc = this.curPerc + this.speed;
	        if (this.curPerc < 100) {
	          requestAnimationFrame(this.animateType5.bind(this, direction));
	        } else if (this.curPerc >= 100 && !this.filled) {
	          this.filled = true;
	          this.handleFill();
	          requestAnimationFrame(this.animateType5.bind(this, direction));
	        } else {
	          return;
	        }
	      } else {
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(0, 60, 30, 0, 3 * Math.PI / 2 + Math.PI / 2 * this.curPerc / 100, true);
	        this.ctx.lineWidth = 18;
	        this.ctx.stroke();
	        this.curPerc = this.curPerc - this.speed;
	        if (this.curPerc > 0) {
	          requestAnimationFrame(this.animateType5.bind(this, direction));
	        } else if (this.curPerc <= 0 && !this.filled) {
	          this.filled = true;
	          this.handleFill();
	          requestAnimationFrame(this.animateType5.bind(this, direction));
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
	          requestAnimationFrame(this.animateType6.bind(this, direction));
	        } else if (this.curPerc >= 100 && !this.filled) {
	          this.filled = true;
	          this.handleFill();
	          requestAnimationFrame(this.animateType6.bind(this, direction));
	        } else {
	          return;
	        }
	      } else {
	        this.ctx.strokeStyle = SLUDGE_COLOR;
	        this.ctx.beginPath();
	        this.ctx.arc(60, 60, 30, 3 * Math.PI / 2, Math.PI + Math.PI / 2 * this.curPerc / 100, true);
	        this.ctx.lineWidth = 18;
	        this.ctx.stroke();
	        this.curPerc = this.curPerc - this.speed;
	        if (this.curPerc > 0) {
	          requestAnimationFrame(this.animateType6.bind(this, direction));
	        } else if (this.curPerc <= 0 && !this.filled) {
	          this.filled = true;
	          this.handleFill();
	          requestAnimationFrame(this.animateType6.bind(this, direction));
	        } else {
	          return;
	        }
	      }
	    }
	  }, {
	    key: "generateRandomPipe",
	    value: function generateRandomPipe() {
	      //0 - 100
	      // const randShape =  Math.floor((Math.random() * 101));
	      // let rand;
	      // if (randShape < 36){
	      //   rand = Math.floor((Math.random() * 2) + 1);
	      // } else{
	      //   rand = Math.floor((Math.random() * 5) + 3);
	      // }
	      var rand = Math.floor(Math.random() * 7 + 1);
	      // rand = 5;
	      this.type = rand;
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