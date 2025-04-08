import {
    clearClicked,
    decimalClicked,
    numberClicked,
    operationClicked,
    restClicked,
    signClicked,
    equalClicked //додала
} from "./logic.js";

export function clickOnBtnHandler(e) {
    const target = e.target;
    if (!target.classList.contains('btn')) return;
    if (target.classList.contains('number')) numberClicked(e.target.textContent);
    else if(target.classList.contains('decimal')) decimalClicked();
    else if (target.classList.contains('operations')) operationClicked(e.target.textContent);
    else if (target.classList.contains('rest')) restClicked();
    else if (target.classList.contains('clear')) clearClicked();
    else if (target.classList.contains('sign')) signClicked();
    else if (target.classList.contains('equal')) equalClicked();//додала

}
