"use strict";
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const button5 = document.getElementById('button5');
const resetButton = document.getElementById('button');
const error_1 = document.getElementById('error_1');
const error_2 = document.getElementById('error_2');
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const customTipInput = document.getElementById('customTip');
const tipAmountElement = document.getElementById('tipAmount');
const totalAmountElement = document.getElementById('totalAmount');
let tipPercentage = 0;
// Function to handle button activation
function setActiveButton(button) {
    // Remove 'active' class from all buttons
    [button1, button2, button3, button4, button5].forEach(btn => btn.classList.remove('active'));
    // Add 'active' class to the clicked button
    button.classList.add('active');
}
// Function to set tip and handle button state
function setTip(tip, button) {
    tipPercentage = tip;
    setActiveButton(button);
    calculate();
}
// Function to set custom tip and handle button state
function setCustomTip() {
    const customTip = parseFloat(customTipInput.value);
    tipPercentage = isNaN(customTip) ? 0 : customTip;
    // Remove 'active' class from all preset buttons
    [button1, button2, button3, button4, button5].forEach(btn => btn.classList.remove('active'));
    calculate();
}
// Function to handle calculation
function calculate() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value, 10);
    billInput.classList.remove('invalid-input');
    peopleInput.classList.remove('invalid-input');
    error_1.style.display = 'none';
    error_2.style.display = 'none';
    let hasError = false;
    if (isNaN(bill) || bill <= 0) {
        billInput.classList.add('invalid-input');
        error_1.style.display = 'inline';
        hasError = true;
    }
    if (isNaN(people) || people <= 0) {
        peopleInput.classList.add('invalid-input');
        error_2.style.display = 'inline';
        hasError = true;
    }
    if (hasError) {
        return;
    }
    const tipAmount = (bill * (tipPercentage / 100)) / people;
    const totalAmount = (bill + (bill * (tipPercentage / 100))) / people;
    tipAmountElement.innerText = `$${tipAmount.toFixed(2)}`;
    totalAmountElement.innerText = `$${totalAmount.toFixed(2)}`;
}
// Function to reset all fields and states
function reset() {
    billInput.value = '';
    peopleInput.value = '';
    customTipInput.value = '';
    tipPercentage = 0;
    tipAmountElement.innerText = '$0.00';
    totalAmountElement.innerText = '$0.00';
    billInput.classList.remove('invalid-input');
    peopleInput.classList.remove('invalid-input');
    error_1.style.display = 'none';
    error_2.style.display = 'none';
    // Remove 'active' class from all buttons
    [button1, button2, button3, button4, button5].forEach(btn => btn.classList.remove('active'));
}
button1.addEventListener('click', () => setTip(5, button1));
button2.addEventListener('click', () => setTip(10, button2));
button3.addEventListener('click', () => setTip(15, button3));
button4.addEventListener('click', () => setTip(25, button4));
button5.addEventListener('click', () => setTip(50, button5));
customTipInput.addEventListener('input', setCustomTip);
resetButton.addEventListener('click', reset);
