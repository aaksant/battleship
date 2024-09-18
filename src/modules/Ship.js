export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
    this.sink = false;
  }

  hit() {
    this.hitCount++;
  }

  isSunk() {
    return this.hitCount === this.length;
  }
}