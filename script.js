const STAR_CLASS = 'star';
const CIRCLE_CLASS = 'circle';
const STAR_SYMBOL = '★';
const CIRCLE_SYMBOL = '⚪';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const playerTurnElement = document.getElementById('playerTurn');
const winnerPopup = document.getElementById('winnerPopup');
const winnerMessage = document.getElementById('winnerMessage');
const playAgainButton = document.getElementById('playAgainButton');
let circleTurn;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

playAgainButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(STAR_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    setPlayerTurnText();
    winnerPopup.classList.remove('show');
    document.body.classList.remove('blur');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : STAR_CLASS;
    const currentSymbol = circleTurn ? CIRCLE_SYMBOL : STAR_SYMBOL;
    placeMark(cell, currentClass, currentSymbol);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        setPlayerTurnText();
    }
}

function endGame(draw) {
    if (draw) {
        winnerMessage.textContent = 'Draw!';
    } else {
        winnerMessage.textContent = `${circleTurn ? "Circle (⚪)" : "Star (★)"} Wins!`;
    }
    winnerPopup.classList.add('show');
    document.body.classList.add('blur');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(STAR_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass, currentSymbol) {
    cell.classList.add(currentClass);
    cell.textContent = currentSymbol;
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(STAR_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(STAR_CLASS);
    }
}

function setPlayerTurnText() {
    playerTurnElement.textContent = `${circleTurn ? "Circle (⚪)" : "Star (★)"}'s Turn`;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
