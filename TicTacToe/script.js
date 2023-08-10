const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.querySelector('.restart-button');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(e) {
    const cell = e.target;
    cell.textContent = currentPlayer;
    if (checkWin()) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        cells.forEach(cell => {
            cell.removeEventListener('click', handleCellClick);
        });
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick, { once: true });
        });
    }
}

function checkWin() {
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent !== '';
    });
}

function endGame(draw) {
    if (draw) {
        alert('It\'s a draw!');
    } else {
        alert(`Player ${currentPlayer} wins!`);
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}
