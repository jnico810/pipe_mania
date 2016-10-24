// const INSIDE_COLOR = "white";
// const BORDER_COLOR = "black";
// const SLUDGE_COLOR = "red";

const INSIDE_COLOR = "#E5F7FF";
const BORDER_COLOR = "#6e9cb7";
const SLUDGE_COLOR = "#7AF679";

class Space {

  constructor(coord, parent, klass, handleClick, handleFill, difficulty){
    this.x = coord[0];
    this.y = coord[1];
    this.parent = parent;
    this.klass = klass;
    this.handleClick = handleClick;
    this.handleFill = handleFill;
    this.difficulty = difficulty;

    this.possible = [];
    this.exits= {};
    this.type = 0;
    this.locked = false;
  }

  createCanvas(){
    const canvas = document.createElement("canvas");

    canvas.setAttribute("width", "60px");
    canvas.setAttribute("height", "60px");
    canvas.setAttribute("class", this.klass);
    canvas.setAttribute("row", `${this.x}`);
    canvas.setAttribute("col", `${this.y}`);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    if (this.klass === "tile"){
      this.drawPipe(0);
      canvas.addEventListener('click', this.handleClick.bind(null, this));
    }
    if (this.parent){
      this.parent.appendChild(canvas);
    }
  }
  drawPipe(type){
    switch (type){
      case 0:
        this.canvas.setAttribute("class", 'empty');
        return;
      case 1:
        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(18,0);
        this.ctx.lineTo(18,60);
        this.ctx.moveTo(41,0);
        this.ctx.lineTo(41,60);
        this.ctx.stroke();

        this.ctx.fillStyle = INSIDE_COLOR;
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.rect(20,0, 18, 60);
        this.ctx.fill();
        this.ctx.closePath();

        this.possible = ["top", "bottom"];
        this.exits = {top:"bottom", bottom:"top"};
        this.endPercent = 100;
        this.curPerc = 0;
        this.speed = 2 * this.difficulty;
        return;
      case 2:
        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(0,19);
        this.ctx.lineTo(60,19);
        this.ctx.moveTo(0,41);
        this.ctx.lineTo(60,41);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.fillStyle = INSIDE_COLOR;
        this.ctx.beginPath();
        this.ctx.rect(0,21, 60, 17);
        this.ctx.fill();
        this.ctx.closePath();

        this.possible = ["left", "right"];
        this.exits = {left:"right", right:"left"};
        this.offSet = 0;
        this.endPercent = 100;
        this.curPerc = 0;
        this.speed = 2 * this.difficulty;
        return;
      case 3:
        this.ctx.strokeStyle = INSIDE_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 30, 0, 0.5 * Math.PI, false);
        this.ctx.lineWidth = 20;
        this.ctx.stroke();

        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 18, 0, 0.5 * Math.PI, false);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(0, 0, 41, 0, 0.5 * Math.PI, false);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        this.possible = ["left", "top"];
        this.exits = {left:"top", top:"left"};
        this.curPerc = 100;
        this.endPercent = 0;
        this.speed = 2 * this.difficulty;
        return;

