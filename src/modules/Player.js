export default class Player {
  constructor(name) {
    this.name = name;
    this.attackedCoords = new Set();
  }

  isAlreadyAttacked(row, col) {
    return this.attackedCoords.has(`${row}, ${col}`);
  }

  attack(row, col, board) {
    if (this.isAlreadyAttacked(row, col)) return false;

    this.attackedCoords.add(`${row}, ${col}`);
    return board.receiveAttack(row, col);
  }

  randomAttack(board) {
    let row, col;
    // Set x and y first
    do {
      row = Math.floor(Math.random() * board.size);
      col = Math.floor(Math.random() * board.size);
    } while (this.isAlreadyAttacked(row, col));

    return this.attack(row, col, board);
  }
}
