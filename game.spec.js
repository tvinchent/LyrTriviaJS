require('./game.js');

describe("The test environment", function() {

  it("should access game", function() {
    expect(Game).toBeDefined();
  });

});

describe("isPlayable", function() {

  it("should pass", function() {
    var isPlayable = this.isPlayable()
    expect(isPlayable).toBe(true);
  });

});

  // it should work with 2 to 6 (or more) players
  // it should display an alert when less than 2 players
