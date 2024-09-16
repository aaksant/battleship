import Ship from '../src/modules/Ship';
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('Ship test', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship();
  });

  test('initialize ship object', () => {
    expect(ship).toEqual({ length: 3, hitCount: 0, sink: false });
  });

  test('ship takes a hit', () => {
    ship.hit();
    expect(ship.length).toBe(ship.length--);
  });

  test('ship takes a hit until it sank', () => {
    for (let i = 0; i < ship.length; i++) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});
