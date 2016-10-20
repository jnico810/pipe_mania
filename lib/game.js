console.log('loaded');
import Space from './space.js';

class Game {
  constructor(){
    this.spaces = [];
    this.options = [];
  }

  start(){
    this.generateSpaces();
    this.generateSideTiles();
  }

  generateSpaces(){
    for (let i = 1; i < 71; i++ ){
      const spaces = document.getElementById("spaces");
      const space = new Space([0,0], i, spaces, "tile", this.handleClick.bind(this));
      space.createCanvas();
      this.spaces.push(space);
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

    const option = this.options[this.options.length - 1].canvas;
    const type = parseInt(option.getAttribute('type'));

    const newOption = new Space([0,0], option.getAttribute('id'), null, "option");
    newOption.createCanvas();
    newOption.generateRandomPipe();
    newOption.canvas.style.top = -61;
    this.options.unshift(newOption);

    const sideTiles = document.getElementById("side-tiles");
    sideTiles.insertBefore(newOption.canvas, sideTiles.childNodes[0]);

    space.drawPipe(type);
    option.parentElement.removeChild(option);
    this.options.pop();
    this.handleClickMove();


  }

  generateSideTiles(){
    for (let i = 1; i < 6 ; i++ ){
      const spaces = document.getElementById("side-tiles");
      let option = new Space([0,0], `${i}choice`, spaces, "option");
      option.createCanvas();
      option.generateRandomPipe();
      option.canvas.style.top = 61 * (i - 1);
      this.options.push(option);
    }
  }


}

const game =new Game();
game.start();
