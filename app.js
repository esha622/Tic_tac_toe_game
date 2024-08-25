let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-Container");
let msg = document.querySelector(".msg");
let modeSelect = document.querySelector(".mode-select");

let turnO = true; // player O, player X
let computerMode = false;
let humanMode = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [3, 4, 5],
  [2, 4, 6],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (humanMode) {
      humanTurn(box);
    } else if (computerMode) {
      userTurn(box);
    }
  });
});

const humanTurn = (box) => {
  if (turnO) {
    box.innerText = "O";
    box.classList.add("o-color");
    turnO = false;
  } else {
    box.innerText = "X";
    box.classList.add("x-color");
    turnO = true;
  }
  box.disabled = true;
  checkWinner();
}

const userTurn = (box) => {
  if (turnO) {
    box.innerText = "O";
    box.classList.add("o-color");
    turnO = false;
  } else {
    box.innerText = "X";
    box.classList.add("x-color");
    turnO = true;
  }
  box.disabled = true;
  checkWinner();
  setTimeout(computerTurn, 500); // wait 500ms before computer makes a move
}

const computerTurn = () => {
  let availableBoxes = [];
  for (let box of boxes) {
    if (!box.disabled) {
      availableBoxes.push(box);
    }
  }
  let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
  if (turnO) {
    randomBox.innerText = "O";
    randomBox.classList.add("o-color");
    turnO = false;
  } else {
    randomBox.innerText = "X";
    randomBox.classList.add("x-color");
    turnO = true;
  }
  randomBox.disabled = true;
  checkWinner();
}

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("o-color");
    box.classList.remove("x-color");
  }
}

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
}

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  msg.innerText = "";
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

modeSelect.addEventListener("change", () => {
  if (modeSelect.value === "human") {
    humanMode = true;
    computerMode = false;
  } else if (modeSelect.value === "computer") {
    humanMode = false;
    computerMode = true;
  }
});