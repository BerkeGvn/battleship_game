import { player1, player2 } from './players';
import random from './helpers';

const playerMainDiv = document.querySelector('.player-grid-container');
const aiMainDiv = document.querySelector('.ai-grid-container');

function createGrid() {
  for (let i = 0; i < 10; i += 1) {
    const row = document.createElement('div');
    row.setAttribute('id', i);
    row.classList.add(`row-${i}`);
    row.classList.add('row');

    const row2 = document.createElement('div');
    row2.setAttribute('id', i);
    row2.classList.add(`row-2-${i}`);
    row2.classList.add('row');

    for (let j = 0; j < 10; j += 1) {
      const col = document.createElement('div');
      col.classList.add('box');
      col.classList.add(`box-${j}`);
      row.appendChild(col);

      const col2 = document.createElement('div');
      col2.classList.add('box');
      col2.classList.add(`box-2-${j}`);
      row2.appendChild(col2);
    }
    playerMainDiv.appendChild(row);
    aiMainDiv.appendChild(row2);
  }
}
createGrid();

function randomHit() {
  const randomRow = random(0, 9);
  const randomColm = random(0, 9);
  console.log([randomRow, randomColm]);
  player2.attack(player1, [randomRow, randomColm]);
  const innerDiv = document.querySelector(`.row-${randomRow} .box-${randomColm}`);
  innerDiv.textContent = 'X';
}

function hitEvent() {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const innerDiv = document.querySelector(`.row-2-${i} .box-2-${j}`);
      innerDiv.addEventListener('click', (e) => {
        if (player2.gameboard.board[i][j] === 1) {
          e.target.textContent = 'X';
        }
        player1.attack(player2, [i, j]);
        randomHit();
      }, { once: true });
    }
  }
}

export default hitEvent;
