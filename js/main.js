/*----- constants -----*/
const cardDeck;

/*----- app's state (variables) -----*/
const  gameState, winner, roundScore, gameScore;
const Player1AmmoStack; Player2AmmoStack, Player1WinStack, Player2WinStack, 
TieCardsStack;


/*----- cached element references -----*/
/* localStorage variables: */
/* FirstLaunchDemoMode (true | false) */

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

/*----- functions -----*/
function initializeGame() {
   console.log("\nGame Initialized.");
};

renderGame(); {
   console.log("\nGame Rendered. ");
};

function shuffleDeck() {
    console.log("\nCards shuffled.");
};

function showPayer1AmmoPile() {
    console.log("\nPlayer 1's Ammo Pile Visible.");
};

function hidePlayer1AmmoPile() {
    console.log("\nPlayer 1's Ammo Pile Hidden. ");
};

function showPlayer2AmmoPile() {
    console.log("\nPlayer 2's Ammp Pile Visible. ");
};

function hidePlayer2AmmoPile() {
    console.log("\nPlayer 2's Ammo Pile Hidden. ");
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
    console.log("\nCards have been compared. Either Player 1 or Player 2 won, or it was a tie. ");
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



