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
let shuffledDeck;

/*----- cached element references -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');
const startupSoundTrigger = document.getElementById('master-deck-container');

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderShuffledDeck);
// document.querySelector('startupSoundTrigger').addEventListener('load', playStartupSound);
document.querySelector('button').addEventListener('loadstart', playStartupSound);

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
  playShuffleSound();
  shuffleDeck();
  renderDeckInContainer(shuffledDeck, shuffledContainer);
  setTimeout(() => {playApplause(); }, APPLAUSE_DELAY);
  setTimeout(() => {playStartupSound(); }, 6000);
  setTimeout(() => {playStartupSound2(); }, 8000);
  setTimeout(() => {playStartGameSound(); }, 12000);
  setTimeout(() => {initializeGame(); }, 12000);
  setTimeout(() => {renderGame(); }, 12000);
  setTimeout(() => {splitDeck(); }, 13000);
  setTimeout(() => {showPlayer1AmmoPile(); }, 13000);
  setTimeout(() => {showPlayer2AmmoPile(); }, 14000);
  setTimeout(() => {playEnthusiasticApplauseSound(); }, 14000);
  setTimeout(() => {playCowbellSound(); }, 18000);
  setTimeout(() => {playCowbellSound(); }, 19000);
  setTimeout(() => {playCowbellSound(); }, 20000);
  
  /* Player 1 wins first round */
  setTimeout(() => {playPlayer1CardFaceUp(); }, 22000);
  setTimeout(() => {playSwish2Sound(); }, 22000);
  setTimeout(() => {playPlayer2CardFaceUpFlipAnimation(); }, 24000);
  setTimeout(() => {playSwish1Sound(); }, 24000);
  setTimeout(() => {compareCards(); }, 25000);
  setTimeout(() => {moveCardsToPlayer1WinPile(); }, 25000);
  
  /* Player 2 ran out of cards */
  setTimeout(() => {movePlayer2WinPileToAmmoPile()}, 30000)

  /* Next round... it's a tie! */
  setTimeout(() => {playPlayer1CardFaceUp(); }, 33000);
  setTimeout(() => {playSwish2Sound(); }, 33000);
  setTimeout(() => {playPlayer2CardFaceUpFlipAnimation(); }, 34000);
  setTimeout(() => {playSwish1Sound(); }, 34000);
  setTimeout(() => {compareCards(); }, 35000);
  setTimeout(() => {moveTieCardsAside(); }, 37000);
  
  setTimeout(() => {playPlayer1CardFaceDown(); }, 38000);
  setTimeout(() => {playSwish2Sound(); }, 38000);

  setTimeout(() => {playPlayer2CardFaceDown(); }, 39000);
  setTimeout(() => {playSwish1Sound(); }, 39000);
  
  setTimeout(() => {playPlayer1CardFaceUp(); }, 40000);
  setTimeout(() => {playSwish2Sound(); }, 40000);

  setTimeout(() => {playPlayer2CardFaceUpFlipAnimation(); }, 41000);
  setTimeout(() => {playSwish1Sound(); }, 41000);
  
  /* Player 1 wins again! */
  setTimeout(() => {compareCards(); }, 42000);
  setTimeout(() => {moveCardsToPlayer1WinPile(); }, 44000);
  setTimeout(() => {player1WinsTheGame(); }, 46000)
  setTimeout(() => {playClearTheBoardSound(); }, 48000);
  setTimeout(() => {goHome(); }, 50000);
  setTimeout(() => {playSoSadSound(); }, 52000);
  setTimeout(() => {playQuitSound(); }, 54000);
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

/* Sound functions */
function playShuffleSound() {
  var audio1 = new Audio('sounds/shuffling.mp3');
  audio1.loop = false;
  audio1.play(); 
};

function playApplause() {
var audio2 = new Audio('sounds/cheer.mp3');
audio2.loop = false;
audio2.play(); 
};

function playStartupSound() {
 var audioStartup = new Audio('sounds/launchswell0.mp3');
 audioStartup.loop = false;
 audioStartup.play(); 
};

function playStartupSound2() {
  var audioStartup2 = new Audio('sounds/launchswell1.mp3');
  audioStartup2.loop = false;
  audioStartup2.play(); 
 };

