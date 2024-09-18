import Ship from '../src/modules/Ship';
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('Ship test', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('initialize ship object', () => {
    expect(ship).toEqual({ length: 3, hits: [], sink: false });
  });

  test('ship takes a hit in valid position', () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);

    expect(ship.hits).toContain(0);
    expect(ship.hits).toContain(1);
    expect(ship.hits).toContain(2);
    expect(ship.hits).toHaveLength(3);
    expect(ship.isSunk()).toBe(true);
  });

  test('repeated hit position would be ignored', () => {
    ship.hit(1);
    ship.hit(1);
    expect(ship.hits).toHaveLength(1);
  });

  test('negative hit position would be ignored', () => {
    ship.hit(-1);
    expect(ship.hits).toHaveLength(0);
  });

  test('hit position that is greater than ship length would be ignored', () => {
    ship.hit(3);
    expect(ship.hits).toHaveLength(0);
  });
});
