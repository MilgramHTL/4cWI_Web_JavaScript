// script.js
let balance = 1000;
let currentBet = 0;

function placeBet(amount) {
    if (balance >= amount) {
        currentBet = amount;
        document.getElementById('result').innerText = `Bet placed: $${amount}`;
    } else {
        document.getElementById('result').innerText = 'Insufficient balance!';
    }
}

function spinWheel() {
    if (currentBet === 0) {
        document.getElementById('result').innerText = 'Place a bet first!';
        return;
    }

    const result = Math.floor(Math.random() * 37); // 0 to 36
    const win = result % 2 === 0; // Simple win condition: even numbers win

    if (win) {
        balance += currentBet;
        document.getElementById('result').innerText = `You win! Number: ${result}`;
    } else {
        balance -= currentBet;
        document.getElementById('result').innerText = `You lose! Number: ${result}`;
    }

    document.getElementById('balance').innerText = `Balance: $${balance}`;
    currentBet = 0;
}