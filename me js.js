'use strict';

//////////// SECTION CLASSES

/// SUB SECTION FIRST PLAYER
const player0EL = document.querySelector('.player--0');
const currentScore0EL = document.querySelector('#current--0');
const score0EL = document.querySelector('#score--0');

/// SUB SECTION SECOND PLAYER
const player1EL = document.querySelector('.player--1');
const currentScore1EL = document.querySelector('#current--1');
const score1EL = document.querySelector('#score--1');

/// SUB SECTION GENERAL
const diceImgEL = document.querySelector('.dice');
const btnNewEL = document.querySelector('.btn--new');
const btnRollEL = document.querySelector('.btn--roll');
const btnHoldEL = document.querySelector('.btn--hold');

//////////// SECTION BASE STATE
let currentScore0 = 0;
let score0 = 0;
score0EL.textContent = score0;

let currentScore1 = 0;
let score1 = 0;
score1EL.textContent = score1;

diceImgEL.classList.add('hidden');

//////////// SECTION FUNCTIONS

/// SUB SECTION SWITCH PLAYERS
const switchPlayers = function (
  playerCurrentScoreEL,
  firstplayerEL,
  secondplayerEL
) {
  zeroScore(playerCurrentScoreEL);
  firstplayerEL.classList.remove('player--active');
  secondplayerEL.classList.add('player--active');
};

/// SUB SECTION ZERO THE SCORE
const zeroScore = function (scoreEL) {
  scoreEL.value = 0;
  scoreEL.textContent = 0;
};

/// SUB SECTION PLAYER CHECKER
const isPlayer0Active = function () {
  return player0EL.classList.contains('player--active');
};

/// SUB SECTION CURRENT PLAYER WINS
const playerWins = function (playerEL) {
  playerEL.classList.add('player--winner');
};

/// SUB SECTION ADD CURRENT Score
const addScore = function (Score, num, ScoreEL) {
  Score += num;
  ScoreEL.textContent = Score;
  return Score;
};

//////////// SECTION ACTIONS

/// SUB SECTION ROOL DICE BUTTON
btnRollEL.addEventListener('click', function () {
  diceImgEL.classList.remove('hidden');
  let dice = String(Math.trunc(Math.random() * 6 + 1));
  diceImgEL.src = 'dice-' + dice + '.png';

  /// SUB SECTION IF DICE EQUALS 1
  if (dice === '1') {
    //NOTE make these vlues

    if (isPlayer0Active()) {
      currentScore0 = 0;
      switchPlayers(currentScore0EL, player0EL, player1EL);
    } else {
      currentScore1 = 0;
      switchPlayers(currentScore1EL, player1EL, player0EL);
    }
  }
  /// SUB SECTION IF DICE DOESNT EQUAL 1
  else {
    if (isPlayer0Active()) {
      currentScore0 = addScore(currentScore0, Number(dice), currentScore0EL);
    } else {
      currentScore1 = addScore(currentScore1, Number(dice), currentScore1EL);
    }
  }
});

/// SUB SECTION HOLD BUTTON
btnHoldEL.addEventListener('click', function () {
  if (isPlayer0Active()) {
    score0 = addScore(score0, currentScore0, score0EL);
    if (score0 >= 100) {
      playerWins(player0EL);
    } else {
      currentScore0 = 0;
      switchPlayers(currentScore0EL, player0EL, player1EL);
    }
  } else {
    score1 = addScore(score1, currentScore1, score1EL);
    if (score1 >= 100) {
      playerWins(player1EL);
    } else {
      currentScore1 = 0;
      switchPlayers(currentScore1EL, player1EL, player0EL);
    }
  }
});

/// SUB SECTION NEW GAME BUTTON
btnNewEL.addEventListener('click', function () {
  currentScore0 = 0;
  zeroScore(currentScore0EL);
  score0 = 0;
  zeroScore(score0EL);
  currentScore1 = 0;
  zeroScore(currentScore1EL);
  score1 = 0;
  zeroScore(score1EL);

  diceImgEL.classList.add('hidden');
});
