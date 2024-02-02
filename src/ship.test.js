const Ship = require("./ship");

describe("test the ship class", () => {
  const length = 3;
  const ship = new Ship(length);
  test("ship initialises correctly", () => {
    expect(ship.length).toBe(length);
    expect(ship.hitpoints).toBe(length);
  });

  test("test hit function", () => {
    ship.hit();
    expect(ship.length).toBe(length);
    expect(ship.hitpoints).toBe(length - 1);
  });

  test("test sinking", () => {
    for (let i = 0; i < length - 1; ++i) {
      ship.hit();
    }
    expect(ship.isSunk).toBe(true);
  });

  test("correct data when hit after sinking", () => {
    ship.hit();
    expect(ship.isSunk).toBe(true);
    expect(ship.length).toBe(length);
  });
});
