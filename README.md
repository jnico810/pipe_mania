## Pipe Mania: A PipeDream Clone

[LIVE SITE](https://jnico810.github.io/pipe_mania/)

### Background

Using a variety of pipe pieces presented randomly in a queue, the player must construct a path from the start piece for the onrushing sewer slime, or "flooz" (the 1991 Windows version's help files refer to it as "goo"), which begins flowing after a time delay from the start of the round. Pieces may not be rotated; they must be placed as presented in the queue.

[main]: ./assets/images/main.png

![main]

### How To Play

Simply click on any empty tile or unfilled pipe to place a pipe from the bottom of the queue on the left. Your goal is to connect the start and end pipes before the sludge spills out!
[movement]: ./assets/images/movement.png

![movement]

The longer the path, the more points you get! Be smart, because the sludge is fast!

[spill]: ./assets/images/spill.png

![spill]

### Code

Level design is very simple! Using a 2D Array, with integers from 0 - 3, any level can be created in minutes. (0 = empty space, 1 = start pipe, 2 = end pipe, 3 = barrier). The difficulty is used to determine the speed of the sludge!

```javascript
const level1 = {
  grid:[
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,2,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,3,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ],
  difficulty: 0.10
};
```

As the game plays, the sludge moves from pipe to pipe, only if the pipes are connected. This happens only if the next pipe is a valid option. Using a 2D array, keeping track of the locations of pipes, the pipes are filled accordingly.

```javascript
fillNextPipe(){
  const y = this.currentSludgeSpace.y;
  const x = this.currentSludgeSpace.x;

  switch (this.currentSludgeSpace.exit){
    case 'right':
      if (this.grid[x][y + 1] === this.end){
        this.end.animate('right');
        this.score += this.multiplier;
        this.scoreElement.innerHTML = `Score: ${this.score}`;
      } else if (this.grid[x][y + 1] && this.grid[x][y + 1].possible && this.grid[x][y + 1].possible.includes('left')){
         this.currentSludgeSpace = this.spaces[x][y+1];
         this.currentSludgeSpace.locked = true;
         this.score += this.multiplier;
         this.scoreElement.innerHTML = `Score: ${this.score}`;
         this.currentSludgeSpace.animate(this.currentSludgeSpace.exits.left);
         this.currentSludgeSpace.exit = this.currentSludgeSpace.exits.left;

       } else{
         this.sludge.style.left = this.currentSludgeSpace.canvas.getBoundingClientRect().right - 60;
         this.sludge.style.top = this.currentSludgeSpace.canvas.getBoundingClientRect().top - 30;
         this.spillSludge();
       }
       return;
     }
   }
 }
```