      case 4:
        this.ctx.strokeStyle = INSIDE_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(60, 0, 30, 0, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 20;
        this.ctx.stroke();

        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(60, 0, 18, 0, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(60, 0, 41, 0, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        this.possible = ["right", "top"];
        this.exits = {right:"top", top:"right"};
        this.curPerc = 100;
        this.endPercent = 0;
        this.speed = 2 * this.difficulty;
        return;
      case 5:
        this.ctx.strokeStyle = INSIDE_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(0, 60, 30, 3 * Math.PI / 2, 0 , false);
        this.ctx.lineWidth = 20;
        this.ctx.stroke();

        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(0, 60, 19, 3 * Math.PI / 2, 0, false);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(0, 60, 41, 3 * Math.PI / 2, 0, false);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        this.possible = ["left", "bottom"];
        this.exits = {left:"bottom", bottom:"left"};
        this.curPerc = 0;
        this.endPercent = 99;
        this.speed = 2 * this.difficulty;
        return;
      case 6:
        this.ctx.strokeStyle = INSIDE_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(60, 60, 30, 0, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 20;
        this.ctx.stroke();

        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(60, 60, 19, 0, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(60, 60, 42, 0, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        this.possible = ["right", "bottom"];
        this.exits = {right:"bottom", bottom:"right"};
        this.curPerc = 0;
        this.endPercent = 100;
        this.speed = 2 * this.difficulty;
        return;
      case 7:

      this.ctx.strokeStyle = BORDER_COLOR;
      this.ctx.beginPath();
      this.ctx.lineWidth = 5;
      this.ctx.moveTo(0,19);
      this.ctx.lineTo(60,19);
      this.ctx.moveTo(0,41);
      this.ctx.lineTo(60,41);
      this.ctx.stroke();
      this.ctx.closePath();




      this.ctx.strokeStyle = BORDER_COLOR;
      this.ctx.beginPath();
      this.ctx.lineWidth = 5;
      this.ctx.moveTo(18,0);
      this.ctx.lineTo(18,60);
      this.ctx.moveTo(41,0);
      this.ctx.lineTo(41,60);
      this.ctx.stroke();

      this.ctx.fillStyle = INSIDE_COLOR;
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.rect(20,0, 18, 60);
      this.ctx.fill();
      this.ctx.closePath();

        this.ctx.fillStyle = INSIDE_COLOR;
        this.ctx.beginPath();
        this.ctx.rect(0,21, 60, 17);
        this.ctx.fill();
        this.ctx.closePath();

        this.offSet = 0;
        this.curPerc = 0;
        this.endPercent = 100;
        this.speed = 2 * this.difficulty;

        this.possible = ["left", "top","right", "bottom"];
        this.exits = {left:"right", right:"left", top: "bottom", bottom: "top"};
        return;
      case 8:
        this.ctx.fillStyle = INSIDE_COLOR;
        this.ctx.beginPath();
        this.ctx.rect(0,21, 60, 17);
        this.ctx.fill();
        this.ctx.closePath();


        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(0,19);
        this.ctx.lineTo(60,19);
        this.ctx.moveTo(0,41);
        this.ctx.lineTo(60,41);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.beginPath();
        this.ctx.lineWidth = 30;
        this.ctx.moveTo(2,19);
        this.ctx.lineTo(2,40);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.font = "18px copper";
        this.ctx.fillText("S", 3, 36);

        this.offSet = 17;
        this.endPercent = 71 + 2*this.difficulty;
        this.curPerc = 0;
        this.speed = 2 * this.difficulty;
        return;
      case 9:
        this.ctx.fillStyle = INSIDE_COLOR;
        this.ctx.beginPath();
        this.ctx.rect(0,21, 60, 17);
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(0,19);
        this.ctx.lineTo(60,19);
        this.ctx.moveTo(0,41);
        this.ctx.lineTo(60,41);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.beginPath();
        this.ctx.lineWidth = 30;
        this.ctx.moveTo(58,19);
        this.ctx.lineTo(58,40);
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

  animate(direction){
    if (this.willFlip(direction)){
      this.curPerc = this.endPercent;
    }
    switch (this.type){
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
      // debugger
        if (direction === 'right' || direction === 'left'){
          this.animateHorizontal(direction);
        } else{
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

  willFlip(direction){
    switch (this.type){
      case 1:
        if (direction === 'bottom'){
          return false;
        }else{
          return true;
        }
      break;
      case 2:
        if (direction === 'right'){
          return false;
        }else{
          return true;
        }
      break;
      case 3:
        if (direction === 'top'){
          return false;
        }else{
          return true;
        }
      break;
      case 4:
        if (direction === 'top'){
          return true;
        }else{
          return false;
        }
      break;
      case 5:
        if (direction === 'bottom'){
          return false;
        }else{
          return true;
        }
      break;
      case 6:
        if (direction === 'right'){
          return false;
        }else{
          return true;
        }
        break;
      case 7:
        if (direction === 'right' || direction === 'bottom'){
          return false;
        }else{
          return true;
        }
      break;
      default:
        return false;
    }
  }
  animateVertical(direction){
    if (direction === 'bottom'){
      this.ctx.beginPath();
      this.ctx.rect(20,0, 19, this.curPerc /100 * 60);
      this.curPerc = this.curPerc + this.speed;
      this.ctx.fillStyle = SLUDGE_COLOR;
      this.ctx.fill();
      this.ctx.closePath();
      if (this.curPerc < this.endPercent) {
        requestAnimationFrame(this.animateVertical.bind(this, direction));
      } else if (this.curPerc === this.endPercent){
        this.handleFill();
        requestAnimationFrame(this.animateVertical.bind(this, direction));
      } else {
        this.curPerc = 0;
        this.endPercent = 100;
        return;
      }
    } else {
      this.ctx.beginPath();
      this.ctx.rect(20,this.curPerc /100 * 60, 19, 60 - this.curPerc /100 * 60);
      this.curPerc = this.curPerc -  this.speed;
      this.ctx.fillStyle = SLUDGE_COLOR;
      this.ctx.fill();
      this.ctx.closePath();
      if (this.curPerc > 0) {
        requestAnimationFrame(this.animateVertical.bind(this, direction));
      } else if (this.curPerc === 0){
        this.handleFill();
        requestAnimationFrame(this.animateVertical.bind(this, direction));
      } else{
        this.curPerc = 0;
        this.endPercent = 100;
        return;
      }
    }
    return;
  }

  animateHorizontal(direction){
    if (direction === 'right'){
      this.ctx.beginPath();
      this.ctx.rect(this.offSet,21, this.curPerc /100 * 60, 18);
      this.curPerc = this.curPerc + this.speed;
      this.ctx.fillStyle = SLUDGE_COLOR;
      this.ctx.fill();
      this.ctx.closePath();
      if (this.curPerc < this.endPercent) {
        requestAnimationFrame(this.animateHorizontal.bind(this, direction));
      } else if (this.curPerc === this.endPercent){
        this.handleFill();
        requestAnimationFrame(this.animateHorizontal.bind(this, direction));
      } else {
        return;
      }

    } else {
      this.ctx.beginPath();
      this.ctx.rect(this.curPerc /100 * 60 ,21, 60 - this.curPerc /100 * 60, 18 );
      this.curPerc = this.curPerc - this.speed;
      this.ctx.fillStyle = SLUDGE_COLOR;
      this.ctx.fill();
      this.ctx.closePath();
      if (this.curPerc > 0) {
        requestAnimationFrame(this.animateHorizontal.bind(this, direction));
      }else if (this.curPerc === 0){
        this.handleFill();
        requestAnimationFrame(this.animateHorizontal.bind(this, direction));
      } else {
        return;
      }
    }
    return;
  }

  animateType3(direction){
      if (direction === 'top'){
        this.ctx.strokeStyle = SLUDGE_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 30, 0.5 * Math.PI * this.curPerc / 100, 0.5 * Math.PI, false);
        this.ctx.lineWidth = 18;
        this.ctx.stroke();
        this.curPerc = this.curPerc - this.speed;
        if (this.curPerc > 0) {
          requestAnimationFrame(this.animateType3.bind(this, direction));
        } else if (this.curPerc === 0) {
          this.handleFill();
          requestAnimationFrame(this.animateType3.bind(this, direction));
        } else {
          return;
        }
      }else {
        this.ctx.strokeStyle = SLUDGE_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 30, 0, this.curPerc / 100 * 0.5 * Math.PI, false);
        this.ctx.lineWidth = 18;
        this.ctx.stroke();
        this.curPerc = this.curPerc + this.speed;
        if (this.curPerc < 100) {
          requestAnimationFrame(this.animateType3.bind(this, direction));
        }  else if (this.curPerc === 100) {
          this.handleFill();
          requestAnimationFrame(this.animateType3.bind(this, direction));
        } else {
          return;
        }
      }
  }

  animateType4(direction){
      if (direction === 'top'){
        this.ctx.strokeStyle = SLUDGE_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(60, 0, 30, Math.PI / 2 + Math.PI / 2 * this.curPerc / 100, Math.PI / 2, true);
        this.ctx.lineWidth = 18;
        this.ctx.stroke();
        this.curPerc = this.curPerc + this.speed ;
        if (this.curPerc < 100) {
          requestAnimationFrame(this.animateType4.bind(this, direction));
        } else if (this.curPerc === 100) {
          this.handleFill();
          requestAnimationFrame(this.animateType4.bind(this, direction));
        } else {
          return;
        }
      }else {
        this.ctx.strokeStyle = SLUDGE_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(60, 0, 30, Math.PI, Math.PI / 2 + Math.PI/2 * this.curPerc / 100, true);
        this.ctx.lineWidth = 18;
        this.ctx.stroke();
        this.curPerc = this.curPerc - this.speed ;
        if (this.curPerc > 0) {
          requestAnimationFrame(this.animateType4.bind(this, direction));
        } else if (this.curPerc === 0) {
          this.handleFill();
          requestAnimationFrame(this.animateType4.bind(this, direction));
        } else {
          return;
        }
      }
  }

  animateType5(direction){
    if (direction === 'bottom'){
      this.ctx.strokeStyle = SLUDGE_COLOR;
      this.ctx.beginPath();
      this.ctx.arc(0, 60, 30, 3 * Math.PI / 2, 3 * Math.PI / 2 + 1 * Math.PI / 2 * this.curPerc /100 , false);
      this.ctx.lineWidth = 18;
      this.ctx.stroke();
      this.curPerc = this.curPerc + this.speed ;
      if (this.curPerc < 100) {
        requestAnimationFrame(this.animateType5.bind(this, direction));
      } else if (this.curPerc === 100) {
        this.handleFill();
        requestAnimationFrame(this.animateType5.bind(this, direction));
      } else {
        return;
      }
    }else {
      this.ctx.strokeStyle = SLUDGE_COLOR;
      this.ctx.beginPath();
      this.ctx.arc(0, 60, 30, 0, 3 * Math.PI / 2 + Math.PI/2 * this.curPerc / 100, true);
      this.ctx.lineWidth = 18;
      this.ctx.stroke();
      this.curPerc = this.curPerc - this.speed;
      if (this.curPerc > 0) {
        requestAnimationFrame(this.animateType5.bind(this, direction));
      }else if (this.curPerc === 0) {
        this.handleFill();
        requestAnimationFrame(this.animateType5.bind(this, direction));
      } else {
        return;
      }
    }
  }

  animateType6(direction){
    if (direction === 'right'){
      this.ctx.strokeStyle = SLUDGE_COLOR;
      this.ctx.beginPath();
      this.ctx.arc(60, 60, 30, Math.PI, Math.PI + Math.PI / 2 * this.curPerc / 100, false);
      this.ctx.lineWidth = 18;
      this.ctx.stroke();

      this.curPerc = this.curPerc + this.speed ;
      if (this.curPerc < 100) {
        requestAnimationFrame(this.animateType6.bind(this, direction));
      } else if (this.curPerc === 100) {
        this.handleFill();
        requestAnimationFrame(this.animateType6.bind(this, direction));
      } else {
        return;
      }
    }else {
      this.ctx.strokeStyle = SLUDGE_COLOR;
      this.ctx.beginPath();
      this.ctx.arc(60, 60, 30, 3 * Math.PI / 2, Math.PI + Math.PI/2 * this.curPerc / 100,  true);
      this.ctx.lineWidth = 18;
      this.ctx.stroke();
      this.curPerc = this.curPerc - this.speed ;
      if (this.curPerc > 0) {
        requestAnimationFrame(this.animateType6.bind(this, direction));
      } else if (this.curPerc === 0) {
        this.handleFill();
        requestAnimationFrame(this.animateType6.bind(this, direction));
      } else {
        return;
      }
    }
  }

  generateRandomPipe(){
    //0 - 100
    const randShape =  Math.floor((Math.random() * 101));
    let rand;
    if (randShape < 36){
      rand = Math.floor((Math.random() * 2) + 1);
    } else{
      rand = Math.floor((Math.random() * 5) + 3);
    }
    // rand = 7;
    this.type = rand;
    this.canvas.setAttribute("type", rand);
    this.drawPipe(rand);
  }
}

export default Space;
