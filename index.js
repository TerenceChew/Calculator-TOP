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
  if (b === 0) return 'LMAO. Division by 0 not allowed';
  return a / b;
}

function operate(operator, n1, n2) {
  let result;

  switch (operator) {
    case '+':
      result = add(n1, n2);
      break;
    case '-':
      result = subtract(n1, n2);
      break;
    case '*':
      result = multiply(n1, n2);
      break;
    case '/':
      result = divide(n1, n2);
  }

  return result;
}
