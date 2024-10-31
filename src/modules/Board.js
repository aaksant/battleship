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
        if (this.d[i][j] === ship) {
          if (i === hitRow) {
            return hitCol - j;
          } else if (j === hitCol) {
            return hitRow - i;
          }
        }
      }
    }
  }

  getShipPosition(ship) {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.grid[row][col] === ship) {
          // Check orientation by checking next position
          const isVertical =
            row + 1 < this.size && this.grid[row + 1][col] === ship;

          return {
            startRow: row,
            startCol: col,
            length: ship.length,
            isVertical
          };
        }
      }
    }
  }

  copyFrom(sourceBoard) {
    this.grid = this.createGrid(true);
    this.attackGrid = this.createGrid(false);

    const placedShip = new Set();

    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const ship = sourceBoard.grid[row][col];

        if (ship instanceof Ship && !placedShip.has(ship)) {
          const shipPosition = sourceBoard.getShipPosition(ship);

          const newShip = new Ship(ship.length);
          this.placeShip(
            newShip,
            shipPosition.startRow,
            shipPosition.startCol,
            shipPosition.isVertical
          );

          placedShip.add(ship);
        }
      }
    }
  }
  receiveAttack(row, col) {
    if (!this.isInsideBoard(row, col) || this.attackGrid[row][col])
      return false;

    this.attackGrid[row][col] = true;

    if (this.grid[row][col] instanceof Ship) {
      const ship = this.grid[row][col];
      const partIndex = this.getPartIndex(ship, row, col);
      ship.hit(partIndex);

      return true;
    }

    return false;
  }

  isGameOver() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (
          this.grid[row][col] instanceof Ship &&
          !this.grid[row][col].isSunk()
        ) {
          return false;
        }
      }
    }

    return true;
  }
}
