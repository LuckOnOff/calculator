'use strict';

const inputField = document.getElementById('calcInput');

let input = '';
let previousInput = '';
let numbers = [];
let result = 0;

function clearResult() {
  input = '';
  previousInput = '';
  numbers = [];
  result = 0;
  updateDisplay();
}

function deleteLast() {
  input = input.slice(0, -1);
  numbers = numbers.slice(0, -1);
  updateDisplay();
}

function appendNumber(num) {
  input += num;
  updateDisplay();
}

function appendOperator(operator) {
  if (input !== '') {
    numbers.push(parseFloat(input));
  }
  numbers.push(operator);
  input = '';
  updateDisplay();
}

function calculateResult() {
  if (input !== '') {
    numbers.push(parseFloat(input));
  } else {
    return;
  }
  result = numbers[0];
  console.log(numbers);

  for(let i = 1; i < numbers.length; i += 2) {
    let operator = numbers[i];
    let nextNumber = numbers[i + 1];

    if(Number.isNaN(nextNumber)) {
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
    }
  }
  input = String(result);
  numbers = [];
  updateDisplay();
}

function updateDisplay() {
  inputField.value = input || '0';
}

document.addEventListener('keydown', function(event) {
  const keyPressed = event.key;

  if (keyPressed.startsWith('F') && keyPressed.length > 1) return;
  
  if (/[0-9]/.test(keyPressed)) {
    appendNumber(parseInt(keyPressed));
  } else if (keyPressed === '+' || keyPressed === '-' || keyPressed === '*' || keyPressed === '/') {
    appendOperator(keyPressed);
  } else if (keyPressed === '.') {
    appendOperator('.');
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