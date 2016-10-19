
const DEFAULTS = {
  type: "0"
};
const SIZE = 60;

class Space {

  constructor(coord, id){
    this.x = coord[0];
    this.y = coord[1];
    this.id = id;
  }

  draw(){
    // this.ctx = this.canvas.getContext("2d");
    // this.ctx.beginPath();
    // this.ctx.lineWidth = 2;
    // this.ctx.rect(0,0, 60, 60);
    // this.ctx.fillStyle = "#E3E3E3";
    // this.ctx.fill();
    // this.ctx.closePath();
  }

  createCanvas(){
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", "60px");
    canvas.setAttribute("height", "60px");
    canvas.setAttribute("class", "tile");
    canvas.setAttribute("id", `${this.id}`);
    canvas.addEventListener('click', () => console.log('click'));
    this.canvas = canvas;
    this.draw();
    let spaces = document.getElementById("spaces");
    spaces.appendChild(canvas);
  }
  drawPipe(type){
    switch (type){
      case 0:
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.rect(this.x + 21,this.y + 1, 20, 60);
      this.ctx.fillStyle = "gray";
      this.ctx.fill();

      this.ctx.closePath();
    }

  }
}

export default Space;
