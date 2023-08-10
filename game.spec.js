require('./game.js');

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  it('should add a player', () => {
    game.add('Player 1');
    expect(game.howManyPlayers()).toBe(1);
  });

  it('should not add more than the maximum number of players', () => {
    for (let i = 1; i <= 6; i++) {
      game.add(`Player ${i}`);
    }
    expect(game.add('Extra Player')).toBe(false);
  });

  it('should determine if the game is playable with at least 2 players', () => {
    game.add('Player 1');
    expect(game.isPlayable()).toBe(false);

    game.add('Player 2');
    expect(game.isPlayable()).toBe(true);
  });

  it('should correctly roll the dice and update player location', () => {
    game.add('Player 1');
    game.roll(4);
    expect(game.places[0]).toBe(4);
  });

});
