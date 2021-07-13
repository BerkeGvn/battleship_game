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
      col.setAttribute('data-y', i);
      col.setAttribute('data-x', j);
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

function checkGameover() {
  if (player1.gameboard.gameover()) {
    alert('Player 2 wins!');
  }
  if (player2.gameboard.gameover()) {
    alert('Player 1 wins!');
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let playerTurn = true;

async function randomHit() {
  const randomRow = random(0, 9);
  const randomColm = random(0, 9);
  await sleep(500);
  const innerDiv = document.querySelector(`.row-${randomRow} .box-${randomColm}`);
  if (player1.gameboard.board[randomRow][randomColm] === 1) {
    innerDiv.classList.add('red');
    innerDiv.textContent = 'O';
  } else if (player1.gameboard.board[randomRow][randomColm] === '#') {
    randomHit();
  } else {
    innerDiv.textContent = 'X';
  }
  player2.attack(player1, [randomRow, randomColm]);
  checkGameover();
  playerTurn = true;
}

function markShipDivs() {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (player1.gameboard.board[i][j] === 1) {
        const innerDiv = document.querySelector(`.row-${i} .box-${j}`);
        innerDiv.classList.add('black');
      }
    }
  }
}
markShipDivs();
function hitEvent() {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const innerDiv = document.querySelector(`.row-2-${i} .box-2-${j}`);
      // eslint-disable-next-line no-loop-func
      innerDiv.addEventListener('click', (e) => {
        console.log(player1.gameboard.gameover());
        console.log(player2.gameboard.gameover());

        if (playerTurn) {
          if (player2.gameboard.board[i][j] === 1) {
            e.target.textContent = 'X';
          }
          player1.attack(player2, [i, j]);
          checkGameover();
          randomHit();

          playerTurn = false;
        }
      }, { once: true });
    }
  }
}

export { hitEvent, randomHit, markShipDivs };
