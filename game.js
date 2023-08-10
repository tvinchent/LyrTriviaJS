// Utilisez strict mode pour des pratiques de codage plus sûres.
"use strict";

// Utilisez des constantes pour améliorer la lisibilité.
const MAX_PLAYERS = 6;
const NUM_QUESTIONS = 50;
const NUM_CATEGORIES = 4;

// Utilisez des objets littéraux pour stocker les questions par catégorie.
const questions = {
  Pop: [],
  Science: [],
  Sports: [],
  Rock: []
};

// Créez un constructeur de jeu.
function Game() {
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
    return 'Rock';
  };

  this.createRockQuestion = function (index) {
    return `Rock Question ${index}`;
  };

  for (let i = 0; i < NUM_QUESTIONS; i++) {
    questions.Pop.push(`Pop Question ${i}`);
    questions.Science.push(`Science Question ${i}`);
    questions.Sports.push(`Sports Question ${i}`);
    questions.Rock.push(this.createRockQuestion(i));
  }

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

// Votre code principal commence ici.

const game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

if (!game.isPlayable()) {
  console.log('Minimum of 2 players necessary');
} else {
  let notAWinner = false;

  do {
    const roll = Math.floor(Math.random() * 6) + 1;
    console.log(`\n--- New Roll: ${roll} ---\n`);

    if (Math.floor(Math.random() * 10) === 7) {
      notAWinner = game.wrongAnswer();
    } else {
      notAWinner = game.goodAnswer();
    }
  } while (notAWinner);
}