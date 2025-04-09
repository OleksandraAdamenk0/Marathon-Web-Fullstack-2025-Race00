import {
    clearClicked,
    decimalClicked,
    equalClicked,
    numberClicked,
    operationClicked,
    signClicked,
    squareClicked
} from "./logic.js";

export function clickOnBtnHandler(e) {
    const target = e.target;
    if (!target.classList.contains('btn')) return;
    if (target.classList.contains('number')) numberClicked(e.target.textContent);
    else if(target.classList.contains('decimal')) decimalClicked();
    else if (target.classList.contains('operations')) operationClicked(e.target.textContent);
    else if (target.classList.contains('rest')) operationClicked("%");
    else if (target.classList.contains('clear')) clearClicked();
    else if (target.classList.contains('sign')) signClicked();
    else if (target.classList.contains('square')) squareClicked();
    else if (target.classList.contains('equal')) equalClicked();
}