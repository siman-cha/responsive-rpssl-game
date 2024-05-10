const btnRules = document.getElementById("btn-rules");
const rulesPopup = document.getElementById("rules-popup");
const closeBtn = document.getElementById("close-btn");

let userScore = 0;
let compScore = 0;

let userChoice = "";
let compChoice = "";

const userScoreNum = document.querySelector("#score-num");

const pickCon = document.querySelector("#pick-con");
const msg = document.querySelector("#msg");
const msgBtn = document.querySelector("#msg-btn");

const choicesEl = document.querySelector("#choices");

const popup = document.querySelector("#popup");

const choices = document.querySelectorAll(".choice");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors", "spock", "lizard"];
  const randIdx = Math.floor(Math.random() * 5);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "IT'S A TIE";
  msg.style.color = "blue";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScoreNum.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.color = "green";
  } else {
    compScore++;
    msg.innerText = `You lose. ${compChoice} beats your ${userChoice}`;
    msg.style.color = "red";
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      // paper, spock, scissors, lizard
      userWin = compChoice === "paper" || compChoice === "spock" ? false : true;
    } else if (userChoice === "paper") {
      // scissors, lizard, rock, spock
      userWin =
        compChoice === "scissors" || compChoice === "lizard" ? false : true;
    } else if (userChoice === "scissors") {
      // rock, spock, paper, lizard
      userWin = compChoice === "rock" || compChoice === "spock" ? false : true;
    } else if (userChoice === "spock") {
      // paper, lizard, rock, scissors
      userWin =
        compChoice === "paper" || compChoice === "lizard" ? false : true;
    } else {
      // rock, scissors, paper, spock
      userWin =
        compChoice === "rock" || compChoice === "scissors" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

const startGame = () => {
  choicesEl.style.display = "none";
  pickCon.style.display = "block";
};

const tryAgain = () => {
  choicesEl.style.display = "block";
  pickCon.style.display = "none";
};

window.addEventListener("load", () => {
  choices.forEach((choice) => {
    choice.addEventListener("click", (ev) => {
      const userChoice = choice.getAttribute("id");
      compChoice = genCompChoice();
      playGame(userChoice);
      startGame();
    });
  });
  msgBtn.addEventListener("click", tryAgain);
});

btnRules.addEventListener("click", () => {
  rulesPopup.style.display = "block";
  popup.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  rulesPopup.style.display = "none";
  popup.classList.remove("active");
});
