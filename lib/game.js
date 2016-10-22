import Space from './space.js';
class Game {
  constructor(){
    this.reset();
    this.playing = false;
    this.sludge = document.getElementById('sludge');
    // this.ctx = this.sludge.getContext('2d');

    this.currSpill = 0;
    window.sludge = this.sludge;

    // this.ctx.canvas.width = '100px';
  }

  reset(){
    this.spaces = [];
    this.options = [];
    this.grid = [];
    this.difficulty = 0.5;
    this.setupGrid();
    this.generateSpaces();
    this.generateSideTiles();
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
    window.setTimeout(this.start.animate.bind(this.start, this.currentSludgeSpace.exit), 3000 );
    this.playing = true;
  }

  generateSpaces(){
    for (let i = 0; i < 7; i++ ){
      const spaces = document.getElementById("spaces");
      let space;
      let row = [];
      for (let j = 0; j < 10; j++ ){
        if (i === 3 && j === 0){
          this.start = new Space([i,j], [i,j], spaces, "start", this.handleClick.bind(this),this.fillNextPipe.bind(this), this.difficulty);
          this.start.createCanvas();
          this.currentSludgeSpace = this.start;
          this.currentSludgeSpace.exit = 'right';
          this.start.type = 8;
          this.start.drawPipe(this.start.type);
          row.push(this.start);
        }else {
          space = new Space([i,j], [i,j], spaces, "tile", this.handleClick.bind(this), this.fillNextPipe.bind(this), this.difficulty);
          space.createCanvas();
          row.push(space);
        }
      }
      this.spaces.push(row);
    }
  }

  generateSideTiles(){
    for (let i = 1; i < 6 ; i++ ){
      const spaces = document.getElementById("side-tiles");
      let option = new Space([0,0], `${i}choice`, spaces, "option", null, this.fillNextPipe.bind(this), this.difficulty);
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

  handleClick(space, e){
    // debugger
    e.preventDefault();
    if (this.playing && !space.locked){
      space.ctx.fillStyle = "#f4f4f4";
      space.ctx.fillRect(0, 0, space.canvas.width, space.canvas.height);

      let row = space.canvas.getAttribute('row');
      const col = space.canvas.getAttribute('col');

      const option = this.options[this.options.length - 1].canvas;
      const type = parseInt(option.getAttribute('type'));
      const newOption = new Space([0,0],[row,col], null, "option", null, this.fillNextPipe.bind(this), this.difficulty );
      newOption.createCanvas();
      newOption.generateRandomPipe();
      newOption.canvas.style.top = -61;
      this.options.unshift(newOption);

      const sideTiles = document.getElementById("side-tiles");
      sideTiles.insertBefore(newOption.canvas, sideTiles.childNodes[0]);

      space.drawPipe(type);
      space.canvas.setAttribute('class', 'tile');
      space.type = type;

      const posInGrid = this.grid[row][col];
      posInGrid.pos = {x:row, y:col};
      posInGrid.possible = space.possible;
      posInGrid.exit = space.exits;

      option.parentElement.removeChild(option);
      this.options.pop();
      this.handleClickMove();
    }
  }

  spillSludge(){
    let ctx = this.sludge.getContext('2d');
    ctx.beginPath();
    ctx.arc(30, 30, this.currSpill, 0, 2 * Math.PI, true);
    ctx.lineWidth = 5;
    ctx.fill();
    if
    requestAnimationFrame(this.animateHorizontal.bind(this, direction));
  }

  fillNextPipe(){

    const y = this.currentSludgeSpace.y;
    const x = this.currentSludgeSpace.x;

    switch (this.currentSludgeSpace.exit){
      case 'right':
        if (this.grid[x][y + 1] && this.grid[x][y + 1].possible && this.grid[x][y + 1].possible.includes('left')){
           this.currentSludgeSpace = this.spaces[x][y+1];
           this.currentSludgeSpace.locked = true;
           this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.left);
           this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.left;
         } else{
           this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().right - 60;
           this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top - 30;
           this.spillSludge();
         }
         return;
      case 'left':
        if (this.grid[x][y - 1] && this.grid[x][y - 1].possible && this.grid[x][y - 1].possible.includes('right')){
           this.currentSludgeSpace = this.spaces[x][y - 1];
           this.currentSludgeSpace.locked = true;
           this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.right);
           this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.right;
         } else{
           alert('you lose');
         }
         return;
      case 'bottom':
        if (this.grid[x + 1][y] && this.grid[x + 1][y].possible && this.grid[x + 1][y].possible.includes('top')){
           this.currentSludgeSpace = this.spaces[x + 1][y];
           this.currentSludgeSpace.locked = true;
           this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.top);
           this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.top;
         } else{
           alert('you lose');
         }
         return;
      case 'top':
        if (this.grid[x - 1][y] && this.grid[x - 1][y].possible && this.grid[x - 1][y].possible.includes('bottom')){
          this.currentSludgeSpace = this.spaces[x - 1][y];
          this.currentSludgeSpace.locked = true;
          this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.bottom);
          this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.bottom;
        } else{
          alert('you lose');
        }
        return;
      default:
        return;
      }
  }
}

export default Game;
