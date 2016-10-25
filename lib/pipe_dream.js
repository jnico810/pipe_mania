import Game from './game.js';

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
  difficulty: 0.30
};

const level2 = {
  grid:[
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,3,0,0,0,0],
    [0,0,0,3,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,3,0],
    [0,0,0,0,0,0,3,0,0,0],
    [1,0,0,0,0,0,3,0,0,2],
    [0,0,0,0,0,0,0,3,0,0]
  ],
  difficulty: 0.32
};

const level3 = {
  grid:[
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,3,3,3,3,0,0,0],
    [0,0,0,3,0,0,3,0,0,0],
    [0,0,0,2,0,0,1,0,0,0],
    [0,0,0,3,0,0,3,0,0,0],
    [0,0,0,3,3,3,3,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ],
  difficulty: 0.40
};
let levels = [];
levels.push(level1, level2, level3);

const game = new Game(levels);


document.getElementById('play').addEventListener('click', () => {
  game.startGame();
  document.getElementById('menu').setAttribute('class', 'hidden');
  document.getElementById('main').setAttribute('class', '');
  document.getElementById('sludge').setAttribute('class', '');
});
