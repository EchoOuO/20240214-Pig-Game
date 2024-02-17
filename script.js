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

let scores, currentScore, activePlayer, playing;

const init = function () {
  // invisible
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // visible
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  btnRoll.removeAttribute('disabled');
  btnHold.removeAttribute('disabled');
};

// call init function at very beginning
init();

const switchPlayer = function () {
  // with scores = [] ; make the naming and activePlayer = 0 or 1;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // in roll dice button : currentScore += dice, so need to make it zero when switching player
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

  // 3. check for rolled 1 : if true, switch to next player
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
  // add current score to active players score, and display it
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // chekc if player's score >= 100 ==> finish game
  if (scores[activePlayer] >= 100) {
    // finish the game & show who's winner & make buttons disabled
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

// 5. Reset game, (1) in the middle of game  (2) at the end of game

// -- 老師的版本~~  寫一個 init function，把一些初始設定都包進去 並在剛開始 & 按下按鈕時執行funciton

btnNew.addEventListener('click', init);

// -- 我的版本~~~
// // 感覺很適合寫一下 各種狀況下的 classList，比較好釐清怎麼加加減減 classList~~
// // 現在這版本是硬幹版==，邏輯有點醜XDD

// const scoreAll = document.querySelectorAll('.current-score');

// btnNew.addEventListener('click', () => {
//   // hide the dice
//   diceEl.classList.add('hidden');

//   // reset scores & current score
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   currentScore = 0;
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   scores = [0, 0];

//   // reset background & switch to player 1
//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');

//   // 沒考慮到 遊戲結束的狀況
//   // [進行中] 1 = active  V
//   // [進行中] 2 = active  V
//   // [結束] 1 = winner
//   // [結束] 2 = winner
//   if (activePlayer === 1) {
//     switchPlayer();
//     document.querySelector(`.player--1`).classList.remove('player--active');
//   } else if (activePlayer === 0) {
//     document
//       .querySelector(`.player--${activePlayer}`)
//       .classList.add('player--active');
//   }

//   // enable button
//   btnRoll.removeAttribute('disabled');
//   btnHold.removeAttribute('disabled');
// });
