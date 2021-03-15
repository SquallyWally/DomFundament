'use strict';

//Selecting elements
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

score0Element.textContent = 0;
score1Element.textContent = 0;

let scores, huidigScore, activePlayer, isPlaying;

const init = () => {
  //starting condition

  diceElement.classList.add('hidden');

  scores = [0, 0];
  huidigScore = 0;
  activePlayer = 0; //Player 1 is 1.  Player 2 is 2
  isPlaying = true; //Met isPlaying dan kan je niet meer een dobbelsteen rollen

  current0.textContent = 0;
  current1.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

init();

let switchscore = (cijfer) => {
  return activePlayer === 0
    ? (score0Element.textContent = cijfer)
    : (score1Element.textContent = cijfer);
};

const playerSwitch = () => {
  switchscore(0);
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};
///Roll le dice func

btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    //TODO: Generate a random dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;
    //TODO: Display Dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    //TODO Check for rolled 1: true? switch to next player
    if (dice !== 1) {
      //Add dice to current score
      huidigScore += dice;
      document.getElementById(
        `current--${activePlayer}`,
      ).textContent = huidigScore;
      switchscore(dice);
    } else {
      //Switch
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      huidigScore = 0;
      playerSwitch();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    //TODO Add Current scoe to active players score
    scores[activePlayer] += huidigScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //TODO Check if Player score >= 100

    if (scores[activePlayer] >= 30) {
      //Finish game
      isPlaying = false;
      diceElement.classList.add('hidden');
      console.log('You are win');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //else SWITCH player
      playerSwitch();
    }
  }
});

btnNew.addEventListener('click', init());
