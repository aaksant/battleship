import Ship from './Ship';

export default class Board {
  constructor() {
    this.size = 10;
    this.grid = Array(this.size)
      .fill()
      .map(() => Array(this.size).fill(null));
    this.missedAttempts = [];
  }

  isInsideBoard(row, col) {
    if (row < 0 || col < 0 || row > this.size - 1 || col > this.size - 1) {
      return false;
    }
  }

  isFitInBoard(ship, row, col, isVertical) {
    if (isVertical) {
      if (row + ship.length > this.size) return false;
    } else {
      if (col + ship.length > this.size) return false;
    }
  }

  isPlaceTaken(ship, row, col, isVertical) {
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        // If a cell is not a null
        const rowCell = this.grid[row + i][col];
        if (rowCell) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        const colCell = this.grid[row][col + 1];
        if (colCell) return false;
      }
    }
  }
}
