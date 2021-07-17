import { random, sleep } from './helpers';
import { player1, player2 } from './players';

const randomHitCoord = [];
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
}

async function aiHit() {
  let row;
  let column;

  if (axisXLeft) {
    row = correcRow;
    column = correcColumn + position;
    if (properHit(row, column)) {
      return markHitLocation(row, column, 'axisXLeft');
      // hangi yonun false true olcagini ayarlamam lazim.
    }
    changeAxis('axisXLeft');
    position = 1;
  } if (axisXRight) {
    row = correcRow;
    column = correcColumn - position;
    if (properHit(row, column)) {
      return markHitLocation(row, column, 'axisXRight');
    }
    changeAxis('axisXRight');
    position = 1;
  } if (axisYUpper) {
    row = correcRow - position;
    column = correcColumn;
    if (properHit(row, column)) {
      return markHitLocation(row, column, 'axisYUpper');
    }
    changeAxis('axisYUpper');
    position = 1;
  } if (axisYBelow) {
    row = correcRow + position;
    column = correcColumn;
    if (properHit(row, column)) {
      return markHitLocation(row, column, 'axisYBelow');
    }
    changeAxis('axisYBelow');
    position = 1;
  }
  if (randomShot) {
    const randomRow = random(0, 10);
    const randomColumn = random(0, 10);
    if (randomHitCoord.includes(`${randomRow}${randomColumn}`)) {
      return aiHit();
    }

    randomHitCoord.push(`${randomRow}${randomColumn}`);
    await sleep(300);

    const innerDiv = document.querySelector(`.row-${randomRow} .box-${randomColumn}`);
    if (player1.gameboard.board[randomRow][randomColumn] === 1) {
      innerDiv.classList.add('x');
      correcRow = randomRow;
      correcColumn = randomColumn;
      axisXLeft = true;
      axisXRight = false;
      axisYUpper = false;
      axisYBelow = false;
      randomShot = false;
    } else {
      innerDiv.classList.add('o');
    }

    player2.attack(player1, [randomRow, randomColumn]);
  }

  return true;
}
function aiReset() {
  randomHitCoord.splice(0, randomHitCoord.length);
  position = 1;
  randomShot = true;
  axisXLeft = false;
  axisXRight = false;
  axisYUpper = false;
  axisYBelow = false;
}
export { aiHit, aiReset };
