import Space from './space.js';
const SLUDGE_COLOR = "#7AF679";

class Game {
  constructor(levels){
    this.levels = levels;
    this.sludge = document.getElementById('sludge');
    this.scoreElement = document.getElementById('score');
    this.counter = document.getElementById('counter-text');
    this._setInitialValues();
    this._reset();
  }

  startGame(){
    this._reset();
    this.counter.innerHTML = 'Start placing Tiles NOW!';
    this.countDownId = window.setInterval(this._countDown.bind(this), 1000);
    this.playing = true;
  }

  fastForward(){
    let newSpeed;
    if (!this.fast) {
      newSpeed = 3;
      this.fast = true;
      this.multiplier = (this.currentLevelInt + 1) * 2;
    } else {
      newSpeed = this.currentLevel.difficulty * 2;
      this.fast = false;
      this.multiplier = this.currentLevelInt + 1;
    }
    this.spaces.forEach((row) => {
      row.forEach((space) => {
        space.speed = newSpeed;
      });
    });
  }

  _setInitialValues(){
    this.currentLevelInt = 0;
    this.totalScore = 0;
    this.highScore = 0;
    this.nextFillPipe = {
      right: {exit: "left", diff: [0, 1], spill:[0, -30]},
      left: {exit: "right", diff: [0, -1], spill:[-60, -30]},
      top: {exit: "bottom", diff: [-1, 0], spill:[-30, -60]},
      bottom: {exit: "top", diff: [1, 0], spill:[-30, 0]},
    };
  }

  _reset(){
    this._resetLevelOptions();
    this._resetHTML();
    this._resetSludge();
    this._resetGrid();
    this._setupGrid();
    this._generateSpaces();
    this._generateSideTiles();
  }

  _resetLevelOptions(){
    this.fast = false;
    this.score = 0;
    this.currentLevel = this.levels[this.currentLevelInt];
    this.multiplier = this.currentLevelInt + 1;
    this.difficulty = this.currentLevel.difficulty;
    this.playing = false;
  }

  _resetHTML(){
    document.getElementById('level').innerHTML = `Level ${this.currentLevelInt + 1}`;
    document.getElementById('spaces').innerHTML = '';
    document.getElementById('side-tiles').innerHTML = '';
    document.getElementById('high-score').innerHTML = `HS: ${this.highScore}`;
    this.scoreElement.innerHTML = `Score: ${this.totalScore}`;
  }

  _resetSludge(){
    this.sludge.getContext('2d').clearRect(0, 0, this.sludge.width, this.sludge.height);
    this.sludge.style.top = 0;
    this.sludge.style.left = 0;
    this.currSpill = 0;
  }

  _resetGrid(){
    this.spaces = [];
    this.options = [];
    this.grid = [];
  }

  _setupGrid(){
    for (let i = 0; i < 7; i++){
      let row = [];
      for (let j = 0; j < 10; j++){
        row.push({});
      }
      this.grid.push(row);
    }
  }

  _generateSpaces(){
    const fill = this._fillNextPipe.bind(this);
    const complete = this._completeLevel.bind(this);

    const cellSettings = {
      1: { name: "start", click: this._handleClick.bind(this), fill: fill  },
      2: { name: "end", click: this._handleClick.bind(this), fill: complete },
      3: { name: "barrier", click: null, fill: fill },
      0: { name: "tile", click: this._handleClick.bind(this), fill: fill }
    };
    this.currentLevel.grid.forEach((row, i)=>{
      const spaces = document.getElementById("spaces");
      let newRow = [];
      row.forEach((cell, j)=>{
        let space = new Space([i,j], spaces, cellSettings[cell].name, cellSettings[cell].click, cellSettings[cell].fill, this.difficulty);
        space.createCanvas();
        newRow.push(space);
        if (cell === 1){
          this._setupStart(space);
        } else if (cell === 2) {
          this._setupExit(space);
          this.grid[i][j] = this.end;
        }
      });
      this.spaces.push(newRow);
    });
  }

  _setupStart(space){
    this.start = space;
    this.currentSludgeSpace = this.start;
    this.currentSludgeSpace.exit = 'right';
    this.start.type = 8;
    this.start.drawPipe(this.start.type);
  }

  _setupExit(space){
    this.end = space;
    this.end.exit = 'right';
    this.end.type = 9;
    this.end.drawPipe(this.end.type);
  }

  _generateSideTiles(){
    const spaces = document.getElementById("side-tiles");
    for (let i = 1; i < 6 ; i++ ){
      let option = new Space([0,0], spaces, "option", null, this._fillNextPipe.bind(this), this.difficulty);
      option.createCanvas();
      option.generateRandomPipe();
      option.canvas.style.top = 61 * (i - 1);
      this.options.push(option);
    }
  }

  _countDown(){
    const newNum = parseInt(this.counter.innerHTML) - 1;
    if (isNaN(newNum)){
      this.counter.innerHTML = `4`;
      return;
    }
    if (newNum === 0) {
      window.clearInterval(this.countDownId);
      this.counter.setAttribute('class', 'hidden');

      this.start.animate(this.currentSludgeSpace.exit);
      this.playing = true;
    }
    this.counter.innerHTML = `${newNum}`;

  }

