import { player1, player2 } from './players';
import createGrid from './grid';
import { resultScreen, winner } from './domElements';
import { aiHit } from './ai';

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
/* const randomHitCoord = [];
let position = 1;
let randomShot = true;
let axisXLeft = false;
let axisXRight = false;
let axisYUpper = false;
let axisYBelow = false;
let correcRow;
let correcColumn;

function properHit(row, column) {
  if (row > 9 || row < 0 || column > 9 || column < 0) {
    return false;
  }
  if (player1.gameboard.board[row][column] === '#') {
    return false;
  }
  if ((randomHitCoord.includes(`${row}${column}`))) {
    return false;
  }
  return true;
}
function correctHit(row, column) {
  if (player1.gameboard.board[row][column] === 1) {
    return true;
  }
  return false;
}
function changeAxis(axis) {
  if (axis === 'axisXLeft') {
    axisXLeft = false;
    axisXRight = true;
  }
  if (axis === 'axisXRight') {
    axisXRight = false;
    axisYUpper = true;
  }
  if (axis === 'axisYUpper') {
    axisYUpper = false;
    axisYBelow = true;
  }
  if (axis === 'axisYBelow') {
    axisYBelow = false;
    randomShot = true;
  }
}
function markHitLocation(row, column, axis) {
  let innerDiv;
  if (correctHit(row, column)) {
    player2.attack(player1, [row, column]);
    randomHitCoord.push(`${row}${column}`);
    innerDiv = document.querySelector(`.row-${row} .box-${column}`);
    innerDiv.classList.add('x');
    position += 1;
  } else {
    innerDiv = document.querySelector(`.row-${row} .box-${column}`);
    randomHitCoord.push(`${row}${column}`);
    position = 1;
    innerDiv.classList.add('o');
    changeAxis(axis);
  }
} */

async function randomHit() {
  aiHit();
  checkGameover();
  playerTurn = true;
  return playerTurn;
}
/* async function randomHit() {
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
} */
function markRandomPlacement() {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (player1.gameboard.board[i][j] === 1) {
        const innerDiv = document.querySelector(`.row-${i} .box-${j}`);
        innerDiv.classList.add('mark');
      }
    }
  }
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
  if (playerTurn) {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const aq = document.querySelector(`.row-2-${i} .box-2-${j}`);

        aq.addEventListener('click', (e) => {
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
        }, { once: true });
      }
    }
    playerTurn = false;
  }
}

export {
  hitEvent, markShipDivs, markRandomPlacement,
};
