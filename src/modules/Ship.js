export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
  }

  hit(partIndex) {
    if (partIndex < 0 || partIndex >= this.length || this.hits.includes(partIndex)) {
      return;
    }
    this.hits.push(partIndex);
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}