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
    return row >= 0 && col >= 0 && row < this.size && col < this.size;
  }

  isWholeShipInBoard(ship, row, col, isVertical) {
    if (isVertical) {
      return row + ship.length <= this.size;
    } else {
      return col + ship.length <= this.size;
    }
  }

  isPlaceTaken(ship, row, col, isVertical) {
    for (let i = 0; i < ship.length; i++) {
      const checkRow = isVertical ? row + i : row;
      const checkCol = isVertical ? col : col + i;

      if (
        !this.isInsideBoard(checkRow, checkCol) ||
        this.grid[checkRow][checkCol] !== null
      ) {
        return true;
      }
    }

    return false;
  }
}
