import { player1 } from './players';
import { markShipDivs } from './game';

const dragAndRotate = (() => {
  const ships = document.querySelectorAll('.ships');
  const gridCells = document.querySelectorAll('.box');

  let shipIndex;
  let draggedShip;

  function rotate() {
    ships.forEach((ship) => {
      ship.addEventListener('dblclick', () => {
        if (player1.gameboard.fleet[shipIndex].details.direction === 'horizontal') {
          player1.gameboard.fleet[shipIndex].details.direction = 'vertical';
          ship.classList.remove('horizontal');
          ship.classList.add('vertical');
        } else {
          player1.gameboard.fleet[shipIndex].details.direction = 'horizontal';
          ship.classList.remove('vertical');
          ship.classList.add('horizontal');
        }
      });
    });
  }

  function drag(cells = gridCells) {
    const getDraggedShipIndex = (e) => {
    // eslint-disable-next-line max-len
      shipIndex = player1.gameboard.fleet.findIndex((ship) => ship.details.name === e.target.dataset.name);
    };

    const dragStart = (e) => {
      draggedShip = e.target;
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
        /* draggedShip.parentElement.removeChild(draggedShip); */
        draggedShip.classList.add('none');
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
  return { rotate, drag };
})();

export default dragAndRotate;
