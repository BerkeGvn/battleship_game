import { container, ships } from './domElements';
import createGrid from './grid';
import { player2, resetPlayers } from './players';
import dragAndRotate from './dragAndRotate';
import { randomPlacement, enemyship } from './game';

function removeGrids() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function displayShipContainer() {
  ships.forEach((ship) => ship.classList.remove('none'));
}

function render() {
  removeGrids();

  createGrid();

  const cells = document.querySelectorAll('.box');
  dragAndRotate.drag(cells);
  displayShipContainer();
  resetPlayers();
  randomPlacement(player2);
  enemyship();
  console.log(player2.gameboard.board);
  console.log(player2.gameboard.fleet);
}

export default render;
