// my solution
const container = document.querySelector(".container");
let display = document.querySelector(".number-display");
let mirrorDisplay = "0";
let prevOperator = null;
let runningTotal = 0;

const clearAll = () => {
  display.innerText = 0;
  mirrorDisplay = "0";
  runningTotal = 0;
  prevOperator = null;
};
//number buttons
const handleNumbers = (value) => {
  if (display.innerText === "0" && display.innerText.length === 1) {
    // reset to allow for single digit
    display.innerText = "";
  }
  //add new value or add onto existing value
  display.innerText += value;
  mirrorDisplay = display.innerText;
};
//undo button
const handleUndo = () => {
  if (display.innerText.length === 1) {
    display.innerText = 0;
  } else if (runningTotal === parseInt(display.innerText)) {
    return;
  } else {
    display.innerText = mirrorDisplay.slice(0, -1);
    mirrorDisplay = display.innerText;
  }
};
const setEquation = (operator) => {
  if (runningTotal === parseInt(display.innerText)) {
    display.innerText = 0;
    return;
  } else if (prevOperator === null) {
    runningTotal = parseInt(mirrorDisplay);
  } else {
    switch (prevOperator) {
      case "+":
        runningTotal += parseInt(mirrorDisplay);
        break;
      case "-":
        runningTotal -= parseInt(mirrorDisplay);
        break;
      case "×":
        runningTotal *= parseInt(mirrorDisplay);
        break;
      case "÷":
        runningTotal /= parseInt(mirrorDisplay);
        break;
    }
  }
  prevOperator = operator;
  mirrorDisplay = "0";
  display.innerText = 0;
};

const handleDisplay = (updatedNum) => {
  display.innerText = updatedNum;
  mirrorDisplay = "0";
};

const runEquation = () => {
  if (prevOperator === "+") {
    runningTotal += parseInt(mirrorDisplay);
  } else if (prevOperator === "-") {
    runningTotal -= parseInt(mirrorDisplay);
  } else if (prevOperator === "×") {
    runningTotal *= parseInt(mirrorDisplay);
  } else {
    runningTotal /= parseInt(mirrorDisplay);
  }
  display.innerText = runningTotal;
};

container.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    // reset button
    if (event.target.className === "clear") {
      clearAll();
    }
    if (event.target.className === "number") {
      handleNumbers(event.target.innerText);
    }
    // undo button
    if (event.target.className === "undo") {
      handleUndo();
    }
    //operator buttons
    switch (event.target.className) {
      case "divide":
      case "multiply":
      case "sub":
      case "add":
        setEquation(event.target.innerText);
        break;
      case "answer":
        runEquation();
        break;
    }
  }
});
