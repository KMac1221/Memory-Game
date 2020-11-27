
const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let flippedCards = 0;
let noClicking = false;

const Colors = [
  "orange",
  "green",
  "red",
  "purple",
  "blue",
  "orange",
  "green",
  "red",
  "purple",
  "blue"
];
function shuffle(array) {
  let count = array.length;
  while (count > 0) {
    let index = Math.floor(Math.random() * count);
    count--;
    let temp = array[count];
    array[count] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledCards = shuffle(Colors);
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const div = document.createElement("div");
    div.classList.add(color);
    div.addEventListener("click", cardClick);
    gameContainer.append(div);
  }
}

function cardClick(e) {
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    let gif1 = card1.className;
    let gif2 = card2.className;
    if (gif1 === gif2) {
      flippedCards += 2;
      card1.removeEventListener("click", cardClick);
      card2.removeEventListener("click", cardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (flippedCards === Colors.length) alert("GAME OVER!");
}

createDivsForColors(shuffledCards);
