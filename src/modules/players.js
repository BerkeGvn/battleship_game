import Player from './Factories/Player';
import { random } from './helpers';

let player1 = Player();
let player2 = Player();

function resetPlayers() {
  player1 = Player();
  player2 = Player(true);
}
function randomDirection(player) {
  player.gameboard.fleet.forEach((ship) => {
    const position = random(0, 2);
    if (position === 1) {
      ship.details.direction = 'vertical';
    }
  });
}

function randomNumbers(player, ship, placedCoord) {
  const randomRow = random(0, 9);
  const randomColumn = random(0, 9);
  const properPlaced = player.gameboard.placeShip([randomRow, randomColumn], ship);
  if (!placedCoord.includes(`${randomRow}${randomColumn}`) && properPlaced) {
    return [randomRow, randomColumn];
  }
  return randomNumbers(player, ship, placedCoord);
}

function randomPlacement(player) {
  const placedCoord = [];
  randomDirection(player);
  player.gameboard.fleet.forEach((ship) => {
    const randomCoord = randomNumbers(player, ship, placedCoord);
    placedCoord.push(`${randomCoord[0]}${randomCoord[1]}`);
    c;
    player.gameboard.placeShip(randomCoord, ship);
  });
}
randomPlacement(player2);
export {
  player1, player2, resetPlayers, randomPlacement,
};
