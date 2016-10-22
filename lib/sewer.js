import Game from './game.js';
const game = new Game();


document.getElementById('play').addEventListener('click', () => {
  game.startGame();
  document.getElementById('menu').setAttribute('class', 'hidden');
  document.getElementById('main').setAttribute('class', '');
  document.getElementById('sludge').setAttribute('class', '');
});
