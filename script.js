const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const restartButton = document.querySelector(".restart-button");

// Variáveis do jogo
let player = "X";
let board = Array(9).fill("");

// Combinações vencedoras
const wCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const updateStatus = (message) => {
  statusText.textContent = message || `Jogador ${player}, é a sua vez!`;
};

// Verificar vencedor ou empate
const checkGame = () => {
  for (const [a, b, c] of wCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return `Jogador ${player} venceu!`;
    }
  }
  if (!board.includes("")) return "Empate!";
  return null;
};


const handleCellClick = (cell, index) => {
  if (board[index]) return;
  board[index] = player;
  cell.textContent = player;
  const result = checkGame();
  if (result) {
    updateStatus(result);
    return;
  }
  player = player === "X" ? "O" : "X";
  updateStatus();
};

// Reinicia o jogo
const restartGame = () => {
  board.fill("");
  player = "X";
  cells.forEach((cell) => (cell.textContent = ""));
  updateStatus();
};

// Inicialização
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(cell, index));
});
restartButton.addEventListener("click", restartGame);
updateStatus();