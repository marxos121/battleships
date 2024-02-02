const Gameboard = require("./gameboard");
const Ship = require("./ship");

describe("test the gameboard class", () => {
  const size = 8;
  const gameboard = new Gameboard(8);

  test("initialises board to be a 2d array filled with null", () => {
    expect(gameboard.board instanceof Array).toBe(true);
    expect(gameboard.board.length).toBe(size);
    expect(gameboard.board[0].length).toBe(size);
    for (let row = 0; row < size; ++row) {
      for (let col = 0; col < size; ++col) {
        expect(gameboard.board[row][col]).toBe(null);
      }
    }
  });

  test("initialises ships to be an empty array", () => {
    expect(gameboard.ships).toEqual([]);
  });

  test("doesn't place a ship when coords are wrong", () => {
    expect(gameboard.placeShip(2, -2, size + 5, true)).toBe(false);
    expect(gameboard.ships).toEqual([]);
  });

  test("doesn't place a ship when length <= 0", () => {
    expect(gameboard.placeShip(0, 0, 0, true)).toBe(false);
    expect(gameboard.placeShip(-5, 0, 0, true)).toBe(false);
    expect(gameboard.ships).toEqual([]);
  });

  test("correctly places various ships on the board", () => {
    expect(gameboard.placeShip(1, 0, 0, true)).toBe(true);
    expect(gameboard.placeShip(2, 3, 4, true)).toBe(true);
    expect(gameboard.placeShip(3, 5, 1, false)).toBe(true);
    expect(gameboard.placeShip(3, 4, 5, false)).toBe(true);
    const ship = new Ship(1);
    expect(gameboard.ships).toEqual([ship, ship, ship, ship]);
    expect(gameboard.board).toEqual([
      [ship, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, ship, null, null, null],
      [null, null, null, null, ship, ship, ship, ship],
      [null, ship, ship, ship, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);
  });

  test("keeps track of attacks", () => {
    gameboard.attack(0, 0);
    gameboard.attack(1, 1);
    expect(gameboard.board[0][0]).toBe("hit");
    expect(gameboard.board[1][1]).toBe("nohit");
  });

  test("knows when all ships have been sunk", () => {
    const temp = new Gameboard(2);
    expect(temp.allSunk).toBe(true);
    temp.placeShip(1, 0, 0);
    temp.placeShip(1, 1, 1);
    expect(temp.allSunk).toBe(false);
    temp.attack(0, 0);
    temp.attack(1, 1);
    expect(temp.allSunk).toBe(true);
  });
});
