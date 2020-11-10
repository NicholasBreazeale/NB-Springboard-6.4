const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let cards = [];
let highScore = Infinity;
let score = 0;

function handleCardClick(event) {
  if (cards.length < 2 && event.target.style.backgroundColor === "" && !cards.includes(event.target)) {
    // Reveal and add card to list
    event.target.style.backgroundColor = event.target.classList[0];
    cards.push(event.target);

    // Evaluate cards
    if (cards.length === 2) {
      // Increment score
      document.getElementById("score").innerText = ++score;

      for (let i = 1; i < cards.length; i++) {
        // Mismatched cards, hide them after a second
        if (cards[i].classList[0] !== cards[0].classList[0]) {
          setTimeout(function() {
            for (const card of cards) {
              card.style.removeProperty("background-color");
            }
            cards = [];
          }, 1000);
          return;
        }
      }
      cards = [];

      let complete = true;
      for (const elem of gameContainer.children) {
        if (elem.style.backgroundColor === "") {
          complete = false;
		  break;
        }
      }

      // Game completed
      if (complete) {
        // Display reset button
        document.getElementById("start").style.removeProperty("display");
        // Record high score
        if (highScore > score) {
          highScore = score;
		  document.getElementById("highScore").innerText = highScore;
          localStorage.setItem("highScore", highScore);
        }
      }
    }
  }
}

document.getElementById("start").addEventListener("click", function(event) {
  // Delete existing cards
  while (gameContainer.children.length > 0) {
    gameContainer.lastChild.remove();
  }
  // Add new cards
  createDivsForColors(shuffledColors);
  // Reset score
  score = 0;
  document.getElementById("score").innerText = "0";
  // Hide element
  event.target.style.display = "none";
  // Change text
  event.target.innerText = "Reset";
});

// Load high score
if (localStorage.getItem("highScore") !== null) {
  highScore = Number(localStorage.getItem("highScore"));
  document.getElementById("highScore").innerText = highScore;
}