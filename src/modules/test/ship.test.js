/* eslint-disable no-undef */
import shipFactory from '../Factories/shipFactory';

const ship = shipFactory(4);

test('Ship is sunk', () => {
  expect(ship.hit(0)).toEqual(['X', 1, 1, 1]);
});

test('Correct part is hit', () => {
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);
  expect(ship.hit(3)).toBe(true);
});
