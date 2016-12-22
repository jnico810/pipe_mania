import Space from './space.js';
const SLUDGE_COLOR = "#7AF679";



// const SLUDGE_COLOR = "red";
class Game {
  constructor(levels){
    this.levels = levels;
    this.currentLevelInt = 0;
    this.sludge = document.getElementById('sludge');
    this.scoreElement = document.getElementById('score');
    this.counter = document.getElementById('counter-text');
    this.totalScore = 0;
    this.highScore = 0;
    this.reset();
    this.nextFillPipe = {
      right: {exit: "left", diff: [0, 1], spill:[0, -30]},
      left: {exit: "right", diff: [0, -1], spill:[-60, -30]},
      top: {exit: "bottom", diff: [-1, 0], spill:[-30, -60]},
      bottom: {exit: "top", diff: [1, 0], spill:[-30, 0]},
    };
  }

  reset(){
    this.fast = false;
    this.score = 0;
    this.currentLevel = this.levels[this.currentLevelInt];
    document.getElementById('level').innerHTML = `Level ${this.currentLevelInt + 1}`;
    document.getElementById('spaces').innerHTML = '';
    document.getElementById('side-tiles').innerHTML = '';
    document.getElementById('high-score').innerHTML = `HS: ${this.highScore}`;

    this.multiplier = this.currentLevelInt + 1;
    this.scoreElement.innerHTML = `Score: ${this.totalScore}`;

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

  resetSludge(){
    this.sludge.getContext('2d').clearRect(0, 0, this.sludge.width, this.sludge.height);
    this.sludge.style.top = 0;
    this.sludge.style.left = 0;
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

  setupGrid(){
    for (let i = 0; i < 7; i++){
      let row = [];
      for (let j = 0; j < 10; j++){
        row.push({});
      }
      this.grid.push(row);
    }
  }

  startGame(){
    this.reset();
    this.counter.innerHTML = 'Start placing Tiles NOW!';
    this.countDownId = window.setInterval(this.countDown.bind(this), 1000);
    this.playing = true;
  }

  countDown(){
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
  completeLevel(){
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

  generateSpaces(){
    this.currentLevel.grid.forEach((row, i)=>{
      const spaces = document.getElementById("spaces");
      let space;
      let newRow = [];
      row.forEach((cell, j)=>{
        if (cell === 1){
          this.start = new Space([i,j], spaces, "start", this.handleClick.bind(this),this.fillNextPipe.bind(this), this.difficulty);
          this.start.createCanvas();
          this.currentSludgeSpace = this.start;
          this.currentSludgeSpace.exit = 'right';
          this.start.type = 8;
          this.start.drawPipe(this.start.type);
          newRow.push(this.start);
        } else if (cell === 2) {
          this.end = new Space([i,j], spaces, "end", this.handleClick.bind(this),this.completeLevel.bind(this), this.difficulty);
          this.end.createCanvas();
          this.end.exit = 'right';
          this.grid[i][j] = this.end;
          this.end.type = 9;
          this.end.drawPipe(this.end.type);
          newRow.push(this.end);
        } else if (cell === 3){
          space = new Space([i,j], spaces, "barrier", null, this.fillNextPipe.bind(this), this.difficulty);
          space.createCanvas();
          newRow.push(space);
        } else {
          space = new Space([i,j], spaces, "tile", this.handleClick.bind(this), this.fillNextPipe.bind(this), this.difficulty);
          space.createCanvas();
          newRow.push(space);
        }
      });
      this.spaces.push(newRow);
    });
  }

  generateSideTiles(){
    const spaces = document.getElementById("side-tiles");
    for (let i = 1; i < 6 ; i++ ){
      let option = new Space([0,0], spaces, "option", null, this.fillNextPipe.bind(this), this.difficulty);
      option.createCanvas();
      option.generateRandomPipe();
      option.canvas.style.top = 61 * (i - 1);
      this.options.push(option);
    }
  }

  handleClickMove(){
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

  handleClick(space, delayed, e){
    e.preventDefault();

    if (this.playing && !space.locked){
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
      //Clears rect
      const row = space.x;
      const col = space.y;

      const option = this.options[this.options.length - 1].canvas;
      const type = parseInt(option.getAttribute('type'));
      const spaces = document.getElementById("side-tiles");
      const newOption = new Space([0,0], null, "option", null, this.fillNextPipe.bind(this), this.difficulty );
      newOption.createCanvas();
      newOption.generateRandomPipe();
      newOption.canvas.style.top = -61;
      this.options.unshift(newOption);

      const sideTiles = document.getElementById("side-tiles");
      sideTiles.insertBefore(newOption.canvas, sideTiles.childNodes[0]);

      setTimeout(()=>{
        space.drawPipe(type);
        space.canvas.setAttribute('class', 'tile');
        space.type = type;
        const posInGrid = this.grid[row][col];
        posInGrid.pos = {x:row, y:col};
        posInGrid.possible = space.possible;
        posInGrid.exit = space.exits;
      }, 100);


      option.parentElement.removeChild(option);
      this.options.pop();
      this.handleClickMove();
    }
  }

  spillSludge(){
    let ctx = this.sludge.getContext('2d');
    ctx.beginPath();
    ctx.arc(60, 60, this.currSpill, 0, 2 * Math.PI, true);
    ctx.fillStyle = SLUDGE_COLOR;
    ctx.fill();
    ctx.closePath();
    this.currSpill ++;
    if (this.currSpill < 30){
      requestAnimationFrame(this.spillSludge.bind(this));
    } else{
      this.gameOver();
    }
  }

  gameOver(){
    this.totalScore += this.score;
    document.getElementById('menu').setAttribute('class', 'menu-enter');
    document.getElementById('main').setAttribute('class', 'opacity-low');
    document.getElementById('sludge').setAttribute('class', 'opacity-medium');
    this.counter.innerHTML = '';
    let newMessage = `Not quite your highscore, but your score was ${this.totalScore}!`;

    document.getElementById('counter-text').setAttribute('class', 'unselectable');
    if (this.totalScore > this.highScore){
      this.highScore = this.totalScore;
      newMessage = `Congrats! You beat your highscore with ${this.totalScore} points!`;
    }
    document.getElementById('message').innerHTML = newMessage;
    this.totalScore = 0;
    this.currentLevelInt = 0;
  }


  fillNextPipe(){
    const y = this.currentSludgeSpace.y;
    const x = this.currentSludgeSpace.x;

    let fillSettings = this.nextFillPipe[this.currentSludgeSpace.exit];
    let newX = x + fillSettings.diff[0];
    let newY = y + fillSettings.diff[1];

    // debugger
    if (this.grid[newX][newY] === this.end){
      this.end.animate('right');
      this.score += this.multiplier;
      this.scoreElement.innerHTML = `Score: ${this.score}`;
    } else if (this.grid[newX][newY] && this.grid[newX][newY].possible && this.grid[newX][newY].possible.includes(fillSettings.exit)){
      this.currentSludgeSpace = this.spaces[newX][newY];
      this.currentSludgeSpace.locked = true;
      this.score += this.multiplier;
      this.scoreElement.innerHTML = `Score: ${this.score}`;
      this.currentSludgeSpace.animate(this.currentSludgeSpace.exits[fillSettings.exit]);
      this.currentSludgeSpace.exit = this.currentSludgeSpace.exits[fillSettings.exit];
    } else{
      debugger
      this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().left + fillSettings.spill[0] ;
      this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top + fillSettings.spill[1];
      this.spillSludge();
    }

    // switch (this.currentSludgeSpace.exit){
    //   case 'right':
    //     if (this.grid[x][y + 1] === this.end){
    //       this.end.animate('right');
    //       this.score += this.multiplier;
    //       this.scoreElement.innerHTML = `Score: ${this.score}`;
    //     } else if (this.grid[x][y + 1] && this.grid[x][y + 1].possible && this.grid[x][y + 1].possible.includes('left')){
    //
    //        this.currentSludgeSpace = this.spaces[x][y+1];
    //        this.currentSludgeSpace.locked = true;
    //        this.score += this.multiplier;
    //        this.scoreElement.innerHTML = `Score: ${this.score}`;
    //        this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.left);
    //        this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.left;
    //      } else{
    //        this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().right - 60;
    //        this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top - 30;
    //        this.spillSludge();
    //      }
    //      return;
    //   case 'left':
    //     if (this.grid[x][y - 1] && this.grid[x][y - 1].possible && this.grid[x][y - 1].possible.includes('right')){
    //        this.currentSludgeSpace = this.spaces[x][y - 1];
    //        this.currentSludgeSpace.locked = true;
    //        this.score += this.multiplier;
    //        this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.right);
    //        this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.right;
    //        this.scoreElement.innerHTML = `Score: ${this.score}`;
    //      } else{
    //        this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().left - 60;
    //        this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top - 30;
    //        this.spillSludge();
    //      }
    //      return;
    //   case 'bottom':
    //     if (this.grid[x + 1] && this.grid[x + 1][y].possible && this.grid[x + 1][y].possible.includes('top')){
    //        this.currentSludgeSpace = this.spaces[x + 1][y];
    //        this.currentSludgeSpace.locked = true;
    //        this.score += this.multiplier;
    //        this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.top);
    //        this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.top;
    //        this.scoreElement.innerHTML = `Score: ${this.score}`;
    //      } else{
    //        this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().left - 30;
    //        this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top;
    //        this.spillSludge();
    //      }
    //      return;
    //   case 'top':
    //     if (this.grid[x - 1] && this.grid[x - 1][y].possible && this.grid[x - 1][y].possible.includes('bottom')){
    //       this.currentSludgeSpace = this.spaces[x - 1][y];
    //       this.currentSludgeSpace.locked = true;
    //       this.score += this.multiplier;
    //       this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.bottom);
    //       this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.bottom;
    //       this.scoreElement.innerHTML = `Score: ${this.score}`;
    //     } else{
    //       this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().left - 30;
    //       this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top - 60;
    //       this.spillSludge();
    //     }
    //     return;
    //   default:
    //     return;
    //   }
  }
}

export default Game;
