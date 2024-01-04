'use strict';

const inputField = document.getElementById('calcInput');

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

document.addEventListener('keydown', function(e) {
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