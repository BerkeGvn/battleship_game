import { player1 } from './players';
import { markShipDivs } from './dom';

const ships = document.querySelectorAll('.ships');
const cells = document.querySelectorAll('.box');

function drag() {
  let shipIndex;
  let draggedShip;
  const getDraggedShipIndex = (e) => {
    // eslint-disable-next-line max-len
    shipIndex = player1.gameboard.fleet.findIndex((ship) => ship.details.name === e.target.dataset.name);
    console.log(shipIndex);
  };
  const dragStart = (e) => {
    draggedShip = e.target;
    console.log(draggedShip);
  };

  const dragOver = (e) => e.preventDefault();

  const dragEnter = (e) => {
    e.preventDefault();
    e.target.classList.add('hover');
  };

  const dragLeave = (e) => {
    e.target.classList.remove('hover');
  };

  const dragDrop = (e) => {
    const coord = e.target;
    const y = Number(coord.dataset.y);
    const x = Number(coord.dataset.x);

    const properPlaced = player1.gameboard.placeShip([y, x], player1.gameboard.fleet[shipIndex]);
    if (properPlaced) {
      draggedShip.parentElement.removeChild(draggedShip);
    }

    markShipDivs();
    e.target.classList.remove('hover');
  };

  cells.forEach((cell) => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dragDrop);
  });
  ships.forEach((ship) => {
    ship.addEventListener('mousedown', getDraggedShipIndex);
    ship.addEventListener('dragstart', dragStart);
  });
}

export default drag;
