'use strict';

const inputField = document.querySelector('.container-form__input');
const buttonBox = document.querySelector('.container-buttons-box');

const buttonActions = {
  'button-dot': appendDecimal,
  'button-clear': clearResult,
  'button-degree': () => appendOperator('**'),
  'button-delete-last': deleteLast,
  'button-nine': () => appendNumber(9),
  'button-eight': () => appendNumber(8),
  'button-seven': () => appendNumber(7),
  'button-divide': () => appendOperator('/'),
  'button-six': () => appendNumber(6),
  'button-five': () => appendNumber(5),
  'button-four': () => appendNumber(4),
  'button-multiplication': () => appendOperator('*'),
  'button-three': () => appendNumber(3),
  'button-two': () => appendNumber(2),
  'button-one': () => appendNumber(1),
  'button-minus': () => appendOperator('-'),
  'button-brackets': () => {},
  'button-zero': () => appendNumber(0),
  'button-result': calculateResult,
  'bottun-plus': () => appendOperator('+')
};

buttonBox.addEventListener('click', (e) => {
  const buttonPressed = e.target;
  const buttonClass = buttonPressed.classList[1];
  const action = buttonActions[buttonClass];
  
  if (action) {
    action();
  }
});

let input = '';
let numbers = [];
let result = 0;

function clearResult() {
  input = '';
  numbers = [];
  result = 0;
  updateDisplay();
}

function deleteLast() {
  if (input !== '') {
    input = input.slice(0, -1);
  } else if (numbers.length > 0) {
    const lastNumber = numbers[numbers.length - 1];
    if (typeof lastNumber === 'number') {
      numbers[numbers.length - 1] = Math.floor(lastNumber / 10);
    } else if (typeof lastNumber === 'string') {
      numbers.pop();
    }
  }
  updateDisplay();
}

function appendNumber(num) {
  input += num;
  updateDisplay();
}

function appendOperator(operator) {
  if (input !== '') {
    numbers.push(parseFloat(input));
  } else {
    return;
  }
  numbers.push(operator);
  input = '';
  updateDisplay();
}

function appendDecimal() {
  if (!input.includes('.')) {
    input += '.';
    updateDisplay();
  }
}

function calculateResult() {
  if (input !== '') {
    numbers.push(parseFloat(input));
  } else {
    return;
  }
  result = numbers[0];
  for(let i = 1; i < numbers.length; i += 2) {
    let operator = numbers[i];
    let nextNumber = numbers[i + 1];

    if(isNaN(result)) {
      return inputField.value = 'Ошибка', setTimeout(clearResult, 1000);
    }

    if(operator === '+') {
      result += nextNumber;
    } else if (operator === '-') {
      result -= nextNumber;
    } else if (operator === '*') {
      result *= nextNumber;
    } else if (operator === '/') {
      result /= nextNumber;
      if(result === Infinity) {
        return inputField.value = 'Ошибка', setTimeout(clearResult, 1000);
      }
    } else if(operator === '**') {
      result **= nextNumber;
    }
  }
  input = String(result);
  numbers = [];
  updateDisplay();
}

function updateDisplay() {
  inputField.value = numbers.join('') + input || '0';
}

document.addEventListener('keydown', (e) => {
  const keyPressed = e.key;

  if (keyPressed.startsWith('F') && keyPressed.length > 1) return;
  
  if (/[0-9]/.test(keyPressed)) {
    appendNumber(parseInt(keyPressed));
  } else if (keyPressed === '+' || keyPressed === '-' || keyPressed === '*' || keyPressed === '/') {
    appendOperator(keyPressed);
  } else if (keyPressed === '.') {
    appendDecimal();
  } else if (keyPressed === '^') {
    appendOperator('**');
  } else if (keyPressed === 'Enter') {
    calculateResult();
  } else if (keyPressed === 'Backspace') {
    deleteLast();
  } else if (keyPressed === 'с') {
    clearResult();
  }
  
});