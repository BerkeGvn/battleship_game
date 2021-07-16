import {
  container, ships, fleetContainer, resultScreen,
} from './domElements';
import createGrid from './grid';
import { player2, resetPlayers, randomPlacement } from './players';
import dragAndRotate from './dragAndRotate';
import { randomHitCoord } from './game';

function resetDomElements() {
  fleetContainer.classList.remove('shrink');
  resultScreen.classList.add('none');
}

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
  resetDomElements();
  // This resets already hit locations
  randomHitCoord.splice(0, randomHitCoord.length);
}

export default render;
