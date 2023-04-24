'use strict';

// Calculator and numbers boxes , screen box.
const calculator = document.querySelector('#calc_box'),
      calcScreen = calculator.querySelector('#calc_screen'),
      calcActionButtons = calculator.querySelectorAll('#calc_actions button'),
      calcNumberButtons = calculator.querySelectorAll('#calc_numbers button');

// Indicates if calculation is finished , used to clear screen when typing after "=" was pressed.
let isCalculated = false;

// Function that cleans calculator screen.
const clearScreen = () => {
    calcScreen.innerHTML = '';
};

// Function that makes functionality of number buttons and shows numbers on screen.
const input = () => {
    calcNumberButtons.forEach ((button, i) => {
        button.addEventListener ('click', () => {
            if (isCalculated) {
                clearScreen();
                console.log(isCalculated);
                isCalculated = false;
            }

            if (i < 9) {
                calcScreen.innerHTML += i + 1;
            } else if (i == 9) {
                clearScreen();
            } else if (i == 10) {
                calcScreen.innerHTML += 0;
            }
        });
    });
};

// Function that checks length of number on screen , and depending on it shows scroll bar.
const overflow = setInterval(() => {
    if (calcScreen.innerHTML.length > 11) {
        calcScreen.style.overflow = 'scroll';
        calcScreen.style.overflowY = 'hidden';
    } else {
        calcScreen.style.overflow = 'hidden';
    }
}, 10); 

// Function that makes all calculations.
const calculation = () => {
    // Operator indicates what action is active and should be done ("+", "-", "*" or "/"), value keeps last result.
    let operator = 0,
        value = 0;
    
    // Functionality of operator buttons ("+", "-", "*" and "/").
    calcActionButtons.forEach((button, i) => {
        button.addEventListener('click', () => {
            if (operator == 0) {
                value = Number(calcScreen.innerHTML);
            } else {
                if (operator == 1) {
                    value += Number(calcScreen.innerHTML);
                } else if (operator == 2) {
                    value -= Number(calcScreen.innerHTML);
                } else if (operator == 3) {
                    value *= Number(calcScreen.innerHTML);
                } else if (operator == 4) {
                    value /= Number(calcScreen.innerHTML);
                }
            }
            clearScreen();
            operator = i + 1; 
        });
    });

    // Event for "Del" button , clears screen and erases value.
    calcNumberButtons[9].addEventListener ('click', () => {
        clearScreen();
        value = 0;
    });

    // Event for "=" button , counts result with last operator used , resets operator , shows final value on screen , checks isCalculated.
    calcNumberButtons[11].addEventListener ('click', () => {
        if (operator == 1) {
            value += Number(calcScreen.innerHTML);
        } else if (operator == 2) {
            value -= Number(calcScreen.innerHTML);
        } else if (operator == 3) {
            value *= Number(calcScreen.innerHTML);
        } else if (operator == 4) {
            value /= Number(calcScreen.innerHTML);
        }
        
        operator = 0;

        calcScreen.innerHTML = value;
        isCalculated = true;
    });
};


// Called functions.
input();
calculation();
