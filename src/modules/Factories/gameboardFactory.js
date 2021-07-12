/* eslint-disable prefer-destructuring */
import shipFactory from './shipFactory';

function gameboardFactory() {
  const board = [];
  // To create gameboard
  for (let i = 0; i < 10; i += 1) {
    const row = new Array(10).fill(0);
    board.push(row);
  }

  let isGameover = false;

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
      isGameover = true;
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
    if (ship.details.direction === 'vertical') {
      for (let i = 0; i < ship.shipSize.length; i += 1) {
        board[position[0] + i].splice(position[1], 1, 1);
      }
      return recordShips(position, ship, 'vertical');
    }
    if (checkCoordinates(position, ship)) {
      console.log('This place is occupied');
      return false;
    }
    board[position[0]].splice(position[1], ship.shipSize.length, ...ship.shipSize);
    return recordShips(position, ship);
  }

  function hitTheShip(name, damagedPosition) {
    switch (name) {
      case 'carrier':
        carrier.hit(damagedPosition);
        if (carrier.isSink()) {
          carrier.details.isSunk = true;
        }
        break;

      case 'battleship':
        battleship.hit(damagedPosition);
        if (battleship.isSink()) {
          battleship.details.isSunk = true;
        }
        break;

      case 'cruiser':
        cruiser.hit(damagedPosition);
        if (cruiser.isSink()) {
          cruiser.details.isSunk = true;
        }
        break;

      case 'destroyer1':
        destroyer1.hit(damagedPosition);
        if (destroyer1.isSink()) {
          destroyer1.details.isSunk = true;
        }
        break;

      case 'destroyer2':
        destroyer2.hit(damagedPosition);
        if (destroyer2.isSink()) {
          destroyer2.details.isSunk = true;
        }
        break;

      default:
        return false;
    }
    if (gameover()) {
      return console.log('Gameover');
    }
    return 'Right on spot!';
  }

  function calculateHitLoc(coord) {
    const receivedCoord = fleet.filter((val) => val.details.row === coord[0]
      || val.details.column === coord[1]);

    let damagedShip;
    let damagedPosition;

    if (receivedCoord[0].details.direction === 'vertical') {
      damagedShip = receivedCoord.filter((val) => val.details.position.includes(coord[0]));
      damagedPosition = damagedShip[0].details.position.indexOf(coord[0]);
    } else {
      damagedShip = receivedCoord.filter((val) => val.details.position.includes(coord[1]));
      damagedPosition = damagedShip[0].details.position.indexOf(coord[1]);
    }
    const name = damagedShip[0].details.name;
    return hitTheShip(name, damagedPosition);
  }

  function receiveAttack(coord) {
    if (board[coord[0]][coord[1]] === '#') {
      return console.log('That coordinates already hit');
    }
    if (board[coord[0]][coord[1]] === 1) {
      console.log('succesfull hit!');
      board[coord[0]][coord[1]] = '#';
      return calculateHitLoc(coord);
    }
    /// ////////////////////////////////
    // eslint-disable-next-line no-return-assign
    return board[coord[0]][coord[1]] = '#';
  }
  return {
    board, isGameover, fleet, placeShip, receiveAttack,
  };
}

export default gameboardFactory;
