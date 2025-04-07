let defaultSign = "-";

function getInputText() {
    return document.getElementById('input').innerText;
}

function setInputText(inputText) {
    document.getElementById('input').innerText = inputText;
}

function printToInput(str) {
    const oldStr = getInputText();
    setInputText(oldStr + str);
}

function deleteInput(number) {
    const input = getInputText();
    const newline = input.slice(0, -number);
    setInputText(newline);
}

export function clearClicked() {
    // code here
    // clear input field
    // clear active state styles from operation btn if needed
}

// operation can be equal to + - / *
export function operationClicked(operation) {

    // code here
    // add active state styles to the operation btn and delete if needed active state styles from other btns
    // do not activate the btn if the last symbol in the input field is not a number
}

export function equalClicked() {

}

export function powerClicked() {

}

export function squareClicked() {

}

// пустая строка
// пробел
// (+

// sign can be equal to + or -
export function signClicked(sign) {
    // code here
    const input = getInputText();

    if (input === "" || input.trim() === "" || input.endsWith("(+") || input.endsWith("(-")) {
        if (input.endsWith("(+") || input.endsWith("(-")) {
            if (sign === input[input.length - 1]) return true;
            if (sign === undefined || sign === null) {
                sign = input[input.length - 1] === "-"? "+" : "-";
                console.log(sign);
                defaultSign = sign === "-"? "+" : "-";
            }
            deleteInput(1);
            printToInput(sign);
            return true;
        }
        if (sign === undefined || sign === null) {
            sign = defaultSign;
            defaultSign = defaultSign === "-"? "+" : "-";
        }
        printToInput(` (${sign}`);
    }
}

export function restClicked() {
    // code here
    // add active state styles to the operation btn and delete if needed active state styles from other btns
    // add text from the input field to the memory and clear the input field
    // do not activate the btn if the last symbol in the input field is not a number
}

export function decimalClicked() {
    // code here
    // add decimal point to the input field
    // add 0 before decimal point if there were nothing in the input field
    // do not add decimal point to the input field if it already contains one
}

// number can be equal to 0 1 2 3 4 5 6 7 8 9
export function numberClicked(number) {

    // code here
    // add number to the input field
    // do not add 0 if the last symbol in the input field is 0 or division button is active

    printToInput(number);
}