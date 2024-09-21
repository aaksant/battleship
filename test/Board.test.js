import Board from '../src/modules/Board';
import Ship from '../src/modules/Ship';
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('Board test', () => {
  let board;
  let ship;

  beforeEach(() => {
    board = new Board();
    ship = new Ship(3);
  });

  test('initialize board object', () => {
    expect(board).toEqual({
      size: 10,
      grid: Array(10)
        .fill()
        .map(() => Array(10).fill(null)),
      missedAttempts: []
    });
  });

  describe('isInsideBoard', () => {
    test('valid positions return true', () => {
      expect(board.isInsideBoard(0, 0)).toBe(true);
      expect(board.isInsideBoard(9, 9)).toBe(true);
      expect(board.isInsideBoard(5, 5)).toBe(true);
    });

    test('invalid positions return false', () => {
      expect(board.isInsideBoard(-1, 5)).toBe(false);
      expect(board.isInsideBoard(0, -1)).toBe(false);
      expect(board.isInsideBoard(10, 5)).toBe(false);
      expect(board.isInsideBoard(5, 10)).toBe(false);
    });
  });

  describe('isWholeShipInBoard', () => {
    test('ships completely inside board return true', () => {
      expect(board.isWholeShipInBoard(ship, 0, 0, true)).toBe(true);
      expect(board.isWholeShipInBoard(ship, 0, 0, false)).toBe(true);
      expect(board.isWholeShipInBoard(ship, 7, 7, true)).toBe(true);
      expect(board.isWholeShipInBoard(ship, 7, 7, false)).toBe(true);
    });

    test('ships partially outside board return false', () => {
      expect(board.isWholeShipInBoard(ship, 8, 0, true)).toBe(false);
      expect(board.isWholeShipInBoard(ship, 0, 8, false)).toBe(false);
    });
  });

  describe('isPlaceTaken', () => {
    beforeEach(() => {
      board.placeShip(new Ship(2), 0, 0, true);
    });

    test('empty places return false', () => {
      expect(board.isPlaceTaken(ship, 3, 3, true)).toBe(false);
      expect(board.isPlaceTaken(ship, 3, 3, false)).toBe(false);
    });

    test('occupied places return true', () => {
      expect(board.isPlaceTaken(ship, 0, 0, true)).toBe(true);
      expect(board.isPlaceTaken(ship, 0, 0, false)).toBe(true);
    });

    test('places outside board return true', () => {
      expect(board.isPlaceTaken(ship, -1, 0, true)).toBe(true);
      expect(board.isPlaceTaken(ship, 0, 10, false)).toBe(true);
    });
  });

  describe('placeShip', () => {
    test('successfully place ship', () => {
      expect(board.placeShip(ship, 0, 0, true)).toBe(true);
      expect(board.grid[0][0]).toBe(ship);
      expect(board.grid[1][0]).toBe(ship);
      expect(board.grid[2][0]).toBe(ship);
    });

    test('fail to place ship outside board', () => {
      expect(board.placeShip(ship, 8, 0, true)).toBe(false);
    });

    test('fail to place ship on occupied space', () => {
      board.placeShip(ship, 0, 0, true);
      expect(board.placeShip(new Ship(2), 0, 0, false)).toBe(false);
    });
  });
});
