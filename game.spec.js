require('./game.js');

describe("The test environment", function() {
  it("should pass", function() {
    expect(true).toBe(true);
  });

  it("should access game", function() {
    expect(Game).toBeDefined();
  });
});

describe("Your specs...", function() {
  // it should work with 2 to 6 (or more) players
  // it should display an alert when less than 2 players
});
