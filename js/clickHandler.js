import {
    clearClicked,
    decimalClicked,
    equalClicked,
    numberClicked,
    operationClicked,
    signClicked,
    squareClicked,
    bracketsClicked, MCClicked, MRClicked, MPlusClicked, MMinusClicked, powerClicked, logHistory
} from "./logic.js";

export function clickOnBtnHandler(e) {
    const target = e.target;
    if (!target.classList.contains('btn')) return;
    if (target.classList.contains('number')) numberClicked(e.target.textContent);
    else if(target.classList.contains('decimal')) decimalClicked();
    else if (target.classList.contains('operations')) operationClicked(e.target.textContent);
    else if (target.classList.contains('rest')) operationClicked(e.target.textContent);
    else if (target.classList.contains('clear')) clearClicked();
    else if (target.classList.contains('sign')) signClicked();
    else if (target.classList.contains('equal')) equalClicked();
    else if (target.classList.contains('square')) squareClicked();
    else if (target.classList.contains('equal')) equalClicked();
    else if (target.classList.contains('brackets')) bracketsClicked(e.target.dataset.type);
    else if (target.classList.contains('memory_clean')) MCClicked();
    else if (target.classList.contains('memory_recall')) MRClicked();
    else if (target.classList.contains('memory_plus')) MPlusClicked();
    else if (target.classList.contains('memory_minus')) MMinusClicked();
    else if (target.classList.contains('power')) powerClicked();
    logHistory();
}
