import {
    signClicked,
    numberClicked,
    operationClicked,
    equalClicked,
    clearClicked,
    decimalClicked,
    bracketsClicked
} from "./logic.js";

const keysPressed = {};

export function clickOnKeyHandler(e) {
    const key = e.key;

    keysPressed[key] = true;
    if (keysPressed['Shift'] && keysPressed['+']) signClicked('+')
    else if (keysPressed['Shift'] && keysPressed['_']) signClicked('-')
    else if (keysPressed['Shift'] && keysPressed['(']) bracketsClicked('open')
    else if (keysPressed['Shift'] && keysPressed[')']) bracketsClicked('close')
    else if (!isNaN(key)) numberClicked(key);
    else if (['-', '*', '/', '%'].includes(key)) operationClicked(key);
    else if (key === '=') operationClicked('+');
    else if (key === 'Enter') equalClicked();
    else if (key === 'Backspace') clearClicked();
    else if (key === '.') decimalClicked();
}

export function stopClickOnKeyHandler(e) {
    delete keysPressed[e.key]
}
