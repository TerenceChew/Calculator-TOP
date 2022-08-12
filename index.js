let d1Content;
let d2Content;

// Operation variables
let n1;
let n2;
let currOperator;

// Buttons
const numBtns = document.querySelectorAll('.num');
const operatorBtns = document.querySelectorAll('.operator');
const acBtn = document.querySelector('.ac');
const delBtn = document.querySelector('.del');
const percentBtn = document.querySelector('.percent');
const decimalBtn = document.querySelector('.decimal');
const unaryBtn = document.querySelector('.unary');
const equalBtn = document.querySelector('.equal');

// Displays
const d1 = document.querySelector('.display1');
const d2 = document.querySelector('.display2');

// Event listeners
numBtns.forEach(btn => btn.addEventListener('click', appendNumber));
operatorBtns.forEach(btn => btn.addEventListener('click', appendOperator));
acBtn.addEventListener('click', clearDisplays);
delBtn.addEventListener('click', del);
percentBtn.addEventListener('click', appendPercent);
decimalBtn.addEventListener('click', appendDecimal);
unaryBtn.addEventListener('click', appendUnary);
equalBtn.addEventListener('click', evaluate);

function appendNumber(e, key = null) {
  // console.log('appendNumber');
  const num = key ? key : e.target.textContent;
  d2.textContent += num;
  d2Content = d2.textContent;
}

// If n1 and currOperator are undefined,
// they will be assigned once an operator is clicked
function appendOperator(e, key = null) {
  // console.log('appendOperator');
  const operator = key ? key : e.target.textContent;
  
  if (!d1Content && !d2Content) return;

  if (d1Content && !d2Content && lastCharIsOperator(d1Content)) {
    replaceOperator(operator);
  } else if (currOperator && d2Content) {
    evaluate();
    continueOperation(operator);
  } else {
    n1 = verifyOperandFormat(d2Content);
    currOperator = operator;
    d1.textContent = n1 + ' ' + operator;
    d1Content = d1.textContent;
    clearD2();
  }
}

// If an operand ends with a decimal, the decimal will be removed
function verifyOperandFormat(operand) {
  return operand.endsWith('.') ? operand.slice(0, -1) : operand;
}

function lastCharIsOperator(d1Content) {
  return '÷×+-'.includes(d1Content[d1Content.length - 1]);
}

function replaceOperator(operator) {
  currOperator = operator;
  d1.textContent = d1.textContent.slice(0, -1) + operator;
  d1Content = d1.textContent;
}

function continueOperation(operator) {
  n1 = verifyOperandFormat(d2Content);
  currOperator = operator;
  d1.textContent = n1 + ' ' + operator;
  d1Content = d1.textContent;
  clearD2();
}

function clearDisplays() {
  // console.log('clearDisplays');
  clearD1();
  clearD2();
  resetOperation();
}

function del() {
  // console.log('del');
  d2.textContent = d2.textContent.slice(0, -1);
  d2Content = d2.textContent;
}

function appendPercent() {
  // console.log('appendPercent');
  if (!d2Content) return;
  if (d2Content.includes('%')) return;
  d2.textContent += '%';
  d2Content = d2.textContent;
}

function appendDecimal() {
  // console.log('appendDecimal');
  if (d2Content.includes('.')) return;
  if (d2Content.endsWith('%')) return;
  if (!d2Content || d2Content.endsWith('-')) {
    d2.textContent += '0.';
    d2Content = d2.textContent;
  } else {
    d2.textContent += '.';
    d2Content = d2.textContent;
  }
}

function appendUnary() {
  // console.log('Unary');
  if (!d2Content) {
    d2.textContent += '-';
    d2Content = d2.textContent;
    return;
  }
  d2.textContent = d2Content.startsWith('-') ? 
                   d2Content.replace('-', '') :
                   '-' + d2Content;
  d2Content = d2.textContent;
}

// n2 is assigned during evaluation
function evaluate() {
  // console.log('evaluate');
  if (!d1Content || !d2Content) return;

  n2 = verifyOperandFormat(d2Content);
  let result = operate(currOperator, n1, n2);
  if (result === undefined) return;
  displayResult(processResult(result));
  resetOperation();
}

// Rounds result to five decimal places and remove trailing decimal zeros
function processResult(result) {
  return parseFloat(result.toFixed(5));
}

function displayResult(result) {
  d1.textContent += n2.startsWith('-') ? ` (${n2}) =` : ` ${n2} =`;
  d1Content = d1.textContent;
  d2.textContent = result;
  d2Content = d2.textContent;
}

function resetOperation() {
  n1 = '';
  n2 = '';
  currOperator = '';
}

function clearD1() {
  d1.textContent = '';
  d1Content = '';
}

function clearD2() {
  d2.textContent = '';
  d2Content = '';
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  if (a === 0 || b === 0) return 0;
  return a * b;
}

function divide(a, b) {
  if (b === 0) return 'LMAO! Can\'t divide by zero';
  return a / b;
}

function addPercent(a, b) {
  return a + (a * b);
}

function subtractPercent(a, b) {
  return a - (a * b);
}

function processOperand(operand) {
  return operand.includes('%') ? Number(operand.slice(0, -1)) / 100 : Number(operand);
}

function operate(operator, a, b) {
  let n1 = processOperand(a);
  let n2 = processOperand(b);
  let result;

  switch (operator) {
    case '+':
      result = b.includes('%') ? addPercent(n1, n2) : add(n1, n2);
      break;
    case '-':
      result = b.includes('%') ? subtractPercent(n1, n2) : subtract(n1, n2);
      break;
    case '×':
      result = multiply(n1, n2);
      break;
    case '÷':
      result = divide(n1, n2);
  }

  return result;
}

// Keyboard support
window.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
  // console.log('handleKeydown');
  const key = e.key;

  if ('1234567890'.includes(key)) appendNumber(null, key);
  
  if ('+-'.includes(key)) appendOperator(null, key);

  if (key === '*' || key === 'x') appendOperator(null, '×');

  if (key === '/') appendOperator(null, '÷');
  
  if (key === 'Enter') evaluate();

  if (key === 'Backspace') del();

  if (key === 'Escape') clearDisplays();

  if (key === '.') appendDecimal();

  if (key === '%') appendPercent();

  if (key === 'u') appendUnary();
}

// Footer
const footerText = document.querySelector('.footer-text');
let currYear = new Date().getFullYear();
footerText.textContent = `Copyright Ⓒ ${currYear} Terence`;


