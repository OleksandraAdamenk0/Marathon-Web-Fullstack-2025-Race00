export function clickOnBtnHandler(e) {
    const target = e.target;
    if (!target.classList.contains('btn')) return;
    if (target.classList.contains('number')) numberClicked(e);
    else if(target.classList.contains('decimal')) decimalClicked(e);
    else if (target.classList.contains('operations')) operationClicked(e);
    else if (target.classList.contains('rest')) restClicked(e);
    else if (target.classList.contains('clear')) clearClicked(e);

}