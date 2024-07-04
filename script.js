const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const restartButton = document.getElementById('restart');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    if (checkWin()) {
        message.innerText = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        message.innerText = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function restartGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    message.innerText = '';
    cells.forEach(cell => cell.innerText = '');
}
