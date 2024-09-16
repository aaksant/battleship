export default class Ship {
  constructor() {
    // Largest ship has the length of 3
    this.length = 3;
    this.hitCount = 0;
    this.sink = false;
  }

  hit() {
    this.hitCount++;
  }

  isSunk() {
    return this.hitCount === this.length;
  }
}