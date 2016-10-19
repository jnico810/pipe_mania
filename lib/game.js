console.log('loaded');
import Pipe from './pipe.js';

class Game {
  constructor(){
    this.canvas = document.getElementById("main");
    this.ctx = this.canvas.getContext("2d");
  }

  start(){
    this.drawBackground();
    let pipe = new Pipe(1, this.ctx, [67,67]);
    pipe.createCanvas();
    pipe.draw();
    pipe.drawPipe(0);
  }

  drawBackground(){
    this.ctx.beginPath();
    this.ctx.lineWidth=5;
    this.ctx.strokeRect(5,5,620, 430);
    this.ctx.fill();
    this.ctx.closePath();

    for (let i = 1; i < 10; i++ ){
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(i*62 + 5,5);
      this.ctx.lineTo(i*62 + 5,435);
      this.ctx.stroke();
      this.ctx.closePath();
    }

    for (let i = 1; i < 7; i++ ){
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(5,i*62 + 5);
      this.ctx.lineTo(625,i*62 + 5);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
}

const game =new Game();
game.start();
