console.log('loaded');
import Space from './space.js';

class Game {
  constructor(){
  }

  start(){
    this.generateSpaces();
  }

  generateSpaces(){
    for (let i = 1; i < 71; i++ ){
      let pipe = new Space([0,0], i);
      pipe.createCanvas();
    }
  }


}

const game =new Game();
game.start();
