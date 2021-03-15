/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

/*----- Useful Utility stuff -----*/

/*----- Occasionally useful, but only use on a worker thread, not the main thread. -----*/

/*----- Example of a custom event -----*/


/*----- Scoreboard values -----*/
const player1SkirmishWins = 0, player1BattleWins = 0, player1GameWins = 0;
const player2SkirmishWins = 0, player2BattleWins = 0, player2GameWins = 0;

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
// renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

/*----- app's state (variables) -----*/
let shuffledDeck;

/*----- cached element references -----*/
const shuffledContainer = document.getElementById('battlefield');
const startupSoundTrigger = document.getElementById('master-deck-container');

/*----- event listeners -----*/
// document.getElementById('demo-button').addEventListener('click', renderShuffledDeck);
document.getElementById('quit-button').addEventListener('click', quitGame);

/*----- Adding listener for the "Demo" custom event -----*/
document.getElementById('demo-button').addEventListener('eventDemo', renderShuffledDeck);


/*----- functions -----*/
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms || DEFAULT_DELAY));
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
  
 // shuffleDeck();
//  renderDeckInContainer(shuffledDeck, shuffledContainer);

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

/*----- Game Functions -----*/
function initializeGame() {
   console.log("\nGame Initialized.");
};

function renderGame() {
  console.log("\nGame Rendered.");
};

// function shuffleDeck() {
//   console.log("\nCards shuffled.");
// };

function splitDeck() {
   console.log("\nCard deck has been split into two randomized stacks of cards, called ActivePiles.")
};

function showPlayer1ProfilePic() {
  console.log("\nPlayer 1's Profile Picture is visible.");
};

function showPlayer2ProfilePic() {
  console.log("\nPlayer 2's Profile Picture is Visible.");
};

/*----- Start of Game -----*/
function showPlayer1ActivePile() {
    console.log("\nPlayer 1's ActivePile is Visible.");
};

function showPlayer2ActivePile() {
   console.log("\nPlayer 2's ActivePile is Visible.");
};

function transitionPlayer1CardToBattlefield() {
  console.log("\nPlayer 1's card teleports onto the field!");
};

function transitionPlayer2CardToBattlefield() {
  audioTeleportCard.play();
  console.log("\nPlayer 2's card teleports onto the field!");
};

function compareCards() {
   console.log("\nCards have been compared. \nEither Player 1 or Player 2 won. \nOr it was a tie. ");
};

/*----- Default Play; No Tie. -----*/
function Player1WinsSkirmish() {
  console.log("\nPlayer 1 Wins Skirmish!");
};
function Player2WinsSkirmish() {
  console.log("\nPlayer 2 Wins Skirmish!");
};

function moveTieCardsAside() {
  console.log("\nTie cards have been slid left to make room for more cards. ");
};

function playPlayer1CardFaceDown() {
  console.log("\nPlayer 1 teleports a facedown card due to a tie.");
};

function playPlayer2CardFaceDown() {
  console.log("\nPlayer 2 teleports a facedown card due to a tie.");
};

function Player1WinsBattle() {
   console.log("\nPlayer 1 Wins the Battle!");
};

function Player2WinsBattle() {
  console.log("\nPlayer 2 Wins the Battle!");
};


/*----- When a player runs out of cards -----*/
function hidePlayer1ActivePile() {
  console.log("\nPlayer 1's ActivePile is Hidden. He's out of cards!");
};
function hidePlayer2ActivePile() {
  console.log("\nPlayer 2's ActivePile is Hidden. He's out of cards!");
};

function player1WinsGame() {
  console.log("\nPlayer 1 has WON THE GAME!!!!! <<imagine this part flashing n stuff...>>");
};

function player2WinsGame() {
  console.log("\nNo... wait...\nPlayer 2 has WON THE GAME!!!!! <<imagine different flashing stuff...>>");
};






