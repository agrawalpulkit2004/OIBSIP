const display = document.querySelector(".display input");

// Update the display value when a button is clicked
function updateDisplay(value) {
  display.value += value;
}

// Evaluate the current display expression and update the display
function calculate() {
  const expression = display.value;
  try {
    const result = eval(expression);
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

// Clear the display
function clearDisplay() {
  display.value = "";
}

// Delete the last character from the display
function deleteChar() {
  display.value = display.value.slice(0, -1);
}

// Calculate the percentage of the current display value
function calculatePercentage() {
  display.value = display.value / 100;
}

// Calculate the square root of the current display value
function calculateSquareRoot() {
  display.value = Math.sqrt(display.value);
}

// Add opening and closing brackets to the current display value
function addBrackets() {
  const currentDisplayValue = display.value;
  const lastChar = currentDisplayValue.slice(-1);
  if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/" || lastChar === "(") {
    updateDisplay("(");
  } else if (lastChar === ")") {
    const brackets = currentDisplayValue.split("").reduce((acc, char) => {
      if (char === "(") {
        acc.opening++;
      } else if (char === ")") {
        acc.closing++;
      }
      return acc;
    }, { opening: 0, closing: 0 });
    if (brackets.opening > brackets.closing) {
      updateDisplay(")");
    }
  } else {
    updateDisplay("*(");
  }
}

// Negate the current display value
function negateValue() {
  display.value = -display.value;
}

// Attach event listeners to buttons
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;
    switch (buttonValue) {
      case "=":
        calculate();
        break;
      case "C":
        clearDisplay();
        break;
      case "CE":
        deleteChar();
        break;
      case "%":
        calculatePercentage();
        break;
      case "√":
        calculateSquareRoot();
        break;
      case "()":
        addBrackets();
        break;
      case "+/-":
        negateValue();
        break;
      default:
        updateDisplay(buttonValue);
        break;
    }
  });
});

// Allow keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const allowedKeys = ["+", "-", "*", "/", "(", ")", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  if (allowedKeys.includes(key)) {
    event.preventDefault();
    updateDisplay(key);
  } else if (key === "=" || key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    event.preventDefault();
    deleteChar();
  } else if (key === "Escape") {
    event.preventDefault();
    clearDisplay();
  }
});
