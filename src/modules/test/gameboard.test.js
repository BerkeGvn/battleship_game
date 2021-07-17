/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import gameboardFactory from '../Factories/gameboardFactory';

const gameboard = gameboardFactory();

test('Gameboard is correct size', () => {
  expect(gameboard.board[0][0]).toBe(0);
});

test('Gameboard is correct size', () => {
  expect(gameboard.board[9][9]).toBe(0);
});

test('Place ship to correct coord', () => {
  gameboard.placeShip([1, 0], gameboard.fleet[0]);
  expect(gameboard.board[1][0]).toBe(1);
});

test('Place ship to correct coord', () => {
  gameboard.placeShip([4, 3], gameboard.fleet[2]);
  expect(gameboard.board[4][5]).toBe(1);
});

test('Get ship details correct', () => {
  gameboard.placeShip([6, 0], gameboard.fleet[2]);
  expect(gameboard.board[4][5]).toBe(1);
});

test('Hit the ship', () => {
  gameboard.placeShip([0, 0], gameboard.fleet[0]);
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.fleet[0].shipSize).toEqual(['X', 1, 1, 1, 1]);
});

test('Hit the ship', () => {
  gameboard.receiveAttack([0, 4]);
  expect(gameboard.fleet[0].shipSize).toEqual(['X', 1, 1, 1, 'X']);
});
test('Hit the ship from all locations', () => {
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);
  gameboard.receiveAttack([0, 3]);
  expect(gameboard.fleet[0].shipSize).toEqual(['X', 'X', 'X', 'X', 'X']);
});

/* test('Already hit', () => {
  expect(gameboard.receiveAttack([0, 1])).toBe('That coordinates already hit');
}); */

test('Is the ship sunk?', () => {
  expect(gameboard.fleet[0].isSink()).toBe(true);
});

test('Hit the vertical ship', () => {
  gameboard.fleet[1].details.direction = 'vertical';
  gameboard.placeShip([0, 9], gameboard.fleet[1]);
  gameboard.receiveAttack([1, 9]);
  expect(gameboard.fleet[1].shipSize).toEqual([1, 'X', 1, 1]);
});

test('Hit the vertical ship', () => {
  gameboard.placeShip([0, 9], gameboard.fleet[1]);
  gameboard.receiveAttack([3, 9]);
  expect(gameboard.fleet[1].shipSize).toEqual([1, 'X', 1, 'X']);
});
