/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const SOUND_DELAY = 3000;
const APPLAUSE_DELAY = 1500;
const DEFAULT_DELAY = 1000;

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

/*----- app's state (variables) -----*/
/* localStorage variables: */
/* FirstLaunchDemoMode (true | false) */

let shuffledDeck;

const  gameState, winner, roundScore, gameScore;
// const Player1AmmoStack; Player2AmmoStack, Player1WinStack, Player2WinStack, TieCardsStack;


/*----- cached element references -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');
const startupSoundTrigger = document.getElementById('master-deck-container');

/*----- event listeners -----*/
/* How To Play button */
/* Start Game button */
/* Restart Game button */
/* Quit button */
/* Player1 Profile Pic clicked */
/* Player 2 Profile Pic clicked */
/* Player 1 AmmoPile click */
/* Stretch goals: */
/* Obstinate "Play Music" checkbox */
/* Obstinate "How To Play" button */

document.querySelector('button').addEventListener('click', renderShuffledDeck);
// document.querySelector('startupSoundTrigger').addEventListener('load', playStartupSound);
document.querySelector('button').addEventListener('loadstart', playStartupSound);

/*----- functions -----*/
// function mySleep(ms) {
//    return new Promise(resolve => setTimeout(resolve, ms || DEFAULT_DELAY));
// };

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
//  setTimeout(() => {playStartupSound();}, 5000); 
};

function playShuffleSound() {
    var audio2 = new Audio('sounds/shuffling.mp3');
    audio2.loop = false;
    audio2.play(); 
};

function playApplause() {
  var audio = new Audio('sounds/player2cheer.mp3');
  audio.loop = false;
  audio.play(); 
};

function playStartupSound() {
   var audioStartup = new Audio('sounds/launchswell0.mp3');
   audioStartup.loop = false;
   audioStartup.play(); 
};

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

// function initializeGame() {
//    console.log("\nGame Initialized.");
// };

// renderGame(); {
//    console.log("\nGame Rendered. ");
// };

// function shuffleDeck() {
//     console.log("\nCards shuffled.");
// };

// function splitDeck() {
//     console.log("\nCard deck has been split into two randomized stacks of cards, called Ammo Piles.")
// };

// function showPayer1AmmoPile() {
//     console.log("\nPlayer 1's Ammo Pile Visible.");
// };

// function hidePlayer1AmmoPile() {
//     console.log("\nPlayer 1's Ammo Pile Hidden. ");
// };

// function showPlayer2AmmoPile() {
//     console.log("\nPlayer 2's Ammp Pile Visible. ");
// };

// function hidePlayer2AmmoPile() {
//     console.log("\nPlayer 2's Ammo Pile Hidden. ");
// };

// function showPlayer1WinPile() {
//     console.log("\nPlayer 1's Win Pile Visible.");
// };

// function hidePlayer1WinPile() {
//     console.log("\nPlayer 1's Win Pile Hidden. ");
// };

// function showPlayer2WinPile() {
//     console.log("\nPlayer 2's Win Pile Visible. ");
// };

// function hidePlayer2WinPile() {
//     console.log("\nPlayer 2's Win Pile Hidden. ");
// };

// function playPlayer1CardFaceUp() {
//     console.log("\nPlayer 1's next card is face up. ");
// };

// function playPlayer2CardFaceUp() {
//     console.log("Player 2's next card is face up");
// };

// function playPlayer1CardFaceUpFlipAnimation() {
//     console.log("\nPlayer 1's next card is face up with STYLE!");
// };

// function playPlayer2CardFaceUpFlipAnimation() {
//     console.log("\nPlayer 2's next card is face up with STYLE!");
// };

// function compareCards() {
//     console.log("\nCards have been compared. Either Player 1 or Player 2 won, or it was a tie. ");
// };

// function moveTieCardsAside() {
//     console.log("\nTie cards have been slid left to make room for more cards. ");
// };

// function playPlayer1CardFaceDown() {
//     console.log("\nPlayer 1 played a facedown card due to a tie.");
// };

// function playPlayer2CardFaceDown() {
//     console.log("\nPlayer 2 played a facedown card due to a tie.");
// };

// function moveCardsToPlayer1WinPile() {
//     console.log("\nPlayer 1 won! Moved cards to his Win pile.");
// };

// function moveCardsToPlayer2WinPile() {
//     console.log("\nPlayer 2 won! Moved cards to his Win pile. ");
// };

// function movePlayer1WinPileToAmmoPile() {
//     console.log("\nPlayer 1 ran out of cards! Move his Win pile over to his Ammo pile.");
// };

// function movePlayer2WinPileToAmmoPile() {
//     console.log("\nPlayer 2 ran out of cards! Move his Win pile over to his Ammo pile. ");
// };


