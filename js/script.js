import {clickOnKeyHandler, stopClickOnKeyHandler} from "./keysHandler.js";
import {clickOnBtnHandler} from "./clickHandler.js";
import {setUpTheme} from "./theme.js";
import {setUpMemory} from "./memory.js";

function setUpCalculator() {
    setUpTheme();
    setUpMemory();

    const buttons = document.getElementsByClassName("buttons")[0];
    buttons.addEventListener("click", clickOnBtnHandler);
    document.addEventListener('keydown', clickOnKeyHandler);
    document.addEventListener('keyup', stopClickOnKeyHandler);
}

addEventListener("DOMContentLoaded", setUpCalculator);