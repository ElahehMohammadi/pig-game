'use strict';

console.log('hi!');
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

/// SUB SECTION ATTRIBUTES
let scores, currentScore, activePlayer, playing;

//////////// SECTION FUNCTIONS

/// SUB SECTION START CONDITIONS
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentScore0EL.textContent = 0;
  currentScore1EL.textContent = 0;

  diceImgEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
init();

/// SUB SECTION SWITCH PLAYERS
const switchPlayers = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//////////// SECTION ACTIONS

/// SUB SECTION ROOL DICE BUTTON
btnRollEL.addEventListener('click', function () {
  if (playing) {
    diceImgEL.classList.remove('hidden');
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceImgEL.src = `dice-${dice}.png`;

    /// SUB SECTION IF DICE EQUALS 1
    if (dice === 1) {
      switchPlayers();
    }
    /// SUB SECTION IF DICE DOESNT EQUAL 1
    else {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

/// SUB SECTION HOLD BUTTON
btnHoldEL.addEventListener('click', function () {
  if (playing) {
    // add current score to active players score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //  check score is >= 100
    // finish the game
    if (scores[activePlayer] >= 20) {
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      playing = false;
      diceImgEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayers();
    }

    // else countiniu game
  }
});

/// SUB SECTION NEW GAME BUTTON
btnNewEL.addEventListener('click', init);
