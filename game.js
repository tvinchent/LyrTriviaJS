// TODO: TU, OO, fichiers distincts // code smells, clean code
const MAX_PLAYERS = 6;
const NUM_CATEGORIES = 4;

exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function() {
  this.players = [];
  this.places = new Array(MAX_PLAYERS).fill(0);
  this.purses = new Array(MAX_PLAYERS).fill(0);
  this.inPenaltyBox = new Array(MAX_PLAYERS).fill(false);

  this.currentPlayer = 0;
  this.isGettingOutOfPenaltyBox = false;

  this.currentCategory = function () {
    const place = this.places[this.currentPlayer];
    if (place % NUM_CATEGORIES === 0) return 'Pop';
    if (place % NUM_CATEGORIES === 1) return 'Science';
    if (place % NUM_CATEGORIES === 2) return 'Sports';
    if (place % NUM_CATEGORIES === 3) return 'Rock';
  };

  this.isPlayable = function () {
    return this.howManyPlayers() >= 2;
  };

  this.add = function (playerName) {
    if (this.howManyPlayers() >= MAX_PLAYERS) {
      console.log("Maximum number of players reached.");
      return false;
    }
    this.players.push(playerName);
    const playerIndex = this.howManyPlayers() - 1;
    this.places[playerIndex] = 0;
    this.purses[playerIndex] = 0;
    this.inPenaltyBox[playerIndex] = false;

    console.log(`${playerName} was added`);
    console.log(`He is player number ${this.players.length}`);

    return true;
  };

  this.howManyPlayers = function () {
    return this.players.length;
  };

  this.roll = function (roll) {
    console.log(`${this.players[this.currentPlayer]} is the current player`);
    console.log(`He has rolled a ${roll}`);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 !== 0) {
        this.isGettingOutOfPenaltyBox = true;
        console.log(`${this.players[this.currentPlayer]} is getting out of the penalty box`);
        this.setPlaceAndCategoryThenAskQuestion(roll);
      } else {
        console.log(`${this.players[this.currentPlayer]} is not getting out of the penalty box`);
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.setPlaceAndCategoryThenAskQuestion(roll);
    }
  };

  this.setPlaceAndCategoryThenAskQuestion = function (roll) {
    this.places[this.currentPlayer] += roll;
    if (this.places[this.currentPlayer] > 11) {
      this.places[this.currentPlayer] -= 12;
    }

    console.log(`${this.players[this.currentPlayer]}'s new location is ${this.places[this.currentPlayer]}`);
    console.log(`The category is ${this.currentCategory()}`);
    this.askQuestion();
  };

  this.askQuestion = function () {
    console.log(questions[this.currentCategory()].shift());
  };

  this.goodAnswer = function () {
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        return this.goodAnswerPhase();
      } else {
        this.goToNextPlayer();
        return true;
      }
    } else {
      return this.goodAnswerPhase();
    }
  };

  this.goodAnswerPhase = function () {
    console.log('Answer was correct!!!!');
    this.purses[this.currentPlayer]++;
    console.log(`${this.players[this.currentPlayer]} now has ${this.purses[this.currentPlayer]} Gold Coins.`);

    const winner = this.didPlayerNotWin();

    winner ? console.log('Next') : console.log(`${this.players[this.currentPlayer]} HAS WON !`);

    this.goToNextPlayer();
    return winner;
  };

  this.goToNextPlayer = function () {
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
  };

  this.didPlayerNotWin = function () {
    return this.purses[this.currentPlayer] !== 6;
  };

  this.wrongAnswer = function () {
    console.log('Question was incorrectly answered');
    console.log(`${this.players[this.currentPlayer]} was sent to the penalty box`);
    this.inPenaltyBox[this.currentPlayer] = true;

    this.goToNextPlayer();
    return true;
  };
}