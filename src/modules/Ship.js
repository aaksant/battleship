export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
    this.sink = false;
  }

  hit(pos) {
    if (pos < 0 || pos >= this.length || this.hits.includes(pos)) {
      return;
    }
    this.hits.push(pos);
  }

  isSunk() {
    return this.hitCount === this.length;
  }
}