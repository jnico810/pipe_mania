
const DEFAULTS = {
  type: "0"
};

const INSIDE_COLOR = "#8ed2f9"
const BORDER_COLOR = "#6e9cb7"
const SIZE = 60;


class Space {

  constructor(coord, rowCol, parent, klass, handleClick, handleFill){
    this.x = coord[0];
    this.y = coord[1];
    this.rowCol = rowCol;
    this.parent = parent;
    this.klass = klass;
    this.canvas = null;
    this.handleClick = handleClick;
    this.possible = [];
    this.exits= {};
    this.type = 0;
    this.handleFill = handleFill;

    this.endPercent = 60;
    this.curPerc = 0;
  }

  createCanvas(){
    const canvas = document.createElement("canvas");

    canvas.setAttribute("width", "60px");
    canvas.setAttribute("height", "60px");
    canvas.setAttribute("class", this.klass);
    canvas.setAttribute("row", `${this.rowCol[0]}`);
    canvas.setAttribute("col", `${this.rowCol[1]}`);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    if (this.klass === "tile"){
      canvas.addEventListener('click', this.handleClick.bind(null, this));
    } else if (this.klass === "start"){

    }

    if (this.parent){
      this.parent.appendChild(canvas);
    }
  }
  drawPipe(type){
    // this.canvas.setAttribute("class", "space");
    // this.klass = "space";
    switch (type){
      case 0:
        return;
      case 1:
        this.ctx.beginPath();
        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(18,0);
        this.ctx.lineTo(18,60);
        this.ctx.moveTo(41,0);
        this.ctx.lineTo(41,60);
        this.ctx.stroke();

        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.rect(20,0, 18, 60);
        this.ctx.fillStyle = INSIDE_COLOR;
        this.ctx.fill();
        this.ctx.closePath();
        this.possible = ["top", "bottom"];
        this.exits = {top:"bottom", bottom:"top"};

        this.endPercent = 60;
        this.curPerc = 0;
        this.speed = 1;
        return;
      case 2:
        this.ctx.beginPath();
        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(0,18);
        this.ctx.lineTo(60,18);
        this.ctx.moveTo(0,41);
        this.ctx.lineTo(60,41);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.rect(0,20, 60, 18);
        this.ctx.fillStyle = INSIDE_COLOR;
        this.ctx.fill();
        this.ctx.closePath();
        this.possible = ["left", "right"];
        this.exits = {left:"right", right:"left"};

        this.endPercent = 60;
        this.curPerc = 0;
        this.speed = 1;
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
        this.speed = 2;
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
        this.speed = 2;
        return;
      case 5:
        this.ctx.strokeStyle = INSIDE_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(0, 60, 30, 3 * Math.PI / 2, 0 , false);
        this.ctx.lineWidth = 20;
        this.ctx.stroke();

        this.ctx.strokeStyle = BORDER_COLOR;

        this.ctx.beginPath();
        this.ctx.arc(0, 60, 18, 3 * Math.PI / 2, 0, false);
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
        this.speed = 2;
        return;
      case 6:
        this.ctx.strokeStyle = INSIDE_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(60, 60, 30, 0, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 20;
        this.ctx.stroke();

        this.ctx.strokeStyle = BORDER_COLOR;

        this.ctx.beginPath();
        this.ctx.arc(60, 60, 18, 0, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(60, 60, 41, 0, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
        this.possible = ["right", "bottom"];
        this.exits = {right:"bottom", bottom:"right"};
        this.curPerc = 0;
        this.endPercent = 100;
        this.speed = 2;
        return;
      case 7:
        this.ctx.beginPath();
        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.lineWidth = 5;

        this.ctx.moveTo(0,18);
        this.ctx.lineTo(60,18);
        this.ctx.moveTo(0,41);
        this.ctx.lineTo(60,41);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(18,0);
        this.ctx.lineTo(18,60);
        this.ctx.moveTo(41,0);
        this.ctx.lineTo(41,60);
        this.ctx.stroke();

        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.rect(20,0, 18, 60);
        this.ctx.fillStyle = INSIDE_COLOR;
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.rect(0,20, 60, 18);
        this.ctx.fillStyle = INSIDE_COLOR;
        this.ctx.fill();
        this.ctx.closePath();
        this.possible = ["left", "top","right", "bottom"];
        this.exits = {left:"right", right:"left", top: "bottom", bottom: "top"};
    }
  }
  //1 is vertical, 2 is horizontal
  animate(direction){
    // debugger
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
      default:
        break;
    }
  }

  willFlip(direction){
    switch (this.type){
      case 1:
        if (direction === 'bottom'){
          // debugger
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
      default:
        return false;
    }
  }
  animateVertical(direction){
    if (direction === 'bottom'){
      this.ctx.beginPath();
      this.ctx.rect(21,0, 18, this.curPerc);
      this.curPerc = this.curPerc + this.speed;
      this.ctx.fillStyle = 'green';
      this.ctx.fill();
      this.ctx.closePath();
      if (this.curPerc < this.endPercent) {
        { requestAnimationFrame(this.animateVertical.bind(this, direction));}
      }else {
        this.handleFill();
      }
    } else {
      this.ctx.beginPath();
      this.ctx.rect(21,this.curPerc, 18, this.endPercent - this.curPerc);
      this.curPerc = this.curPerc -  this.speed;
      this.ctx.fillStyle = 'green';
      this.ctx.fill();
      this.ctx.closePath();
      if (this.curPerc !== 0) {
        { requestAnimationFrame(this.animateVertical.bind(this, direction));}
      } else {
        this.handleFill();
      }
    }
    return;
  }

  animateHorizontal(direction){
    if (direction === 'right'){
      this.ctx.beginPath();
      this.ctx.rect(0,20, this.curPerc, 18);
      this.curPerc = this.curPerc + this.speed;
      this.ctx.fillStyle = 'green';
      this.ctx.fill();
      this.ctx.closePath();
      if (this.curPerc < this.endPercent) {
        { requestAnimationFrame(this.animateHorizontal.bind(this, direction));}
      } else {
        this.handleFill();

      }
    } else {
      this.ctx.beginPath();
      this.ctx.rect(this.curPerc,20, this.endPercent - this.curPerc, 18 );
      this.curPerc = this.curPerc - this.speed;
      this.ctx.fillStyle = 'green';
      this.ctx.fill();
      this.ctx.closePath();
      if (this.curPerc !== 0) {
        { requestAnimationFrame(this.animateHorizontal.bind(this, direction));}
      }else {
        this.handleFill();
        // debugger
      }
    }
    return;
  }

  animateType3(direction){
    // debugger
      if (direction === 'top'){
        this.ctx.strokeStyle = 'green';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 30, 0.5 * Math.PI * this.curPerc / 100, 0.5 * Math.PI, false);
        this.ctx.lineWidth = 20;
        this.ctx.stroke();
        this.curPerc = this.curPerc - this.speed
        if (this.curPerc !== 0) {
          { requestAnimationFrame(this.animateType3.bind(this, direction));}
        } else {
          this.handleFill();
        }
      }else {
        this.ctx.strokeStyle = 'green';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 30, 0, this.curPerc / 100 * 0.5 * Math.PI, false);
        this.ctx.lineWidth = 20;
        this.ctx.stroke();
        this.curPerc = this.curPerc + this.speed;
        if (this.curPerc < 100) {
          { requestAnimationFrame(this.animateType3.bind(this, direction));}
        } else {
          this.handleFill();
        }
      }
  }

  animateType4(direction){
    // debugger
      if (direction === 'top'){
        // debugger
        this.ctx.strokeStyle = 'green';
        this.ctx.beginPath();
        this.ctx.arc(60, 0, 30, Math.PI / 2 + Math.PI / 2 * this.curPerc / 100, Math.PI / 2, true);
        this.ctx.lineWidth = 20;
        this.ctx.stroke();
        this.curPerc = this.curPerc + this.speed ;
        if (this.curPerc < 100) {
          { requestAnimationFrame(this.animateType4.bind(this, direction));}
        } else {
          this.handleFill();
        }
      }else {
        // debugger
        this.ctx.strokeStyle = 'green';
        this.ctx.beginPath();
        this.ctx.arc(60, 0, 30, Math.PI, Math.PI / 2 + Math.PI/2 * this.curPerc / 100, true);
        this.ctx.lineWidth = 20;

        this.ctx.stroke();
        this.curPerc = this.curPerc - this.speed ;
        if (this.curPerc !== 0) {
          { requestAnimationFrame(this.animateType4.bind(this, direction));}
        } else {
          this.handleFill();
        }
      }
  }

  animateType5(direction){

    if (direction === 'bottom'){


      // debugger;
      this.ctx.strokeStyle = 'green';
      this.ctx.beginPath();
      this.ctx.arc(0, 60, 30, 3 * Math.PI / 2, 3 * Math.PI / 2 + 1 * Math.PI / 2 * this.curPerc /100 , false);
      this.ctx.lineWidth = 20;
      this.ctx.stroke();

      this.curPerc = this.curPerc + this.speed ;
      if (this.curPerc < 100) {
        { requestAnimationFrame(this.animateType5.bind(this, direction));}
      } else {
        this.handleFill();
      }
    }else {
      // debugger
      this.ctx.strokeStyle = 'green';
      this.ctx.beginPath();
      this.ctx.arc(0, 60, 30, 0, 3 * Math.PI / 2 + Math.PI/2 * this.curPerc / 100, true);
      this.ctx.lineWidth = 20;

      this.ctx.stroke();
      this.curPerc = this.curPerc - this.speed;
      if (this.curPerc !== 0) {
        { requestAnimationFrame(this.animateType5.bind(this, direction));}
      } else {
        this.handleFill();
      }
    }
  }

  animateType6(direction){

    if (direction === 'right'){
      this.ctx.strokeStyle = 'green';
      this.ctx.beginPath();
      this.ctx.arc(60, 60, 30, Math.PI, Math.PI + Math.PI / 2 * this.curPerc / 100, false);
      this.ctx.lineWidth = 20;
      this.ctx.stroke();

      this.curPerc = this.curPerc + this.speed ;
      if (this.curPerc < 100) {
        { requestAnimationFrame(this.animateType6.bind(this, direction));}
      } else {
        this.handleFill();
      }
    }else {
      // debugger
      this.ctx.strokeStyle = 'green';
      this.ctx.beginPath();
      this.ctx.arc(60, 60, 30, 3 * Math.PI / 2, Math.PI + Math.PI/2 * this.curPerc / 100,  true);
      this.ctx.lineWidth = 20;

      this.ctx.stroke();
      this.curPerc = this.curPerc - this.speed ;
      if (this.curPerc !== 0) {
        { requestAnimationFrame(this.animateType6.bind(this, direction));}
      } else {
        this.handleFill();
      }
    }
  }

  generateRandomPipe(){
    let rand = Math.floor((Math.random() * 6) + 1);
    // rand = 4;
    this.type = rand;
    this.canvas.setAttribute("type", rand);
    // console.log(rand);
    this.drawPipe(rand);
  }
}

export default Space;
