const board = document.querySelector("table");
const squares = document.querySelectorAll(".game-square");
const gameHeading = document.querySelector("#game-heading");
const restartButton = document.querySelector("#restart-button");

let player1Turn = true;

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("game-square")) {
    if (event.target.textContent === "") {
      if (player1Turn) {
        event.target.textContent = "X";
        gameHeading.textContent = "Player 2's Turn";
        player1Turn = false;
      } else {
        event.target.textContent = "O";
        gameHeading.textContent = "Player 1's Turn";
        player1Turn = true;
      }
    }

    checkForWin();
    checkForDraw();
  }
});

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkForWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      squares[a].textContent === squares[b].textContent &&
      squares[b].textContent === squares[c].textContent &&
      squares[a].textContent !== ""
    ) {
      gameHeading.textContent = `Player ${squares[a].textContent} wins!`;
      squares.forEach((square) => (square.disabled = true));
      showRestartButton();
    }
  }
}

function checkForDraw() {
  let draw = true;
  squares.forEach((square) => {
    if (square.textContent === "") {
      draw = false;
    }
  });

  if (draw) {
    gameHeading.textContent = "It's a draw!";
    showRestartButton();
  }
}

function showRestartButton() {
  restartButton.style.display = "block";
}

restartButton.addEventListener("click", () => {
  squares.forEach((square) => (square.textContent = ""));
  squares.forEach((square) => (square.disabled = false));
  gameHeading.textContent = "Player 1's Turn";
  player1Turn = true;
  restartButton.style.display = "none";
});
