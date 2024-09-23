import Ship from './Ship';

export default class Board {
  constructor() {
    this.size = 10;
    this.grid = this.createGrid(true);
    this.attackGrid = this.createGrid(false);
  }

  createGrid(isShipGrid) {
    return Array(this.size)
      .fill()
      .map(() => Array(this.size).fill(isShipGrid ? null : false));
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

  isValidPlacement(ship, row, col, isVertical) {
    return (
      this.isInsideBoard(row, col) &&
      this.isWholeShipInBoard(ship, row, col, isVertical) &&
      !this.isPlaceTaken(ship, row, col, isVertical)
    );
  }

  placeShip(ship, row, col, isVertical) {
    if (!this.isValidPlacement(ship, row, col, isVertical)) return false;

    for (let i = 0; i < ship.length; i++) {
      if (isVertical) {
        this.grid[row + i][col] = ship;
      } else {
        this.grid[row][col + i] = ship;
      }
    }

    return true;
  }

  getPartIndex(ship, hitRow, hitCol) {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] === ship) {
          if (i === hitRow) {
            return hitCol - j;
          } else if (j === hitCol) {
            return hitRow - i;
          }
        }
      }
    }
  }

  receiveAttack(row, col) {
    if (!this.isInsideBoard(row, col)) return false;

    if (this.grid[row][col] instanceof Ship) {
      const ship = this.grid[row][col];
      const partIndex = this.getPartIndex(ship, row, col);

      ship.hit(partIndex);
      return true;
    } else {
      this.missedAttempts.push({ row, col });
      return false;
    }
  }
}
