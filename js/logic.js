export function clearClicked(e) {
    // code here
    // clear input field
    // clear active state styles from operation btn if needed
}

export function operationClicked(e) {
    console.log(e.target.textContent);

    // code here
    // add active state styles to the operation btn and delete if needed active state styles from other btns
    // do not activate the btn if the last symbol in the input field is not a number
}

export function equalClicked(e) {

}

function powerClicked(e) {

}

function squareClicked(e) {

}

export function signClicked(e) {
    // code here
    // add "-" sign if the input field is clear
}

function restClicked(e) {
    // code here
    // add active state styles to the operation btn and delete if needed active state styles from other btns
    // add text from the input field to the memory and clear the input field
    // do not activate the btn if the last symbol in the input field is not a number
}

export function decimalClicked(e) {
    // code here
    // add decimal point to the input field
    // add 0 before decimal point if there were nothing in the input field
    // do not add decimal point to the input field if it already contains one
}

export function numberClicked(e) {
    const number = Number(e.target.textContent);

    // code here
    // add number to the input field
    // do not add 0 if the last symbol in the input field is 0 or division button is active
}