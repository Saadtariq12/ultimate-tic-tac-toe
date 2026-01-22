let currentPlayer = "X";
let mainboard = ["", "", "", "", "", "", "", "", ""];
let board = [
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
];
const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const innercell = document.querySelectorAll(".innercell");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];
let wholebox = document.querySelectorAll(".cell");
wholebox.forEach((cell) => {
  cell.style.backgroundColor = "#baafaf";
});
let currentIndex = null;
let latestcell = null;
let gameover = false;
innercell.forEach((innercell) =>
  innercell.addEventListener("click", handleClick)
);

function handleClick(e) {
  if (gameover) return;
  const index = e.target.getAttribute("data-index");
  const parentIndex =
    e.target.parentElement.parentElement.getAttribute("data-index");
  if (board[parentIndex][index] !== "" || mainboard[parentIndex] !== "") return;
  if (latestcell !== null && parentIndex != currentIndex) {
    statusText.innerText = "Wrong board! Play in the highlighted area.";
    return;
  }
  board[parentIndex][index] = currentPlayer;
  e.target.innerText = currentPlayer;
  const maincell = document.getElementsByClassName("cell")[parentIndex];
  if (checkLocalWinner(parentIndex)) {
    maincell.innerText = `${currentPlayer}`;
    mainboard[parentIndex] = currentPlayer;
    if (checkGlobalWinner()) {
      statusText.innerText = `Player ${currentPlayer} Wins the Game!`;
      gameover = true;
      return;
    }
  } else if (!board[parentIndex].includes("")) {
    maincell.innerText = "D";
    mainboard[parentIndex] = "D";
  }

  //Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `Player ${currentPlayer}'s Turn`;
  handleposition(index);
}
function checkLocalWinner(boardIndex) {
  const currentSubBoard = board[boardIndex]; // Gets the specific 1D array of 9 strings
  return winConditions.some((condition) => {
    return condition.every((cellIndex) => {
      return currentSubBoard[cellIndex] === currentPlayer;
    });
  });
}
function checkGlobalWinner() {
  let won = false;
  winConditions.forEach((condition) => {
    if (condition.every((index) => mainboard[index] === currentPlayer)) {
      won = true;
    }
  });
  return won;
}

function handleposition(index) {
  let wholebox = document.querySelectorAll(".cell");
  wholebox.forEach((cell) => {
    cell.style.backgroundColor = "";
  });
  if (mainboard[index] !== "") {
    let wholebox = document.querySelectorAll(".cell");
    wholebox.forEach((cell) => {
      cell.style.backgroundColor = "#baafaf";
    });
    latestcell = null;
    currentIndex = null;
    return;
  } else if (latestcell !== null) {
    latestcell.style.backgroundColor = "";
  }
  const currentCell = document.getElementsByClassName("cell")[index];
  currentCell.style.backgroundColor = "#baafaf";
  latestcell = currentCell;
  currentIndex = index;
}
function resetGame() {
    location.reload();
}
const modal = document.getElementById("rulesModal");
const btn = document.getElementById("howToPlayBtn");
const closeBtn = document.querySelector(".close-btn");

// Open the modal
btn.onclick = function () {
  modal.style.display = "block";
};
closeBtn.onclick = function () {
  modal.style.display = "none";
};
