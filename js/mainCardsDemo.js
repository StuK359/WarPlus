/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const SOUND_DELAY = 3000;
const APPLAUSE_DELAY = 1500;
const DEFAULT_DELAY = 1000;

const sounds = {
  shuffle: './sounds/shuffling-cards.mp3'
};
// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

/*----- app's state (variables) -----*/
let shuffledDeck;
var startupSound = document.getElementById("startup-sound");



/*----- cached element references -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderShuffledDeck);
document.getElementById('startup-sound').addEventListener('load', playStartupSound);
/* document.querySelector('button').addEventListener('click', playshuffleSound);

/*----- functions -----*/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || DEFAULT_DELAY));
};

function playStartupSound() {
   startupSound.play(); //play the audio file
};

function renderShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  shuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  playShuffleSound();
  renderDeckInContainer(shuffledDeck, shuffledContainer);
  setTimeout(() => {playApplause(); }, APPLAUSE_DELAY); 
};

function playShuffleSound() {
    var audio = new Audio('sounds/shuffling.mp3');
    audio.loop = false;
    audio.play(); 
};

function playApplause() {
  var audio2 = new Audio('sounds/player2cheer.mp3');
  audio2.loop = false;
  audio2.play(); 
};

// Old approach, didn't work.
// function playStartupSound() {
//   var audio3 = new Audio('sounds/launchswell0.mp3');
//   audio3.loop = false;
//   audio3.play(); 
// };

function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  // Use reduce when you want to 'reduce' the array into a single thing - in this case a string of HTML markup 
  const cardsHtml = deck.reduce(function(html, card) {
    return html + `<div class="card ${card.face}"></div>`;
  }, '');
  container.innerHTML = cardsHtml;
};

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}



