
const DEFAULTS = {
  type: "0"
};

const INSIDE_COLOR = "#8ed2f9"
const BORDER_COLOR = "#6e9cb7"
const SIZE = 60;

class Space {

  constructor(coord, id, parent, klass, handleClick){
    this.x = coord[0];
    this.y = coord[1];
    this.id = id;
    this.parent = parent;
    this.klass = klass;
    this.canvas = null;
    this.handleClick = handleClick;
    this.possible = [];
  }

  addNewOption(){

  }

  createCanvas(){
    const canvas = document.createElement("canvas");

    canvas.setAttribute("width", "60px");
    canvas.setAttribute("height", "60px");
    canvas.setAttribute("class", this.klass);
    canvas.setAttribute("row", `${this.id}`);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    if (this.klass === "tile"){
      canvas.addEventListener('click', this.handleClick.bind(null, this));
    } else if (this.klass === "start"){
      this.drawPipe(2);
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
        return;
      case 5:
        this.ctx.strokeStyle = INSIDE_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(0, 60, 30, 0, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 20;
        this.ctx.stroke();

        this.ctx.strokeStyle = BORDER_COLOR;

        this.ctx.beginPath();
        this.ctx.arc(0, 60, 18, 0, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(0, 60, 41, 0, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
        this.possible = ["left", "bottom"];
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
    }
  }

  generateRandomPipe(){
    let rand = Math.floor((Math.random() * 7) + 1);
    this.canvas.setAttribute("type", rand);
    console.log(rand);
    this.drawPipe(rand);
  }
}

export default Space;
