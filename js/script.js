import {clickOnKeyHandler, stopClickOnKeyHandler} from "./keysHandler.js";
import {clickOnBtnHandler} from "./clickHandler.js";

function setUpCalculator() {
    const buttons = document.getElementsByClassName("buttons")[0];
    buttons.addEventListener("click", clickOnBtnHandler);
    document.addEventListener('keydown', clickOnKeyHandler);
    document.addEventListener('keyup', stopClickOnKeyHandler);
}

addEventListener("DOMContentLoaded", setUpCalculator);