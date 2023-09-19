const buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let gamePattern = [];


// generate random number 0 - 3 inclusive
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  let levelTitle = document.querySelector("#level-title");
  levelTitle.textContent = `Level ${level + 1}`;
  level++;
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  buttonAnimation(randomChosenColor);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function wrongAnswer() {
  let audio = new Audio(`sounds/wrong.mp3`);
  audio.play();
  document.querySelector("body").classList.add("game-over");
  setTimeout( () => {
    document.querySelector("body").classList.remove("game-over");
  }
  , 200);
  let levelTitle = document.querySelector("#level-title");
  levelTitle.textContent = `Game Over, Press Any Key to Restart`;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
      wrongAnswer();
      startOver();
      return
    }
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout( () => {
      nextSequence();
      userClickedPattern = [];
    }, 1000);
  }

}

document.addEventListener("keydown", () => {
  if (level === 0) {
    nextSequence();
  }
});

buttons = document.querySelectorAll(".btn");
// add event listener to each button
buttons.forEach( (button) => {
  button.addEventListener("click", (event) => {
    let userChosenColor = event.target.id;
    playSound(userChosenColor);
    buttonPress(event.target.id);
  });
});

function buttonAnimation (color) {
  playSound(color);
  let activeButton = document.querySelector(`#` + color);
  activeButton.classList.add("animate");
  setTimeout( () => {
    activeButton.classList.remove("animate");
  }
  , 300);
}

function buttonPress(currentColor) {
  userClickedPattern.push(currentColor);
  checkAnswer(userClickedPattern.length - 1);
  let activeButton = document.querySelector(`#` + currentColor);
  activeButton.classList.add("pressed");
  setTimeout( () => {
    activeButton.classList.remove("pressed");
  } , 100);
}

function playSound (color) {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

