class Player {
  #name;

  constructor(name = "Player") {
    this.#name = name;
  }

  set name(name) {
    this.#name = name;
  }
  get name() {
    return this.#name;
  }
}

class AIPlayer extends Player {
  attack(board) {
    let validMoves = [];
    for (let i = 0; i < board.length; ++i) {
      for (let j = 0; j < board[0].length; ++j) {
        if (board[i][j] !== "hit" && board[i][j] !== "nohit") {
          validMoves.push([i, j]);
        }
      }
    }
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }

  putShip(shipLength, board) {
    let row, column, vertical;
    let validMove = true;

    do {
      validMove = true;
      vertical = Math.random() < 0.5;
      if (vertical) {
        row = Math.floor(Math.random() * (board.length - shipLength + 1));
        column = Math.floor(Math.random() * board[0].length);

        for (let i = 0; i < shipLength; ++i) {
          if (board[row + i][column] !== null) {
            validMove = false;
            break;
          }
        }
      } else {
        row = Math.floor(Math.random() * board.length);
        column = Math.floor(Math.random() * (board[0].length - shipLength + 1));

        for (let i = 0; i < shipLength; ++i) {
          if (board[row][column + i] !== null) {
            validMove = false;
            break;
          }
        }
      }
    } while (!validMove);

    return { row, column, vertical };
  }
}

module.exports = AIPlayer;
