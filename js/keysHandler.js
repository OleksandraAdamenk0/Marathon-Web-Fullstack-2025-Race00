import {signClicked, numberClicked, operationClicked, equalClicked, clearClicked, decimalClicked } from "./logic.js";

const keysPressed = {};

export function clickOnKeyHandler(e) {
    const key = e.key;

    keysPressed[key] = true;
    if (keysPressed['Shift'] && keysPressed['+']) signClicked(e)
    if (keysPressed['Shift'] && keysPressed['-']) signClicked(e)

    if (!isNaN(key)) numberClicked(e);
    else if (['+', '-', '*', '/', '%'].includes(key)) operationClicked(e);
    else if (key === 'Enter') equalClicked(e);
    else if (key === 'Backspace') clearClicked(e);
    else if (key === '.') decimalClicked(e);
}

export function stopClickOnKeyHandler(e) {
    delete keysPressed[e.key]
}