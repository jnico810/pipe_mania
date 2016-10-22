import Game from './game.js';
const game = new Game();


document.getElementById('play').addEventListener('click', () => {
  game.startGame();
  document.getElementById('menu').setAttribute('class', 'hidden');
  document.getElementById('main').setAttribute('class', '');
  document.getElementById('sludge').setAttribute('class', '');
});

//Level 1
const level1 = [
  [0,0,0,0,0,3,0,0,0,2],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,3,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,3,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [1,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,0,0,0,3,0,0]
];
