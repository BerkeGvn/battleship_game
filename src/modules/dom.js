import { player1, player2 } from './players';

const grid1 = document.querySelector('.grid-1');
const grid2 = document.querySelector('.grid-2');

function createGrids() {
  for (let i = 0; i < 100; i += 1) {
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    div.classList.add('box');
    div2.classList.add('box');
    div.setAttribute('id', i);
    div2.setAttribute('id', i);
    grid1.appendChild(div);
    grid2.appendChild(div2);
  }
}
createGrids();

const playerBoard = document.querySelectorAll('.grid-1 .box');
const aiBoard = document.querySelectorAll('.grid-2 .box');

function hitEvent() {
  let m = 0;
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      aiBoard[m].addEventListener('click', (e) => {
        if (player2.gameboard.board[i][j] === 1) {
          e.target.textContent = 'X';
        }
        player1.attack(player2, [i, j]);
      }, { once: true });

      /*       playerBoard[m].addEventListener('click', (e) => {
        if (player1.gameboard.board[i][j] === 1) {
          e.target.textContent = 'X';
        }
        player2.attack(player1, [i, j]);
      }, { once: true }); */

      m += 1;
    }
  }
}

export default hitEvent;
