console.log('loaded');
import Space from './space.js';

class Game {
  constructor(){
    this.spaces = [];
    this.options = [];
    this.points = [];
    this.grid = [];
    for (let i = 0; i < 7; i++){
      let row = [];
      for (let j = 0; j < 10; j++){
        row.push({});
      }
      this.grid.push(row);
    }
    window.grid = this.grid;

    // this.grid[3][0] = {type:'start', exit: "right", pos:{x:3, y:0}};
    this.difficulty = 0.5;
    for (let i = 0; i < 61; i++){
      this.points.push({x:i,y:213});
    }
  }

  start(){
    this.generateSpaces();
    this.generateSideTiles();
    window.setTimeout(this.start.animate.bind(this.start, this.currentSludgeSpace.exit), 1000 );
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
    e.preventDefault();
    if (!space.locked){
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

  fillNextPipe(){
    // debugger
    const y = this.currentSludgeSpace.y;
    const x = this.currentSludgeSpace.x;
    // debugger
    switch (this.currentSludgeSpace.exit){
      case 'right':
        // debugger
        if (this.grid[x][y + 1] && this.grid[x][y + 1].possible && this.grid[x][y + 1].possible.includes('left')){
           this.currentSludgeSpace = this.spaces[x][y+1];
           this.currentSludgeSpace.locked = true;
           this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.left);
           this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.left;
         } else{
           alert('you lose');
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
      // alert('you lose');
  }
}


const game =new Game();
game.start();