function playClearTheBoardSound() {
  var audioClearTheBoard = new Audio('sounds/cleartheboard.mp3');
  audioClearTheBoard.loop = false;
  audioClearTheBoard.play(); 
 };

 function playCowbellSound() {
  var audioCowbellSound = new Audio('sounds/cowbell.mp3');
  audioCowbellSound.loop = false;
  audioCowbellSound.play(); 
 };


  function playEnthusiasticApplauseSound() {
  var audioEnthusiasticApplauseSound = new Audio('sounds/enthusiastic-cheer.mp3');
  audioEnthusiasticApplauseSound.loop = false;
  audioEnthusiasticApplauseSound.play(); 
 };

 function playQuitSound() {
  var audioQuitSound = new Audio('sounds/quit.mp3');
  audioQuitSound.loop = false;
  audioQuitSound.play(); 
 };

 function playStartGameSound() {
  var audioStartGameSound = new Audio('sounds/startgame.mp3');
  audioStartGameSound.loop = false;
  audioStartGameSound.play(); 
 };

 function playSwish1Sound() {
  var audioSwish1Sound = new Audio('sounds/swish1.mp3');
  audioSwish1Sound.loop = false;
  audioSwish1Sound.play(); 
 };

 function playSwish2Sound() {
  var audioSwish2Sound = new Audio('sounds/swish2.mp3');
  audioSwish2Sound.loop = false;
  audioSwish2Sound.play(); 
 };

 function playSoSadSound() {
  var audioSoSadSound = new Audio('sounds/toobad.mp3');
  audioSoSadSound.loop = false;
  audioSoSadSound.play(); 
 };

function initializeGame() {
   console.log("\nGame Initialized.");
};

function renderGame() {
  console.log("\nGame Rendered.");
};

function shuffleDeck() {
     console.log("\nCards shuffled.");
};

function splitDeck() {
   console.log("\nCard deck has been split into two randomized stacks of cards, called Ammo Piles.")
};

function showPlayer1AmmoPile() {
    console.log("\nPlayer 1's Ammo Pile Visible.");
};

function hidePlayer1AmmoPile() {
    console.log("\nPlayer 1's Ammo Pile Hidden.");
};

function showPlayer2AmmoPile() {
   console.log("\nPlayer 2's Ammo Pile Visible.");
};

function hidePlayer2AmmoPile() {
    console.log("\nPlayer 2's Ammo Pile Hidden.");
};

function showPlayer1WinPile() {
   console.log("\nPlayer 1's Win Pile Visible.");
};

function hidePlayer1WinPile() {
    console.log("\nPlayer 1's Win Pile Hidden. ");
};

function showPlayer2WinPile() {
   console.log("\nPlayer 2's Win Pile Visible. ");
};

function hidePlayer2WinPile() {
   console.log("\nPlayer 2's Win Pile Hidden. ");
};

function playPlayer1CardFaceUp() {
   console.log("\nPlayer 1's next card is face up. ");
};

function playPlayer2CardFaceUp() {
   console.log("Player 2's next card is face up");
};

function playPlayer1CardFaceUpFlipAnimation() {
   console.log("\nPlayer 1's next card is face up with STYLE!");
};

function playPlayer2CardFaceUpFlipAnimation() {
   console.log("\nPlayer 2's next card is face up with STYLE!");
};

function compareCards() {
   console.log("\nCards have been compared. \nEither Player 1 or Player 2 won. \nOr it was a tie. ");
};

function moveTieCardsAside() {
  console.log("\nTie cards have been slid left to make room for more cards. ");
};

function playPlayer1CardFaceDown() {
   console.log("\nPlayer 1 played a facedown card due to a tie.");
};

function playPlayer2CardFaceDown() {
   console.log("\nPlayer 2 played a facedown card due to a tie.");
};

function moveCardsToPlayer1WinPile() {
    console.log("\nPlayer 1 won! Moved cards to his Win pile.");
};

function moveCardsToPlayer2WinPile() {
    console.log("\nPlayer 2 won! Moved cards to his Win pile. ");
};

function movePlayer1WinPileToAmmoPile() {
    console.log("\nPlayer 1 ran out of cards! Move his Win pile over to his Ammo pile.");
};

function movePlayer2WinPileToAmmoPile() {
    console.log("\nPlayer 2 ran out of cards! Move his Win pile over to his Ammo pile. ");
};

function player1WinsTheGame() {
  console.log("\nPlayer 1 has WON THE GAME!!!!! <<imagine this part flashing n stuff...>>");
};

function goHome() {
  console.log("\nThat's it. It's over. Go home.");
};

