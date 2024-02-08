const Ship = require("./ship");

class Gameboard {
  #board;
  #ships = [];

  constructor(size) {
    this.#board = new Array(size);
    for (let i = 0; i < size; ++i) {
      this.#board[i] = new Array(size).fill(null);
    }
  }

  #validateCoords(row, col) {
    return !(
      row < 0 ||
      row >= this.#board.length ||
      col < 0 ||
      col >= this.#board[0].length
    );
  }

  #placeVertically(length, startRow, startCol) {
    if (startRow + length > this.#board.length) {
      return false;
    }
    for (let i = 0; i < length; ++i) {
      if (this.#board[startRow + i][startCol] !== null) {
        return false;
      }
    }

    const ship = new Ship(length);
    for (let i = 0; i < length; ++i) {
      this.#board[startRow + i][startCol] = ship;
    }
    this.#ships.push(ship);
    return true;
  }

  #placeHorizontally(length, startRow, startCol) {
    if (startCol + length > this.#board[0].length) {
      return false;
    }

    for (let i = 0; i < length; ++i) {
      if (this.#board[startRow][startCol + i] !== null) {
        return false;
      }
    }

    const ship = new Ship(length);
    for (let i = 0; i < length; ++i) {
      this.#board[startRow][startCol + i] = ship;
    }

    this.#ships.push(ship);
    return true;
  }

  /**
   * @param {Number} length - length of the ship
   * @param {Number} startRow
   * @param {Number} startCol
   * @param {Boolean} vertical - true will try to place the ship vertically; false horizontally
   * @returns Returns true if succeeded in placing the ship, false otherwise.
   */
  placeShip(length, startRow, startCol, vertical = true) {
    if (!this.#validateCoords(startRow, startCol) || length < 1) {
      return false;
    }
    if (vertical) {
      return this.#placeVertically(length, startRow, startCol);
    }
    return this.#placeHorizontally(length, startRow, startCol);
  }

  attack(row, col) {
    if (!this.#validateCoords(row, col) || this.#board[row][col] === "hit") {
      return "invalid";
    }
    if (this.#board[row][col] === null) {
      this.#board[row][col] = "nohit";
      return "nohit";
    }
    if (this.#board[row][col] instanceof Ship) {
      this.#board[row][col].hit();
      this.#board[row][col] = "hit";
      return "hit";
    }
  }

  get allSunk() {
    for (let ship of this.#ships) {
      if (!ship.isSunk) {
        return false;
      }
    }
    return true;
  }

  get ships() {
    return this.#ships.slice();
  }

  get board() {
    return this.#board.map((row) => [...row]);
  }
}

module.exports = Gameboard;