  _completeLevel(){
    document.getElementById('menu').setAttribute('class', 'menu-enter');
    document.getElementById('main').setAttribute('class', 'opacity-low');
    document.getElementById('sludge').setAttribute('class', 'opacity-medium');
    this.counter.setAttribute('class', '');
    this.counter.innerHTML = '';
    this.totalScore += this.score;
    if (this.currentLevelInt < this.levels.length - 1){
      document.getElementById('message').innerHTML = `Congrats you beat level ${this.currentLevelInt + 1} with a score of ${this.score}!`;
      this.currentLevelInt ++;
    } else {
      document.getElementById('message').innerHTML = `Congrats you beat the game with a score of ${this.totalScore}!`;
      this.currentLevelInt = 0;
      if (this.totalScore > this.highScore){
        this.highScore = this.totalScore;
      }
      this.totalScore = 0;
    }
  }

  _handleClickMove(){
    this.options.forEach((option) => {
      var pos = 0;
      var id = setInterval(frame, 1);
      function frame() {
        if (pos === 61) {
            clearInterval(id);
        } else {
            pos++;
            const str = option.canvas.style;
            const sub = parseInt(str.top.substring(0,str.top.length - 2));
            option.canvas.style.top = sub + 1;
        }
      }
    });
  }

  _handleClick(space, delayed, e){
    e.preventDefault();
    if (this.playing && !space.locked){
      this._whiteOutPipe(space);
      const type = this._createNewTile();
      setTimeout(()=>{
        this._drawNewPipe(space, type);
      }, 100);
    }
  }

  _drawNewPipe(space, type){
    const row = space.x;
    const col = space.y;

    space.drawPipe(type);
    space.canvas.setAttribute('class', 'tile');
    space.type = type;
    const posInGrid = this.grid[row][col];
    posInGrid.pos = {x:row, y:col};
    posInGrid.possible = space.possible;
    posInGrid.exit = space.exits;
  }

  _whiteOutPipe(space){
    space.canvas.style.pointerEvents = 'none';
    space.canvas.className = '';
    space.canvas.style.visibility = 'hidden';
    space.ctx.fillStyle = "#f4f4f4";
    space.ctx.fillRect(0, 0, space.canvas.width, space.canvas.height);
    space.canvas.style.pointerEvents = 'auto';

    if (space.type > 0 && this.score > 0){
      this.score -= this.multiplier;
      this.scoreElement.innerHTML = `Score: ${this.score}`;
    }
  }

  _createNewTile(){
    const option = this.options[this.options.length - 1].canvas;
    const type = parseInt(option.getAttribute('type'));
    const spaces = document.getElementById("side-tiles");
    const newOption = new Space([0,0], null, "option", null, this._fillNextPipe.bind(this), this.difficulty );
    newOption.createCanvas();
    newOption.generateRandomPipe();
    newOption.canvas.style.top = -61;
    this.options.unshift(newOption);

    const sideTiles = document.getElementById("side-tiles");
    sideTiles.insertBefore(newOption.canvas, sideTiles.childNodes[0]);

    option.parentElement.removeChild(option);
    this.options.pop();
    this._handleClickMove();

    return type;
  }

  _spillSludge(){
    let ctx = this.sludge.getContext('2d');
    ctx.beginPath();
    ctx.arc(60, 60, this.currSpill, 0, 2 * Math.PI, true);
    ctx.fillStyle = SLUDGE_COLOR;
    ctx.fill();
    ctx.closePath();
    this.currSpill ++;
    if (this.currSpill < 30){
      requestAnimationFrame(this._spillSludge.bind(this));
    } else{
      this.gameOver();
    }
  }

  _fillNextPipe(){
    const fillSettings = this.nextFillPipe[this.currentSludgeSpace.exit];
    const newX = this.currentSludgeSpace.x + fillSettings.diff[0];
    const newY = this.currentSludgeSpace.y + fillSettings.diff[1];
    const nextPipe = this.grid[newX][newY];

    if (nextPipe === this.end){
      this.end.animate('right');
      this.score += this.multiplier;
      this.scoreElement.innerHTML = `Score: ${this.score}`;
    } else if (nextPipe && nextPipe.possible && nextPipe.possible.includes(fillSettings.exit)){
      this.currentSludgeSpace = this.spaces[newX][newY];
      this.currentSludgeSpace.locked = true;
      this.score += this.multiplier;
      this.scoreElement.innerHTML = `Score: ${this.score}`;
      this.currentSludgeSpace.animate(this.currentSludgeSpace.exits[fillSettings.exit]);
      this.currentSludgeSpace.exit = this.currentSludgeSpace.exits[fillSettings.exit];
    } else{
      this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().left + fillSettings.spill[0] ;
      this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top + fillSettings.spill[1];
      this._spillSludge();
    }
  }

  /********************************     GAME OVER      ********************************/

  gameOver(){
    this._resetStyleOnGameOver();
    this._setScoreOnGameOver();
  }

  _resetStyleOnGameOver(){
    this.counter.innerHTML = '';
    document.getElementById('menu').setAttribute('class', 'menu-enter');
    document.getElementById('main').setAttribute('class', 'opacity-low');
    document.getElementById('sludge').setAttribute('class', 'opacity-medium');
    document.getElementById('counter-text').setAttribute('class', 'unselectable');
  }

  _setScoreOnGameOver(){
    this.totalScore += this.score;
    let newMessage = `Not quite your highscore, but your score was ${this.totalScore}!`;
    if (this.totalScore > this.highScore){
      this.highScore = this.totalScore;
      newMessage = `Congrats! You beat your highscore with ${this.totalScore} points!`;
    }
    document.getElementById('message').innerHTML = newMessage;
    this.totalScore = 0;
    this.currentLevelInt = 0;
  }
}
export default Game;
