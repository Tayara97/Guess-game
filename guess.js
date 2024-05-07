let gameName = "Guess the word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} game created by el zero web school`;

// generate words
let wordtoGuess = "";
let words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Mainly",
  "Elzero",
  "School",
];
wordtoGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

// set options
let inputsContainer = document.querySelector(".game-area .inputs");
let numOfTries = 5;
let numOfLetters = 6;
let current = 1;
let numofHints = 2;
let msgContainer = document.querySelector(".game-area .message");

function generateInputs() {
  // create inputs and div
  for (let i = 1; i <= numOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled");
    for (let j = 1; j <= numOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.setAttribute("id", `guess-${i}-letter-${j}`);
      input.maxLength = 1;
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  const disabledInputsDiv = document.querySelectorAll(
    ".inputs div.disabled input"
  );
  disabledInputsDiv.forEach((input) => (input.disabled = true));
  const inputs = document.querySelectorAll(".inputs input");
  inputs.forEach((input, index) =>
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextinput = inputs[index + 1];
      if (nextinput) {
        nextinput.focus();
      }
    })
  );
}
//buttons
let successtries = true;
document.querySelector(".control .hint span").innerHTML = numofHints;
let hintBtn = document.querySelector(".control .hint");
hintBtn.addEventListener("click", gethint);
let checkButton = document.querySelector(".control .check");
checkButton.addEventListener("click", handleguess);

function handleguess() {
  for (let i = 1; i <= numOfLetters; i++) {
    let actualInput = document.querySelector(`#guess-${current}-letter-${i}`);

    let valueOfInput = actualInput.value.toLowerCase();
    let actualLetter = wordtoGuess[i - 1];

    if (valueOfInput == actualLetter) {
      actualInput.classList.add("right-in-place");
    } else if (wordtoGuess.includes(valueOfInput) && valueOfInput !== "") {
      actualInput.classList.add("not-in-place");
      successtries = false;
    } else {
      actualInput.classList.add("not");
      successtries = false;
    }
  }
  if (successtries == true) {
    msgContainer.innerHTML = ` you won the word is <span>${wordtoGuess}</span>`;
    let divs = document.querySelectorAll(".inputs > div");
    divs.forEach((div) => div.classList.add("disabled"));
    checkButton.disabled = true;
    hintBtn.disabled = true;
  } else {
    document.querySelector(`.inputs .try-${current}`).classList.add("disabled");
    const inputs = document.querySelectorAll(`.inputs .try-${current} input`);
    inputs.forEach((input) => (input.disabled = true));
    current++;
    let nextTryDiv = document.querySelector(`.inputs .try-${current}`);
    if (nextTryDiv) {
      successtries = true;
      const nextinputs = document.querySelectorAll(
        `.inputs .try-${current} input`
      );

      nextTryDiv.classList.remove("disabled");

      nextinputs.forEach((input) => (input.disabled = false));
      nextTryDiv.children[1].focus();
    } else {
      checkButton.disabled = true;
      hintBtn.disabled = true;
      msgContainer.innerHTML = `you lost the word is<span>${wordtoGuess}</span>`;
    }
  }
}

function gethint() {
  if (numofHints > 0) {
    numofHints--;
    document.querySelector(".control .hint span").innerHTML = numofHints;
  }
  if (numofHints === 0) {
    hintBtn.disabled = true;
  }
  let enabledInputs = document.querySelectorAll(
    ".inputs div:not(.disabled) input"
  );
  let emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );
  if (emptyEnabledInputs.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    let emptyInput = emptyEnabledInputs[randomIndex];
    let indexToFill = Array.from(enabledInputs).indexOf(emptyInput);
    if (indexToFill !== -1) {
      let hintLetter = wordtoGuess[indexToFill];
      emptyInput.value = hintLetter.toUpperCase();
    }
  }
}
function handleBackspace(e) {
  if (e.key === "Backspace") {
    let inputsArray = Array.from(
      document.querySelectorAll(".inputs div:not(.disabled) input")
    );

    const activeInput = document.activeElement;
    const activeIndex = inputsArray.indexOf(activeInput);
    const prevInput = inputsArray[activeIndex - 1];
    prevInput.value = "";
    prevInput.focus();

    activeInput.value = "";
  }
}

document.addEventListener("keydown", handleBackspace);

window.onload = function () {
  generateInputs();
};   
