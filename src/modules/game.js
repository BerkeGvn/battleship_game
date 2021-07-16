import { player1, player2 } from './players';
import { random, sleep } from './helpers';
import createGrid from './grid';
import { resultScreen, winner } from './domElements';

createGrid();

function checkGameover() {
  if (player1.gameboard.gameover()) {
    winner.textContent = 'You lose!';
    resultScreen.classList.remove('none');
    return true;
  }
  if (player2.gameboard.gameover()) {
    winner.textContent = 'You win!';
    resultScreen.classList.remove('none');
    return true;
  }
  return false;
}

let playerTurn = true;
const randomHitCoord = [];

async function randomHit() {
  const randomRow = random(0, 10);
  const randomColumn = random(0, 10);
  if (randomHitCoord.includes(`${randomRow}${randomColumn}`)) {
    return randomHit();
  }
  randomHitCoord.push(`${randomRow}${randomColumn}`);
  await sleep(300);

  const innerDiv = document.querySelector(`.row-${randomRow} .box-${randomColumn}`);

  if (player1.gameboard.board[randomRow][randomColumn] === 1) {
    innerDiv.classList.add('x');
  } else {
    innerDiv.classList.add('o');
  }

  player2.attack(player1, [randomRow, randomColumn]);

  checkGameover();
  playerTurn = true;
  return playerTurn;
}

function markShipDivs() {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (player1.gameboard.board[i][j] === 1) {
        const box = document.querySelector(`.row-${i} .box-${j}`);
        box.classList.add('mark');
      }
    }
  }
}

markShipDivs();

function hitEvent() {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const aq = document.querySelector(`.row-2-${i} .box-2-${j}`);

      aq.addEventListener('click', (e) => {
        if (playerTurn) {
          if (player2.gameboard.board[i][j] === 1) {
            e.target.classList.add('x');
          } else {
            e.target.classList.add('o');
          }
          player1.attack(player2, [i, j]);
          if (checkGameover()) {
            return;
          }
          randomHit();

          playerTurn = false;
        }
      }, { once: true });
    }
  }
}

export {
  hitEvent, markShipDivs, randomHitCoord,
};
