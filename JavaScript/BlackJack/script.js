let deck, dealerHand, playerHand;
let gameEnded;
let balance = 100;
let currentBet = 0;

function initializeGame() {
    gameEnded = false;
    
    // Reset and enable betting controls
    document.getElementById('bet-amount').disabled = false;
    document.getElementById('bet-amount').value = '';
    document.getElementById('place-bet-button').disabled = false;
    
    // Disable game buttons until bet is placed
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
    
    deck = createDeck();
    dealerHand = [];
    playerHand = [];
    shuffleDeck(deck);
    dealInitialCards();
    updateUI();
    updateMoneyDisplay();
}

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealInitialCards() {
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    
    // Check for player blackjack immediately
    if (calculateHandValue(playerHand) === 21) {
        gameEnded = true;
        updateUI();
        setTimeout(() => {
            alert("Blackjack!");
            determineWinner();
        }, 500);
    }
}

function updateUI() {
    const playerCardsDiv = document.getElementById('player-cards');
    const dealerCardsDiv = document.getElementById('dealer-cards');
    const messageDiv = document.getElementById('message');
    
    // Clear existing cards
    playerCardsDiv.innerHTML = '';
    dealerCardsDiv.innerHTML = '';
    
    // Update player cards
    playerHand.forEach(card => {
        playerCardsDiv.appendChild(createCardElement(card));
    });
    
    // Update dealer cards
    dealerHand.forEach((card, index) => {
        if (!gameEnded && index === 1) {
            dealerCardsDiv.appendChild(createCardElement(null, true));
        } else {
            dealerCardsDiv.appendChild(createCardElement(card));
        }
    });
    
    // Update scores
    document.getElementById('player-score').innerText = `Score: ${calculateHandValue(playerHand)}`;
    if (gameEnded) {
        document.getElementById('dealer-score').innerText = `Score: ${calculateHandValue(dealerHand)}`;
    } else {
        document.getElementById('dealer-score').innerText = 'Score: ?';
    }
}

function createCardElement(card, hidden = false) {
    const cardDiv = document.createElement('div');
    cardDiv.className = `card ${hidden ? 'hidden' : ''}`;
    
    if (!hidden && card) {
        const isRed = card.suit === 'Hearts' || card.suit === 'Diamonds';
        cardDiv.className += isRed ? ' red' : ' black';
        
        const valueDiv = document.createElement('div');
        valueDiv.className = 'card-value';
        valueDiv.textContent = card.value;
        
        const suitDiv = document.createElement('div');
        suitDiv.className = 'card-suit';
        suitDiv.textContent = getSuitSymbol(card.suit);
        
        cardDiv.appendChild(valueDiv);
        cardDiv.appendChild(suitDiv);
    }
    
    return cardDiv;
}

function getSuitSymbol(suit) {
    const symbols = {
        'Hearts': '♥',
        'Diamonds': '♦',
        'Clubs': '♣',
        'Spades': '♠'
    };
    return symbols[suit];
}

function calculateHandValue(hand) {
    let value = 0;
    let aces = 0;
    
    for (let card of hand) {
        if (card.value === 'A') {
            aces += 1;
            value += 11;
        } else if (['K', 'Q', 'J'].includes(card.value)) {
            value += 10;
        } else {
            value += parseInt(card.value);
        }
    }
    
    while (value > 21 && aces > 0) {
        value -= 10;
        aces -= 1;
    }
    
    return value;
}

function determineWinner() {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);
    const messageDiv = document.getElementById('message');
    
    let message;
    if (playerValue > 21) {
        message = "Dealer wins! Player busted!";
        // Player loses their bet (already deducted)
    } else if (dealerValue > 21) {
        message = "Player wins! Dealer busted!";
        balance += currentBet * 2;
    } else if (playerValue === 21 && playerHand.length === 2) {
        message = "Blackjack! Player wins!";
        balance += currentBet * 2.5;
    } else if (playerValue > dealerValue) {
        message = "Player wins!";
        balance += currentBet * 2;
    } else if (dealerValue > playerValue) {
        message = "Dealer wins!";
        // Player loses their bet (already deducted)
    } else {
        message = "It's a tie!";
        balance += currentBet;
    }
    
    currentBet = 0;
    updateMoneyDisplay();
    messageDiv.innerText = message;
    
    if (balance <= 0) {
        messageDiv.innerText += " Game Over! Click 'New Game' to play again!";
    }
    
    // Only auto-reset if player still has money
    if (balance > 0) {
        setTimeout(() => {
            resetForNextHand();
        }, 2000);
    }
    
    return message;
}

function resetForNextHand() {
    gameEnded = false;
    
    // Reset and enable betting controls
    document.getElementById('bet-amount').disabled = false;
    document.getElementById('bet-amount').value = '';
    document.getElementById('place-bet-button').disabled = false;
    
    // Disable game buttons until bet is placed
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
    
    deck = createDeck();
    dealerHand = [];
    playerHand = [];
    shuffleDeck(deck);
    updateUI();
    updateMoneyDisplay();
}

document.getElementById('hit-button').addEventListener('click', async () => {
    playerHand.push(deck.pop());
    updateUI();
    
    if (calculateHandValue(playerHand) > 21) {
        gameEnded = true;
        updateUI();
        await new Promise(resolve => setTimeout(resolve, 500));
        document.getElementById('message').innerText = "Bust! You went over 21!";
        disableGameButtons();
        determineWinner();
    }
});

document.getElementById('stand-button').addEventListener('click', async () => {
    gameEnded = true;
    disableGameButtons();
    updateUI(); // Show the hidden card first
    
    // Add delay before dealer starts playing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);
    
    // Only continue playing if dealer hasn't already won
    if (playerValue <= 21) {  // If player hasn't busted
        while (calculateHandValue(dealerHand) < 17 || 
              (calculateHandValue(dealerHand) < playerValue && calculateHandValue(dealerHand) <= 21)) {
            dealerHand.push(deck.pop());
            updateUI();
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (calculateHandValue(dealerHand) > 21) {
                break;
            }
        }
    }
    
    updateUI();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay before showing result
    determineWinner();
});

function disableGameButtons() {
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
}

document.getElementById('new-game-button').addEventListener('click', () => {
    if (balance <= 0) {
        balance = 100;
        updateMoneyDisplay();
        resetForNextHand();
    }
});

document.getElementById('place-bet-button').addEventListener('click', () => {
    if (placeBet()) {
        dealInitialCards();
        updateUI();
    }
});

function updateMoneyDisplay() {
    document.getElementById('balance').innerText = `Balance: ${balance}€`;
    document.getElementById('current-bet').innerText = `Current Bet: ${currentBet}€`;
}

function placeBet() {
    const betInput = document.getElementById('bet-amount');
    const betAmount = parseInt(betInput.value);
    
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Please enter a valid bet amount!');
        return false;
    }
    
    if (betAmount > balance) {
        alert('Not enough funds!');
        return false;
    }
    
    currentBet = betAmount;
    balance -= betAmount;
    updateMoneyDisplay();
    
    // Disable betting controls and enable game controls
    document.getElementById('bet-amount').disabled = true;
    document.getElementById('place-bet-button').disabled = true;
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;
    
    return true;
}

initializeGame();
updateMoneyDisplay();
