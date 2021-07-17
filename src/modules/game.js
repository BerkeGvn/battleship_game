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

async function randomHit() {
  aiHit();
  checkGameover();
  playerTurn = true;
  return playerTurn;
}

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
