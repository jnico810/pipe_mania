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
      const space = new Space([0,0], i, spaces, "tile");
      space.createCanvas();
      this.spaces.push(space);
    }
  }

  generateSideTiles(){
    for (let i = 1; i < 6 ; i++ ){
      const spaces = document.getElementById("side-tiles");
      let option = new Space([0,0], `${i}choice`, spaces, "option");
      option.createCanvas();
      option.generateRandomPipe();
      this.options.push(option);
    }
  }


}

const game =new Game();
game.start();
