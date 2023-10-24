'use strict';

const inputField = document.getElementById('calcInput');

let input = '';
let previousInput = '';
let result = 0;

function clearResult() {
  input = '';
  previousInput = '';
  result = 0;
  updateDisplay();
}

function deleteLast() {
  input = input.slice(0, -1);
  updateDisplay();
}

function appendNumber(num) {
  input += num;
  updateDisplay();
}

function appendOperator(operator) {
  input += operator;
  updateDisplay();
}

function calculateResult() {
  try {
    result = eval(input);
    previousInput = input;
    input = String(result);
    updateDisplay();
  } catch (error) {
    result = 'Error';
    updateDisplay();
  }
}

function updateDisplay() {
  inputField.value = input || result;
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
  } else if (keyPressed === 'c') {
    clearResult();
  }
  
});