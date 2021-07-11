import gameboardFactory from './gameboardFactory';

function Player() {
  const gameboard = gameboardFactory();

  function attack(enemy, coord) {
    console.log(enemy.gameboard.board);
    return enemy.gameboard.receiveAttack(coord);
  }
  return { gameboard, attack };
}

export default Player;
