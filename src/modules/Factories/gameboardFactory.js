import shipFactory from './shipFactory';

function gameboardFactory() {
  const board = [];
  // To create gameboard
  for (let i = 0; i < 10; i += 1) {
    const row = new Array(10).fill(0);
    board.push(row);
  }

  // Teams entire fleet
  const carrier = shipFactory(5, 'carrier');
  const battleship = shipFactory(4, 'battleship', 'vertical');
  const cruiser = shipFactory(3, 'cruiser');
  const destroyer1 = shipFactory(2, 'destroyer1');
  const destroyer2 = shipFactory(2, 'destroyer2');

  // Saving them in array for accessing them more easily and edit them
  const fleet = [
    carrier,
    battleship,
    cruiser,
    destroyer1,
    destroyer2,
  ];

  function gameover() {
    if (fleet.every((ship) => ship.details.isSunk === true)) {
      return true;
    }
    return false;
  }
  // Recording ship's location for receive correct hit location
  function recordShips(shipPosition, ship) {
    const recordTheShip = ship;

    recordTheShip.details.position = [];

    if (ship.details.direction === 'vertical') {
      recordTheShip.details.column = shipPosition[1];
      let row = shipPosition[0];
      while (recordTheShip.details.position.length < recordTheShip.shipSize.length) {
        recordTheShip.details.position.push(row);
        row += 1;
      }
    } else {
      recordTheShip.details.row = shipPosition[0];
      let column = shipPosition[1];
      while (recordTheShip.details.position.length < recordTheShip.shipSize.length) {
        recordTheShip.details.position.push(column);
        column += 1;
      }
    }
  }
  // Preventing board elements to be more than 10
  function preventOverExtend(position, ship) {
    if (ship.details.direction === 'vertical' && position[0] + ship.shipSize.length > 10) {
      return true;
    } if (ship.details.direction === 'horizontal' && position[1] + ship.shipSize.length > 10) {
      return true;
    }
    return false;
  }

  // Checking coordinates if there is a ship already
  function checkCoordinates(coord, ship) {
    let j;
    if (ship.details.direction === 'vertical') {
      j = coord[0];
      for (let i = 0; i < ship.shipSize.length; i += 1) {
        if (board[j + i][coord[1]] === 1) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < ship.shipSize.length; i += 1) {
        j = coord[1];
        if (board[coord[0]][j + i] === 1) {
          return true;
        }
      }
    }
    return false;
  }

  function placeShip(position, ship) {
    if (preventOverExtend(position, ship)) {
      return false;
    }
    if (checkCoordinates(position, ship)) {
      return false;
    }

    if (ship.details.direction === 'vertical') {
      for (let i = 0; i < ship.shipSize.length; i += 1) {
        board[position[0] + i].splice(position[1], 1, 1);
      }
      recordShips(position, ship, 'vertical');
      return true;
    }

    board[position[0]].splice(position[1], ship.shipSize.length, ...ship.shipSize);
    recordShips(position, ship);
    return true;
  }

  function hitTheShip(name, damagedPosition) {
    const shipIndex = fleet.findIndex((ship) => ship.details.name === name);
    fleet[shipIndex].hit(damagedPosition);
    if (fleet[shipIndex].isSink()) {
      fleet[shipIndex].details.isSunk = true;
    }
  }

  function calculateHitLoc(coord) {
    const receivedCoord = fleet.filter((val) => (val.details.row === coord[0]
      && val.details.position.includes(coord[1]))
      || (val.details.column === coord[1]
        && val.details.position.includes(coord[0])));

    let damagedShip;
    let damagedPosition;

    if (receivedCoord[0].details.direction === 'vertical') {
      damagedShip = receivedCoord.filter((val) => val.details.position.includes(coord[0]));
      damagedPosition = damagedShip[0].details.position.indexOf(coord[0]);
    } else {
      damagedShip = receivedCoord.filter((val) => val.details.position.includes(coord[1]));
      damagedPosition = damagedShip[0].details.position.indexOf(coord[1]);
    }

    const { name } = damagedShip[0].details;
    return hitTheShip(name, damagedPosition);
  }

  function receiveAttack(coord) {
    if (board[coord[0]][coord[1]] === '#') {
      return false;
    }
    if (board[coord[0]][coord[1]] === 1) {
      board[coord[0]][coord[1]] = '#';
      return calculateHitLoc(coord);
    }

    return board[coord[0]][coord[1]] = '#';
  }
  return {
    board, gameover, fleet, placeShip, receiveAttack,
  };
}

export default gameboardFactory;
