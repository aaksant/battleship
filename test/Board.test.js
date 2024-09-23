import Board from '../src/modules/Board';
import Ship from '../src/modules/Ship';
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('Board test', () => {
  let board;
  let verticalShip;
  let horizontalShip;

  beforeEach(() => {
    board = new Board();
    verticalShip = new Ship(3);
    horizontalShip = new Ship(3);
  });

  test('initialize board object', () => {
    expect(board.size).toBe(10);
    expect(board.grid).toHaveLength(10);
    expect(board.grid[0]).toHaveLength(10);
    expect(board.attackGrid).toHaveLength(10);
    expect(board.attackGrid[0]).toHaveLength(10);
    expect(board.attackGrid[0][0]).toBe(false);
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
      expect(board.isWholeShipInBoard(verticalShip, 0, 0, true)).toBe(true);
      expect(board.isWholeShipInBoard(horizontalShip, 0, 0, false)).toBe(true);
      expect(board.isWholeShipInBoard(verticalShip, 7, 7, true)).toBe(true);
      expect(board.isWholeShipInBoard(horizontalShip, 7, 7, false)).toBe(true);
    });

    test('ships partially outside board return false', () => {
      expect(board.isWholeShipInBoard(verticalShip, 8, 0, true)).toBe(false);
      expect(board.isWholeShipInBoard(horizontalShip, 0, 8, false)).toBe(false);
    });
  });

  describe('isPlaceTaken', () => {
    beforeEach(() => {
      board.placeShip(new Ship(2), 0, 0, true);
    });

    test('empty places return false', () => {
      expect(board.isPlaceTaken(verticalShip, 3, 3, true)).toBe(false);
      expect(board.isPlaceTaken(horizontalShip, 3, 3, false)).toBe(false);
    });

    test('occupied places return true', () => {
      expect(board.isPlaceTaken(verticalShip, 0, 0, true)).toBe(true);
      expect(board.isPlaceTaken(horizontalShip, 0, 0, false)).toBe(true);
    });

    test('places outside board return true', () => {
      expect(board.isPlaceTaken(verticalShip, -1, 0, true)).toBe(true);
      expect(board.isPlaceTaken(horizontalShip, 0, 10, false)).toBe(true);
    });
  });

  describe('placeShip', () => {
    test('successfully place ship', () => {
      expect(board.placeShip(verticalShip, 0, 0, true)).toBe(true);
      expect(board.grid[0][0]).toBe(verticalShip);
      expect(board.grid[1][0]).toBe(verticalShip);
      expect(board.grid[2][0]).toBe(verticalShip);
    });

    test('fail to place ship outside board', () => {
      expect(board.placeShip(verticalShip, 8, 0, true)).toBe(false);
    });

    test('fail to place ship on occupied space', () => {
      board.placeShip(verticalShip, 0, 0, true);
      expect(board.placeShip(horizontalShip, 0, 0, false)).toBe(false);
    });
  });

  describe('receiveAttack', () => {
    beforeEach(() => {
      board.placeShip(verticalShip, 0, 0, true);
      board.placeShip(horizontalShip, 5, 5, false);
    });

    test('hit attack on vertical ship', () => {
      expect(board.receiveAttack(0, 0)).toBe(true);
      expect(board.attackGrid[0][0]).toBe(true);
      expect(verticalShip.hits).toContain(0);
    });

    test('hit attack on horizontal ship', () => {
      expect(board.receiveAttack(5, 5)).toBe(true);
      expect(board.attackGrid[5][5]).toBe(true);
      expect(horizontalShip.hits).toContain(0);
    });

    test('miss attack', () => {
      board.receiveAttack(5, 5);
      expect(board.attackGrid[5][5]).toBe(true);
    });

    test('attack same position twice', () => {
      board.receiveAttack(0, 0);
      expect(board.receiveAttack(0, 0)).toBe(false);
    });

    test('attack outside board', () => {
      expect(board.receiveAttack(10, 10)).toBe(false);
    });
  });
});
