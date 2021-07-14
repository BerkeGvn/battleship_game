import { player1, player2 } from './players';
import { random, sleep } from './helpers';
import createGrid from './grid';

createGrid();

function checkGameover() {
  if (player1.gameboard.gameover()) {
    console.log('Player 2 wins!');
  }
  if (player2.gameboard.gameover()) {
    console.log('Player 1 wins!');
  }
}

let playerTurn = true;

function checkAgain(player, ship) {
  const randomRow = random(0, 9);
  const randomColm = random(0, 9);
  const properPlaced = player.gameboard.placeShip([randomRow, randomColm], ship);
  if (properPlaced) {
    player.gameboard.placeShip([randomRow, randomColm], ship);

    return true;
  }
  return checkAgain(player, ship);
}

function randomPlacement(player) {
  player.gameboard.fleet.forEach((ship) => {
    let randomRow = random(0, 9);
    let randomColm = random(0, 9);
    const properPlaced = player.gameboard.placeShip([randomRow, randomColm], ship);
    if (properPlaced) {
      player.gameboard.placeShip([randomRow, randomColm], ship);
      randomRow = random(0, 9);
      randomColm = random(0, 9);
    } else {
      checkAgain(player, ship);
    }
  });
}
randomPlacement(player2);
async function randomHit() {
  const randomRow = random(0, 10);
  const randomColm = random(0, 10);
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
// for testing
function enemyship() {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (player2.gameboard.board[i][j] === 1) {
        const innerDiv = document.querySelector(`.row-2-${i} .box-2-${j}`);
        innerDiv.classList.add('black');
      }
    }
  }
}

enemyship();

markShipDivs();

function hitEvent() {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const innerDiv = document.querySelector(`.row-2-${i} .box-2-${j}`);
      // eslint-disable-next-line no-loop-func
      innerDiv.addEventListener('click', (e) => {
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

function game() {
  hitEvent();
}

export {
  game, markShipDivs, randomPlacement, enemyship,
};
