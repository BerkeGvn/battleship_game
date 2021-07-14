/* eslint-disable import/no-mutable-exports */
import Player from './Factories/Player';

let player1 = Player();
let player2 = Player(true);

function resetPlayers() {
  player1 = Player();
  player2 = Player(true);
}

/* player2.gameboard.placeShip([0, 4], player2.gameboard.fleet[0]);
player2.gameboard.placeShip([1, 9], player2.gameboard.fleet[1]);
player2.gameboard.placeShip([0, 0], player2.gameboard.fleet[2]);
player2.gameboard.placeShip([3, 0], player2.gameboard.fleet[3]);
player2.gameboard.placeShip([4, 0], player2.gameboard.fleet[4]); */

export { player1, player2, resetPlayers };
