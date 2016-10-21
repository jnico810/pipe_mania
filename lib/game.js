console.log('loaded');
import Space from './space.js';

class Game {
  constructor(){
    this.spaces = [];
    this.options = [];

    this.canvas = document.getElementById("sludge");

    this.ctx = this.canvas.getContext('2d');
    this.t = 1;
    this.points = [];
    this.times = 1;


    this.grid = [];

    for (let i = 0; i < 7; i++){
      let row = [];
      for (let j = 0; j < 10; j++){
        row.push({});
      }
      this.grid.push(row);
    }
    this.grid[3][0] = {type:'start', exit: "right", pos:{x:3, y:0}};
    this.currentSludgeSpace = this.grid[3][0];
    for (let i = 0; i < 61; i++){
      this.points.push({x:i,y:213});
    }

    console.log(this.grid);
    // this.animateSludge();
  }

  start(){
    this.generateSpaces();
    this.generateSideTiles();
  }

  generateSpaces(){
    for (let i = 0; i < 7; i++ ){
      const spaces = document.getElementById("spaces");
      let space;
      for (let j = 0; j < 10; j++ ){
        if (i === 3 && j === 0){
          space = new Space([0,0], [i,j], spaces, "start", this.handleClick.bind(this), null);
        }else {
          space = new Space([0,0], [i,j], spaces, "tile", this.handleClick.bind(this), null);
        }
        space.createCanvas();
        this.spaces.push(space);
      }
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
    space.ctx.fillStyle = "#f4f4f4";
    space.ctx.fillRect(0, 0, space.canvas.width, space.canvas.height);

    let row = space.canvas.getAttribute('row');
    const col = space.canvas.getAttribute('col');

    const option = this.options[this.options.length - 1].canvas;
    const type = parseInt(option.getAttribute('type'));

    const newOption = new Space([0,0],[row,col], null, "option");
    newOption.createCanvas();
    newOption.generateRandomPipe();
    newOption.canvas.style.top = -61;
    this.options.unshift(newOption);

    const sideTiles = document.getElementById("side-tiles");
    sideTiles.insertBefore(newOption.canvas, sideTiles.childNodes[0]);

    space.drawPipe(type);


    const posInGrid = this.grid[row][col];
    posInGrid.pos = {x:row, y:col};
    posInGrid.possible = space.possible;
    posInGrid.exit = space.exits;
    console.log(posInGrid);

    option.parentElement.removeChild(option);
    this.options.pop();
    this.handleClickMove();
  }

  generateSideTiles(){
    for (let i = 1; i < 6 ; i++ ){
      const spaces = document.getElementById("side-tiles");
      let option = new Space([0,0], `${i}choice`, spaces, "option", null, null);
      option.createCanvas();
      option.generateRandomPipe();
      option.canvas.style.top = 61 * (i - 1);
      this.options.push(option);
    }
  }
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

  checkNextSpace(){
    debugger
  }

  animateSludge(){
    if(this.points.length > 4)
    { requestAnimationFrame(this.animateSludge.bind(this));
    } else{
      this.checkNextSpace();
    }
    let points = this.points;
    // draw a line segment from the last waypoint
    // to the current waypoint
    this.ctx.beginPath();
    this.ctx.lineWidth = 20;
    this.ctx.strokeStyle = 'green';
    this.ctx.moveTo(points[0].x,points[0].y);
    this.ctx.lineTo(points[1].x,points[1].y);
    this.ctx.stroke();
    this.points.shift();
    // increment "t" to get the next waypoint
    this.t++;
  }

  animateVertical(di){


  }
}

const game =new Game();
game.start();
