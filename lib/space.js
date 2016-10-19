
const DEFAULTS = {
  type: "0"
};
const SIZE = 60;

class Space {

  constructor(coord, id, parent){
    this.x = coord[0];
    this.y = coord[1];
    this.id = id;
    this.parent = parent;
  }

  handleClick(e){
    e.preventDefault();
    this.drawPipe(1);
  }

  createCanvas(){
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", "60px");
    canvas.setAttribute("height", "60px");
    canvas.setAttribute("class", "tile");
    canvas.setAttribute("id", `${this.id}`);
    canvas.addEventListener('click', this.handleClick.bind(this));
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.parent.appendChild(canvas);
    this.drawPipe(0);
    }
  drawPipe(type){
    switch (type){
      case 0:
        return;
      case 1:
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.rect(this.x + 21,this.y + 1, 20, 60);
        this.ctx.fillStyle = "gray";
        this.ctx.fill();
        this.ctx.closePath();
        return;
      case 2:

    }

  }
}

export default Space;
