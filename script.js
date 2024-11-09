const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameState = Array(9).fill('');
let isGameActive = true;

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

const checkWinner = () => {
  let won = false;
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      won = true;
      break;
    }
  }
  return won;
};

const isDraw = () => gameState.every(cell => cell !== '');

const updateStatus = (message) => {
  statusMessage.textContent = message;
};

const handleClick = (e) => {
  const index = e.target.getAttribute('data-index');

  if (!isGameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    updateStatus(`Player ${currentPlayer} wins!`);
    isGameActive = false;
  } else if (isDraw()) {
    updateStatus('It\'s a draw!');
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Player ${currentPlayer}'s turn`);
  }
};

const resetGame = () => {
  gameState = Array(9).fill('');
  currentPlayer = 'X';
  isGameActive = true;
  updateStatus(`Player ${currentPlayer}'s turn`);
  cells.forEach(cell => (cell.textContent = ''));
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

updateStatus(`Player ${currentPlayer}'s turn`);
