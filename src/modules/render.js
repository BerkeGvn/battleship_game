import {
  container, ships, fleetContainer, resultScreen, randomBtn,
} from './domElements';
import createGrid from './grid';
import { player2, resetPlayers, randomPlacement } from './players';
import dragAndRotate from './dragAndRotate';
import { aiReset } from './ai';

function resetDomElements() {
  fleetContainer.classList.remove('shrink');
  resultScreen.classList.add('none');
  randomBtn.classList.add('fadein');
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
  aiReset();
}

export default render;
