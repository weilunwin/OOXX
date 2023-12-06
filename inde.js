const container = document.querySelector(".container");
const content = document.querySelector(".content");
const box = document.querySelectorAll(".box");
const reset = document.querySelector(".reset");
const turn = document.querySelector(".turn");

let circleTurn = true;
let scissorTurn = true;

let circleWin = false;
let scissorWin = false;

let circleLine = [];
let scissorLine = [];

const wins = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],

  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],

  [1, 5, 9],
  [3, 5, 7],
];

const circleControl = (target) => {
  if (!target.classList.contains("circle")) {
    if (circleTurn) {
      turn.innerText = "換X下";
      if (target.classList.contains("scissor")) return;
      target.classList.add("circle");
      target.innerText = "O";
      circleLine.push(Number(target.classList[1]));
      console.log("circle:", circleLine);
      circleTurn = false;
      scissorTurn = true;
      if (checkWin(circleLine)) {
        circleWin = true;
        restartWrapper(circleWin, "Circle");
        console.log("Circle wins!");
      }
    }
  }
};

const scissorControl = (target) => {
  if (!target.classList.contains("scissor")) {
    turn.innerText = "換O下";
    if (scissorTurn) {
      if (target.classList.contains("circle")) return;
      target.classList.add("scissor");
      target.innerText = "X";
      scissorLine.push(Number(target.classList[1]));
      console.log("scissor:", scissorLine);
      scissorTurn = false;
      circleTurn = true;
      if (checkWin(scissorLine)) {
        scissorWin = true;
        restartWrapper(scissorWin, "Scissor");
        console.log("Scissor wins!");
      }
    }
  }
};

const checkWin = (winningPlayer) => {
  return wins.some((winLine) => {
    return winLine.every((line) => {
      return winningPlayer.includes(line);
    });
  });
};

const restartWrapper = (winTrue, who) => {
  if (winTrue === true) {
    let resetWrapper = document.createElement("div");
    resetWrapper.classList.add("reset-wrapper");
    resetWrapper.innerHTML = `<button class="reset">RESTART</button>`;
    container.appendChild(resetWrapper);
    setTimeout(() => {
      alert(`${who} wins!`);
    }, 200);
  }
};

const resetEvent = (target) => {
  if (target.classList.contains("reset")) {
    const resetWrapper = document.querySelector(".reset-wrapper");
    resetWrapper.remove();
    box.forEach((item) => {
      item.classList.remove("circle", "scissor");
      item.innerText = "";
    });
    circleLine = [];
    scissorLine = [];
    circleWin = false;
    scissorWin = false;
    circleTurn = true;
    scissorTurn = true;
    turn.innerText = "";
  }
};

const allFull = () => {
  if (circleLine.length === 5) {
    let resetWrapper = document.createElement("div");
    resetWrapper.classList.add("reset-wrapper");
    resetWrapper.innerHTML = `<button class="reset">RESTART</button>`;
    container.appendChild(resetWrapper);
    setTimeout(() => {
      alert("和局");
    }, 200);
  }
};

content.addEventListener("click", (e) => {
  const target = e.target;
  if (circleTurn) {
    circleControl(target);
  } else {
    scissorControl(target);
  }
});

container.addEventListener("click", (e) => {
  const target = e.target;
  resetEvent(target);
  allFull();
});
