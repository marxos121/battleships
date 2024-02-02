class Ship {
  #length;
  #hitpoints;

  constructor(length) {
    this.#length = this.#hitpoints = length;
  }

  hit() {
    this.#hitpoints = this.#hitpoints > 0 ? this.#hitpoints - 1 : 0;
  }

  get length() {
    return this.#length;
  }

  get hitpoints() {
    return this.#hitpoints;
  }

  get isSunk() {
    return this.#hitpoints <= 0;
  }
}

//export default Ship;
module.exports = Ship;
