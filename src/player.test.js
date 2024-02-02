const AIPlayer = require("./player");
const Gameboard = require("./gameboard");

describe("check AI's interactions with a gameboard", () => {
  const boardsize = 8;
  const gameboard = new Gameboard(boardsize);
  const player = new AIPlayer("Jester");

  test("places ships on the board", () => {
    for (let length = 1; length < 5; ++length) {
      const move = player.putShip(length, gameboard.board);
      expect(
        gameboard.placeShip(length, move.row, move.column, move.vertical)
      ).toBe(true);
    }
  });

  test("player's attack function returns only valid moves", () => {
    for (let i = 0; i < boardsize * boardsize; ++i) {
      const move = player.attack(gameboard.board);
      expect(gameboard.attack(move[0], move[1])).not.toBe("invalid");
    }
  });
});
