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
    this._setupAttributes();
  }

  createCanvas(){
    const canvas = document.createElement("canvas");
    this._setCanvasStyle(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    if (this.klass === "tile"){
      this.drawPipe(0);
      canvas.addEventListener('click', this.handleClick.bind(null, this, false));
    }
    if (this.parent){
      this.parent.appendChild(canvas);
    }
  }

  _setCanvasStyle(canvas){
    canvas.setAttribute("width", "60px");
    canvas.setAttribute("height", "60px");
    canvas.setAttribute("class", this.klass);
    canvas.setAttribute("row", `${this.x}`);
    canvas.setAttribute("col", `${this.y}`);

  }

  _setupAttributes(){
    this.possible = [];
    this.exits= {};
    this.type = 0;
    this.locked = false;
    this.setAttributes = this.setAttributes.bind(this);
  }

  drawLineBorder(x, y){
    this.ctx.strokeStyle = BORDER_COLOR;
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.moveTo(x[0], y[0]);
    this.ctx.lineTo(x[1], y[1]);
    this.ctx.moveTo(x[2], y[2]);
    this.ctx.lineTo(x[3], y[3]);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawInsideRect(x, y, width, height){
    this.ctx.beginPath();
    this.ctx.fillStyle = INSIDE_COLOR;
    this.ctx.rect(x, y, width, height);
    this.ctx.fill();
    this.ctx.closePath();
  }

  setAttributes(options){
    this.possible = options.possible;
    this.exits = options.exits;
    this.endPercent = options.endPercent;
    this.curPerc = options.curPerc;
    this.speed = 2 * this.difficulty;
    this.filled = false;
  }

  drawArc(x1, y1, radius, startAngle, endAngle, clockwise, width, color){
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x1, y1, radius, startAngle, endAngle, clockwise);
    this.ctx.lineWidth = width;
    this.ctx.stroke();
  }

  drawPipe(type){
    switch (type){
      case 0:
        this.canvas.setAttribute("class", 'empty');
        return;
      case 1:
        this.drawLineBorder([18, 18, 41, 41], [0, 60, 0, 60]);
        this.drawInsideRect(20, 0, 18, 60);

        this.setAttributes({
          possible:["top", "bottom"],
          exits: {top:"bottom", bottom:"top"},
          endPercent: 100,
          curPerc: 0
        });
        return;
      case 2:
        this.drawLineBorder([0, 60, 0, 60], [19, 19, 41, 41]);
        this.drawInsideRect(0, 21, 60, 17);
        this.setAttributes({
          possible:["left", "right"],
          exits: {left:"right", right:"left"},
          endPercent: 100,
          curPerc: 0
        });
        this.offSet = 0;
        return;
      case 3:
        this.drawArc(0, 0, 30, 0, 0.5 * Math.PI, false, 20, INSIDE_COLOR);
        this.drawArc(0, 0, 18, 0, 0.5 * Math.PI, false, 5, BORDER_COLOR);
        this.drawArc(0, 0, 41, 0, 0.5 * Math.PI, false, 5, BORDER_COLOR);

        this.setAttributes({
          possible:["left", "top"],
          exits: {left:"top", top:"left"},
          endPercent: 0,
          curPerc: 100
        });
        return;
      case 4:
        this.drawArc(60, 0, 30, 0, 0.5 * Math.PI, true, 20, INSIDE_COLOR);
        this.drawArc(60, 0, 18, 0, 0.5 * Math.PI, true, 5, BORDER_COLOR);
        this.drawArc(60, 0, 41, 0, 0.5 * Math.PI, true, 5, BORDER_COLOR);

        this.setAttributes({
          possible:["right", "top"],
          exits: {right:"top", top:"right"},
          endPercent: 0,
          curPerc: 100
        });
        return;
      case 5:
        this.drawArc(0, 60, 30, 3 * Math.PI / 2, 0 , false, 20, INSIDE_COLOR);
        this.drawArc(0, 60, 19, 3 * Math.PI / 2, 0, false, 5, BORDER_COLOR);
        this.drawArc(0, 60, 41, 3 * Math.PI / 2, 0, false, 5, BORDER_COLOR);

        this.setAttributes({
          possible:["left", "bottom"],
          exits: {left:"bottom", bottom:"left"},
          endPercent: 99,
          curPerc: 0
        });
        return;
      case 6:
        this.drawArc(60, 60, 30, 0, 0.5 * Math.PI, true, 20, INSIDE_COLOR);
        this.drawArc(60, 60, 19, 0, 0.5 * Math.PI, true, 5, BORDER_COLOR);
        this.drawArc(60, 60, 42, 0, 0.5 * Math.PI, true, 5, BORDER_COLOR);

        this.setAttributes({
          possible:["right", "bottom"],
          exits: {right:"bottom", bottom:"right"},
          endPercent: 100,
          curPerc: 0
        });
        return;
      case 7:
        this.drawLineBorder([0, 60, 0, 60], [19, 19, 41, 41]);

        this.drawLineBorder([18, 18, 41, 41], [0, 60, 0, 60]);
        this.drawInsideRect(20, 0, 18, 60);
        this.drawInsideRect(0, 21, 60, 17);

        this.setAttributes({
          possible:["left", "top","right", "bottom"],
          exits: {left:"right", right:"left", top: "bottom", bottom: "top"},
          endPercent: 100,
          curPerc: 0
        });
        this.offSet = 0;
        return;
      case 8:
        this.drawInsideRect(0, 21, 60, 17);
        this.drawLineBorder([0, 60, 0, 60], [19, 19, 41, 41]);

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
        this.endPercent = 73;
        this.curPerc = 0;
        this.speed = 2 * this.difficulty;
        return;
      case 9:
        this.drawInsideRect(0, 21, 60, 17);
        this.drawLineBorder([0, 60, 0, 60], [19, 19, 41, 41]);

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
      } else if (this.curPerc >= this.endPercent && !this.filled){
        this.filled = true;
        this.handleFill();
        requestAnimationFrame(this.animateVertical.bind(this, direction));
      } else {
        this.curPerc = 0;
        this.endPercent = 100;
        this.filled = false;
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
      } else if (this.curPerc <= 0 && !this.filled){
        this.filled = true;
        this.handleFill();
        requestAnimationFrame(this.animateVertical.bind(this, direction));
      } else{
        this.curPerc = 0;
        this.endPercent = 100;
        this.filled = false;
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
      } else if (this.curPerc >= this.endPercent && !this.filled){

        this.handleFill();
        this.filled = true;
        requestAnimationFrame(this.animateHorizontal.bind(this, direction));
      } else {
        this.curPerc = 0;
        this.endPercent = 100;
        this.filled = false;
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
      }else if (this.curPerc <= 0 && !this.filled){
        this.filled = true;
        this.handleFill();
        requestAnimationFrame(this.animateHorizontal.bind(this, direction));
      } else {
        this.curPerc = 0;
        this.endPercent = 100;
        this.filled = false;
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
        } else if (this.curPerc <= 0 && !this.filled) {
          this.filled = true;
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
        }  else if (this.curPerc >= 100 && !this.filled) {
          this.filled = true;
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
        } else if (this.curPerc >= 100 && !this.filled) {
          this.filled = true;
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
        } else if (this.curPerc <= 0 && !this.filled) {
          this.filled = true;
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
      } else if (this.curPerc >= 100 && !this.filled) {
        this.filled = true;
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
      }else if (this.curPerc <= 0 && !this.filled) {
        this.filled = true;
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
      } else if (this.curPerc >= 100 && !this.filled) {
        this.filled = true;
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
      } else if (this.curPerc <= 0 && !this.filled) {
        this.filled = true;
        this.handleFill();
        requestAnimationFrame(this.animateType6.bind(this, direction));
      } else {
        return;
      }
    }
  }
  generateRandomPipe(){
    //0 - 100
    // const randShape =  Math.floor((Math.random() * 101));
    // let rand;
    // if (randShape < 36){
    //   rand = Math.floor((Math.random() * 2) + 1);
    // } else{
    //   rand = Math.floor((Math.random() * 5) + 3);
    // }
    let rand = Math.floor((Math.random() * 7) + 1);
    // rand = 5;
    this.type = rand;
    this.canvas.setAttribute("type", rand);
    this.drawPipe(rand);
  }
}
export default Space;
