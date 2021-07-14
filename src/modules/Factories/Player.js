import gameboardFactory from './gameboardFactory';

function Player() {
  const gameboard = gameboardFactory();

  function attack(enemy, coord) {
    return enemy.gameboard.receiveAttack(coord);
  }

  return { gameboard, attack };
}

export default Player;
