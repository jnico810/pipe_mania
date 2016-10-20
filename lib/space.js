
const DEFAULTS = {
  type: "0"
};
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
  }

  addNewOption(){
    this.createCanvas();
    this.generateRandomPipe();
    const sideTiles = document.getElementById('side-tiles');
    sideTiles.insertBefore(newOption.canvas, sideTiles.childNodes[0]);
  }

  createCanvas(){
    const canvas = document.createElement("canvas");

    canvas.setAttribute("width", "60px");
    canvas.setAttribute("height", "60px");
    canvas.setAttribute("class", this.klass);
    canvas.setAttribute("id", `${this.id}`);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    if (this.klass != "option"){
      canvas.addEventListener('click', this.handleClick.bind(null, this));
      this.drawPipe(0);
    }
    if (this.parent){
      this.parent.appendChild(canvas);
    }
  }
  drawPipe(type){
    switch (type){
      case 0:
        return;
      case 1:
        this.ctx.beginPath();
        this.ctx.fillStyle = "gray";
        this.ctx.rect(15,0, 4, 60);
        this.ctx.rect(39,0, 4, 60);
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.rect(19,0, 20, 60);
        this.ctx.fillStyle = "lightgray";
        this.ctx.fill();
        this.ctx.closePath();
        return;
      case 2:
        this.ctx.beginPath();
        this.ctx.fillStyle = "gray";
        this.ctx.rect(0,15, 60, 4);
        this.ctx.rect(0,39, 60, 4);
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.rect(0,19, 60, 20);
        this.ctx.fillStyle = "lightgray";
        this.ctx.fill();
        this.ctx.closePath();
        return;
    }
  }

  generateRandomPipe(){
    const rand = Math.floor((Math.random() * 2) + 1);
    this.canvas.setAttribute("type", rand);
    this.drawPipe(rand);
  }
}

export default Space;
