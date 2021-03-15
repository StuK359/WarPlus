/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const DEFAULT_DELAY = 1000;

/*----- Useful Utility stuff -----*/

/*----- Occasionally useful, but only use on a worker thread, not the main thread. -----*/
const sleep = milliseconds => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);


/*----- Example of a custom event -----*/
const eventDemo = new Event('eventDemo');




/*----- Scoreboard values -----*/
const player1SkirmishWins = 0, player1BattleWins = 0, player1GameWins = 0;
const player2SkirmishWins = 0, player2BattleWins = 0, player2GameWins = 0;

/*------ sounds ------*/
const audioShuffle = new Audio('sounds/shuffling.mp3');
const audioCheer = new Audio('sounds/cheer.mp3');
const audioPlayer1ProfileShown = new Audio('sounds/launchswell0.mp3');
const audioPlayer2ProfileShown = new Audio('sounds/launchswell1.mp3');
const audioTeleportCard = new Audio('sounds/teleportcard.mp3');
const audioPlayer1Wins = new Audio('sounds/swish1.mp3');
const audioPlayer2Wins = new Audio('sounds/swish2.mp3');
const audioTaDa = new Audio('sounds/tada.mp3');
const audioWarPlusThemeSong = new Audio('sounds/warplusthemesong.mp3');
audioWarPlusThemeSong.volume = .2;
const audioClearTheBoard = new Audio('sounds/cleartheboard.mp3');
const audioCowbell = new Audio('sounds/cowbell.mp3');
const audioEnthusiasticApplause = new Audio('sounds/enthusiastic-cheer.mp3');
const audioQuit = new Audio('sounds/quit.mp3');
const audioStartGame = new Audio('sounds/startgame.mp3');
const audioSoSad = new Audio('sounds/toobad.mp3');
const audioShiftTieCardsOver = new Audio('sounds/swish2.mp3');

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
    audioShuffle.play();
  }
  
 // shuffleDeck();
//  renderDeckInContainer(shuffledDeck, shuffledContainer);

  setTimeout(() => {initializeGame(); }, 3000);
  setTimeout(() => {renderGame(); }, 4000);
  setTimeout(() => {splitDeck(); }, 5000);
  setTimeout(() => {audioWarPlusThemeSong.play(); }, 6000);
  setTimeout(() => {showPlayer1ProfilePic(); }, 8000);
  setTimeout(() => {showPlayer2ProfilePic(); }, 9000);
  setTimeout(() => {audioEnthusiasticApplause.play(); }, 10000);
    
  /* Player 1 wins first round */
  setTimeout(() => {transitionPlayer1CardToBattlefield(); }, 13000);
  setTimeout(() => {transitionPlayer2CardToBattlefield(); }, 14000);
  
  setTimeout(() => {compareCards(); }, 15000);
  setTimeout(() => {Player1WinsSkirmish(); }, 16000);
  
  
  /* Next round... it's a tie! */
  setTimeout(() => {transitionPlayer1CardToBattlefield(); }, 17000);
  setTimeout(() => {transitionPlayer2CardToBattlefield(); }, 20000);
  setTimeout(() => {compareCards(); },  20000);
  setTimeout(() => {moveTieCardsAside(); }, 21000);
  setTimeout(() => {playPlayer1CardFaceDown(); }, 21000);
  setTimeout(() => {playPlayer2CardFaceDown(); }, 23000);

  setTimeout(() => {transitionPlayer1CardToBattlefield(); }, 24000);
  setTimeout(() => {transitionPlayer2CardToBattlefield(); }, 25000);
  setTimeout(() => {Player2WinsSkirmish(); }, 25000);
  setTimeout(() => {Player2WinsBattle(); }, 26000);

  /* Player 1 wins again! */
  setTimeout(() => {transitionPlayer1CardToBattlefield(); }, 28000);
  setTimeout(() => {transitionPlayer2CardToBattlefield(); }, 29000);
  setTimeout(() => {compareCards(); }, 30000);
  setTimeout(() => {Player1WinsSkirmish(); }, 31000);
  setTimeout(() => {hidePlayer2ActivePile(); }, 33000);
  setTimeout(() => {player1WinsGame(); }, 35000)
  setTimeout(() => {player2WinsGame(); }, 36000)
  setTimeout(() => {audioClearTheBoard.play(); }, 38000);
  setTimeout(() => {goHome(); }, 43000);
  setTimeout(() => {audioSoSad.play(); }, 43000);
  setTimeout(() => {audioQuit.play(); }, 46000);
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

/*----- Game Functions -----*/
function initializeGame() {
   console.log("\nGame Initialized.");
};

function renderGame() {
  audioStartGame.play();
  console.log("\nGame Rendered.");
};

// function shuffleDeck() {
//   audioShuffle.play();
//   console.log("\nCards shuffled.");
// };

function splitDeck() {
   console.log("\nCard deck has been split into two randomized stacks of cards, called ActivePiles.")
};

function showPlayer1ProfilePic() {
  audioPlayer1ProfileShown.play(); 
  console.log("\nPlayer 1's Profile Picture is visible.");
};

function showPlayer2ProfilePic() {
  audioPlayer2ProfileShown.play();
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
  audioTeleportCard.play();
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
  audioPlayer1Wins.play();
  console.log("\nPlayer 1 Wins Skirmish!");
};
function Player2WinsSkirmish() {
  audioPlayer2Wins.play();
  console.log("\nPlayer 2 Wins Skirmish!");
};

function moveTieCardsAside() {
  audioShiftTieCardsOver.play();
  console.log("\nTie cards have been slid left to make room for more cards. ");
};

function playPlayer1CardFaceDown() {
  audioTeleportCard.play();
  console.log("\nPlayer 1 teleports a facedown card due to a tie.");
};

function playPlayer2CardFaceDown() {
  audioTeleportCard.play(); 
  console.log("\nPlayer 2 teleports a facedown card due to a tie.");
};

function Player1WinsBattle() {
   audioTaDa.play();
   console.log("\nPlayer 1 Wins the Battle!");
};

function Player2WinsBattle() {
  audioTaDa.play();
  console.log("\nPlayer 2 Wins the Battle!");
};


/*----- When a player runs out of cards -----*/
function hidePlayer1ActivePile() {
  audioSoSad.play();
  console.log("\nPlayer 1's ActivePile is Hidden. He's out of cards!");
};
function hidePlayer2ActivePile() {
  audioSoSad.play();
  console.log("\nPlayer 2's ActivePile is Hidden. He's out of cards!");
};

function player1WinsGame() {
  audioTaDa.play();
  console.log("\nPlayer 1 has WON THE GAME!!!!! <<imagine this part flashing n stuff...>>");
};

function player2WinsGame() {
  audioTaDa.play();
  console.log("\nNo... wait...\nPlayer 2 has WON THE GAME!!!!! <<imagine different flashing stuff...>>");
};

function goHome() {
  console.log("\nThat's it. It's over. Go home.");
};

function quitGame() {
  if (confirm("Are You Sure You Want To Quit? Choose [OK] or [Cancel]")) {
    audioQuit.play();
 //   sleep(5000) // Sleep for 5 seconds
    close();
   }
   confirm("Yeah... close() used to work, but not any more. \nSorry.");
}

function triggerPlayDemoEvent() {
  document.getElementById('demo-button').dispatchEvent(eventDemo);
//  audioCowbell.play(); /* Optional auto-Demo noise */
}

/*----- For Automated Demo replays using custom "eventDemo" event. -----*/
/*--- setTimeout(() => {triggerPlayDemoEvent(); }, 5000); */




