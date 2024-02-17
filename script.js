'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  // 1. generaging a random dice roll (1~6)
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. check for roolled 1 : if true, switch to next player
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // switch player, rolled 1 then lost point
    switchPlayer();
  }
});

// 4. hold score

btnHold.addEventListener('click', function () {
  // add current score to active players score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // chekc if player's score >= 100 ==> finish game
  if (scores[activePlayer] >= 20) {
    // finish the game & make buttons disabled
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    btnRoll.setAttribute('disabled', '');
    btnHold.setAttribute('disabled', '');
    diceEl.classList.add('hidden');

    alert(`PLAYER ${activePlayer + 1} wins!!!`);
  } else {
    // switch to the next player
    switchPlayer();
  }
});
