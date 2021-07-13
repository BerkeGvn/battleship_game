import Player from './Factories/Player';

const player1 = Player();
const player2 = Player();
/* player1.gameboard.placeShip([0, 4], player1.gameboard.fleet[0]);
player1.gameboard.placeShip([1, 9], player1.gameboard.fleet[1]);
player1.gameboard.placeShip([0, 0], player1.gameboard.fleet[2]);
player1.gameboard.placeShip([3, 0], player1.gameboard.fleet[3]);
player1.gameboard.placeShip([5, 0], player1.gameboard.fleet[4]); */

player2.gameboard.placeShip([0, 4], player2.gameboard.fleet[0]);
player2.gameboard.placeShip([1, 9], player2.gameboard.fleet[1]);
player2.gameboard.placeShip([0, 0], player2.gameboard.fleet[2]);
player2.gameboard.placeShip([3, 0], player2.gameboard.fleet[3]);
player2.gameboard.placeShip([4, 0], player2.gameboard.fleet[4]);

export { player1, player2 };
