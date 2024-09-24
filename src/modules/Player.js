export default class Player {
  constructor(name) {
    this.name = name;
    this.attackedCoords = new Set();
  }

  isAlreadyAttacked(x, y) {
    return this.attackedCoords.has(`${x}, ${y}`);
  }

  attack(x, y, board) {
    if (this.isAlreadyAttacked(x, y)) return false;

    this.attackedCoords.add(`${x}, ${y}`);
    return board.receiveAttack(x, y);
  }

  randomAttack(board) {
    let x, y;
    // Set x and y first
    do {
      x = Math.floor(Math.random() * board.size);
      y = Math.floor(Math.random() * board.size);
    } while (this.isAlreadyAttacked(x, y));

    return this.attack(x, y, board);
  }
}
