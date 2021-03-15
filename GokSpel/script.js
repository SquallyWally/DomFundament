`use strict`;

let secretNummer = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayBericht = (bericht) => {
  document.querySelector('.bericht').textContent = bericht;
};

const displaySecretNummer = () => {
  document.querySelector('.nummer').textContent = secretNummer;
};

const displayScore = (score) => {
  document.querySelector('.score').textContent = score;
};

document.querySelector('.check').addEventListener('click', function () {
  const gok = Number(document.querySelector('.gok').value);
  console.log(gok, typeof gok);

  if (!gok) {
    displayBericht('Ongeldige nummer');
  } else if (gok === secretNummer) {
    //Gewonnen
    displayBericht('GEWONNEN');

    displaySecretNummer();

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.nummer').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.high').textContent = highscore;
    }

    //////Gok is fout
  } else if (gok !== secretNummer) {
    if (score > 1) {
      displayBericht(gok > secretNummer ? 'TE HOOG' : 'TE LAAG');
      score--;
      displayScore(score);
    } else {
      displayBericht('LOSER NERD');

      displayScore(0);

      document.querySelector('body').style.backgroundColor = '#ff0000';
    }
  }
});

document.querySelector('.alweer').addEventListener('click', function () {
  score = 20;
  secretNummer = Math.trunc(Math.random() * 20) + 1;
  displayScore(score);

  document.querySelector('.gok').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.nummer').style.width = '15rem';
  displayBericht('Begin maar met gokken....');
  document.querySelector('.nummer').textContent = '?';
  console.log('Reload');
});
