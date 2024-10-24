const display = document.getElementById('value');
const buttons = document.querySelectorAll('.buttons span');
let currentInput = '';
let result = '';
let operator = '';
let shouldResetDisplay = false;
let operatorPressed = false;

let toggle_btn = document.querySelector('.toggle-btn');
let body = document.querySelector('body');

function updateDisplay(value) {
    display.innerText = value;
}

function clearDisplay() {
    currentInput = '';
    result = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay('0');
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        updateDisplay('0');
    } else {
        updateDisplay(currentInput);
    }
}

function handleInput(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    if (value === '.' && currentInput.includes('.')) return;

    currentInput += value;
    updateDisplay(currentInput);
}

function handleOperator(op) {
    if (currentInput === '' && operator !== '') {
        operator = op;
        return;
    }

    if (result === '') {
        result = currentInput;
    } else if (operator) {
        result = evaluate(result, currentInput, operator);
        updateDisplay(result);
    }

    operator = op;
    currentInput = '';
    operatorPressed = true;
}

function evaluate(num1, num2, operator) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) return 'Error';

    switch (operator) {
        case '+':
            return (n1 + n2).toString();
        case '-':
            return (n1 - n2).toString();
        case '*':
            return (n1 * n2).toString();
        case '/':
            if (n2 === 0) return 'Error';
            return (n1 / n2).toString();
        case '%':
            if (n2 !== '') return (n1 % n2).toString();
            return (n1 * 0.01).toString();
        default:
            return '';
    }
}

function calculate() {
    if (operator && currentInput !== '') {
        result = evaluate(result, currentInput, operator);
        updateDisplay(result);
        operator = '';
        shouldResetDisplay = true;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (value >= '0' && value <= '9' || value === '.') {
            handleInput(value);
        } else if (value === 'C') {
            clearDisplay();
        } else if (value === 'DEL') {
            deleteLast();
        } else if (value === '=') {
            calculate();
        } else {
            handleOperator(value);
        }
    });
});

clearDisplay();

toggle_btn.onclick = function () {
    body.classList.toggle('dark');
}
