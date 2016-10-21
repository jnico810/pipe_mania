import Game from './game.js';
const game =new Game();


document.getElementById('play').addEventListener('click', () => {
  // debugger
  game.startGame();
});
