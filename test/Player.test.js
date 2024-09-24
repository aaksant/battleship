import Ship from '../src/modules/Ship';
import Board from '../src/modules/Board';
import Player from '../src/modules/Player';
import { beforeEach, describe, expect, test } from '@jest/globals';

describe('Player', () => {
  let ship;
  let board;
  let player;

  beforeEach(() => {
    ship = new Ship(3);
    board = new Board();
    player = new Player('foo');
  });

  test('initialize player object', () => {
    expect(player.name).toBe('foo');
    expect(player.attackedCoords.size).toBe(0);
  });

  describe('attack', () => {
    beforeEach(() => {
      board.placeShip(ship, 0, 0, true);
    });

    test('player attacks and hits', () => {
      player.attack(0, 0, board);
      player.attack(1, 0, board);
      player.attack(2, 0, board);

      expect(player.attackedCoords.has('0, 0')).toBe(true);
      expect(player.attackedCoords.has('1, 0')).toBe(true);
      expect(player.attackedCoords.has('2, 0')).toBe(true);
      expect(board.isGameOver()).toBe(true);
    });

    test('player attacks and misses', () => {
      player.attack(5, 5, board);
      expect(player.attackedCoords.has('5, 5')).toBe(true);
    });

    test('player cannot attack the same coordinates twice', () => {
      player.attack(0, 0, board);
      expect(player.attack(0, 0, board)).toBe(false);
      expect(player.attackedCoords.size).toBe(1);
    });
  });

  describe('randomAttack', () => {
    test('random attack until all cell is hitted', () => {
      board.placeShip(ship, 0, 0, true);

      for (let i = 0; i < 100; i++) {
        player.randomAttack(board);
      }

      expect(board.isGameOver()).toBe(true);
    });
  });
});
