const startBtn = document.querySelector(".btn-start");
const allCells = document.querySelectorAll(".cell");
const gridContainer = document.querySelector(".grid-container");
const statusLabel = document.querySelector(".status");
const playerMin1 = document.querySelector(".player1-min");
const playerMin2 = document.querySelector(".player2-min");
const playerSec1 = document.querySelector(".player1-sec");
const playerSec2 = document.querySelector(".player2-sec");

// Required constants
let currentPlayer = "X";
const winningArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let cells = ["", "", "", "", "", "", "", "", ""];
let clock1;
let clock2;
let sec1 = 59;
let sec2 = 59;

// function when pressed start
gridContainer.style.pointerEvents = "none";
startBtn.addEventListener("click", function () {
  gridContainer.style.pointerEvents = "auto";
  sec1 = 59;
  sec2 = 59;
  timer1();
  playerMin1.textContent = "00:";
  startBtn.disabled = true;

  statusLabel.textContent = `Current Player: X`;
});

// Grid box event listeners
gridContainer.addEventListener("click", function (e) {
  let cellIndex = e.target.getAttribute("id");
  let currentBox = e.target;
  if (cells[cellIndex] != "") {
    return;
  }
  cells[cellIndex] = currentPlayer;
  console.log(cells);
  currentBox.textContent = currentPlayer;
  winningCondition();
  changePlayer();
  if (currentPlayer == "O") {
    timer2();
    clearInterval(clock1);
  } else if (currentPlayer == "X") {
    timer1();
    clearInterval(clock2);
  }
});

// changing current player
const changePlayer = function () {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusLabel.textContent = `Current Player: ${currentPlayer}`;
};

// check win condition
const winningCondition = function () {
  for (let i = 0; i < winningArray.length; i++) {
    const currentCondition = winningArray[i];
    const box1 = cells[currentCondition[0]];
    const box2 = cells[currentCondition[1]];
    const box3 = cells[currentCondition[2]];

    if (box1 == "" || box2 == "" || box3 == "") {
      continue;
    }

    if (box1 == box2 && box2 == box3) {
      statusLabel.textContent = `${currentPlayer} won`;
      reset();
      break;
    }
  }
};

// reset game
const reset = function () {
  currentPlayer = "X";
  cells = ["", "", "", "", "", "", "", "", ""];
  allCells.forEach((element) => {
    element.textContent = "";
  });
  clearInterval(clock1);
  clearInterval(clock2);
  playerMin1.textContent = "01:";
  playerMin2.textContent = "01:";
  playerSec1.textContent = "00";
  playerSec2.textContent = "00";
  gridContainer.style.pointerEvents = "none";
  startBtn.disabled = false;
  gridContainer.removeEventListener();
};

// clock 1
const timer1 = function () {
  playerSec1.textContent = sec1;
  clock1 = setInterval(() => {
    sec1 -= 1;
    if (sec1 == 0) {
      alert("Player 1 timeout");
      reset();
    } else playerSec1.textContent = sec1;
  }, 1000);
};

// clock 2
const timer2 = function () {
  playerMin2.textContent = "00:";
  playerSec2.textContent = sec2;
  clock2 = setInterval(() => {
    sec2 -= 1;
    if (sec2 == 0) {
      alert("Player 2 timeout");
      reset();
    } else playerSec2.textContent = sec2;
  }, 1000);
};
