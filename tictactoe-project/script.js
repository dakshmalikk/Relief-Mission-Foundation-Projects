// Get all the necessary DOM elements
const statusDisplay = document.querySelector('.game--status');
const restartButton = document.querySelector('.game--restart');
const cells = document.querySelectorAll('.cell');

// Game state variables
let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];

// Messages for the status display
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Set the initial message
statusDisplay.innerHTML = currentPlayerTurn();

// All possible winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    // Update the game state and the UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    // Add class for styling X or O
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

function handlePlayerChange() {
    // Switch the current player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        
        // If any of the cells in a win condition is empty, continue
        if (a === '' || b === '' || c === '') {
            continue;
        }
        // If all three cells in a win condition are the same, we have a winner
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    // Check for a draw (if all cells are filled and no winner)
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    // If no one has won and it's not a draw, change the player
    handlePlayerChange();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Check if the cell has already been played or if the game is over
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // If the cell is valid, process the turn
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('x', 'o'); // Remove styling classes
    });
}

// Add event listeners to the cells and the restart button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);