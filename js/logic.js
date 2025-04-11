import {writeMemory} from "./memory.js";

let historyString = "";
let defaultSign = "-";
let power = false;
let memory = 0;

function getInputText() {
    return document.getElementById('input').innerText;
}

function setCursor() {
    const content = document.getElementById('input').innerHTML;
    const cursorText = power? `<sup><span class="blinking-cursor"></span></sup>` : `<span class="blinking-cursor"></span>`;
    document.getElementById('input').innerHTML = content + cursorText;
}

function setInputText(inputText) {
    document.getElementById('input').innerHTML = inputText;
    setCursor();
}

function setOutputText(outputText) {
    if (String(outputText).length > 12) document.getElementById('output').style.fontSize = "24px";
    else document.getElementById('output').style.fontSize = "48px"
    document.getElementById('output').innerText = outputText;
}

function printToInput(str) {
    const oldStr = getInputText();
    const newText = power ? oldStr + `<sup>${str}</sup>` : oldStr + str;
    setInputText(newText);

    historyString += str;
}

function deleteFromStartInput(number) {
    if (number === 0) return;
    const input = getInputText();
    const newline = input.slice(number);
    setInputText(newline);

    historyString = historyString.slice(number);
}

function deleteFromEndInput(number) {
    if (number === 0) return;
    const input = getInputText();
    const newline = input.slice(0, -number);
    setInputText(newline);

    historyString = historyString.slice(0, -number);
}

function processExpression(input) {
    try {
        const expression = input
            .replace(/x/g, '*')
            .replace(/÷/g, '/')
            .replace(/√(-?\d+(\.\d+)?)/g, 'Math.sqrt($1)')
            .replace(/–/g, '-');
        if (expression.includes('Math.sqrt(')) {
            const match = expression.match(/Math\.sqrt\(([^)]+)\)/);
            if (match && parseFloat(match[1]) < 0) {
                return "Indeterminate";
            }
        }
        const result = Function(`return (${expression})`)();
        return !isFinite(result) ? "Indeterminate" : result;
    } catch (err) {
        return "Indeterminate";
    }
}

export function setMemoryNumber(input) {
    memory = input;
    writeMemory(input);
}

export function MRClicked() {
    const input = getInputText();
    if (input.length !== 0 && !input.endsWith(" ") && !input.endsWith("√")) return false;
    numberClicked(memory);
    return true;
}

export function MCClicked() { setMemoryNumber(0); }

export function MPlusClicked() {
    const input = getInputText();
    const result = processExpression(input);
    const newMemory = result + memory;
    setMemoryNumber(newMemory);
}

export function MMinusClicked() {
    const input = getInputText();
    const result = processExpression(input);
    const newMemory = memory - result;
    setMemoryNumber(newMemory);
}

export function clearClicked() {
    setOutputText("0");
    const input = getInputText();
    if (input.length === 0) return false;
    if (historyString.endsWith("^")){
        historyString = historyString.slice(0, -1);
        power = !power;
        return true;
    }
    if (input.endsWith(" + ") ||
        input.endsWith(" - ") ||
        input.endsWith(" x ") ||
        input.endsWith(" ÷ ") ||
        input.endsWith(" % "))
        deleteFromEndInput(3);
    else if ((input[input.length - 2] === "+" || input[input.length - 2] === "-") &&
        !isNaN(input[input.length - 1]))
        deleteFromEndInput(2);
    else deleteFromEndInput(1);
    return true;
}

// operation can be equal to + - / * x %
export function operationClicked(operation) {
    const input = getInputText();
    if (input.length === 0) return false;
    if (isNaN(input[input.length - 1]) && input[input.length - 1] !== ")") return false;

    switch (operation) {
        case "*":
        case "x":
            printToInput(" x ");
            break;
        case "%":
            printToInput(" % ");
            break;
        case "+":
            printToInput(" + ");
            break;
        case "-":
            printToInput(" - ");
            break;
        case "/":
        case "÷":
        case "division":
            printToInput(" ÷ ");
            break;
        default: return false;
    }
    return true;
}

export function equalClicked() {
    const input = getInputText();
    console.log((input.split(" ").length <= 1 && !input.startsWith('√')))
    if (!input || input === "" || input.trim() === "" ) return false;
    if (input.endsWith('-') || input.endsWith('+') || input.endsWith('√')) setOutputText("0");
    else if (input.split(" ").length <= 1 && !input.startsWith('√')) setOutputText(input);
    else setOutputText(processExpression(input));

}

export function powerClicked() {
    power = !power;
    historyString += "^";
    setInputText(getInputText());
}

export function squareClicked() {
    const input = getInputText();
    if (input === "" || input.trim() === "" || input.endsWith("+") || input.endsWith("-")) {
        printToInput("√");
        return true
    }

    const lastSpace = input.lastIndexOf(" ");
    let currentNumber;

    if (lastSpace === -1) currentNumber = input;
    else currentNumber = input.slice(lastSpace + 1);
    deleteFromEndInput(currentNumber.length);
    if (currentNumber.startsWith("-√") || currentNumber.startsWith("+√")) {
        currentNumber = currentNumber.slice(2);
        printToInput(currentNumber);
        return true;
    }
    if (currentNumber.startsWith("√")) {
        currentNumber = currentNumber.slice(1);
        printToInput(currentNumber);
        return true;
    }
    if (currentNumber[0] === "-" || currentNumber[0] === "+") currentNumber = currentNumber.slice(1);

    printToInput("√" + currentNumber);
}

// sign can be equal to + or -
export function signClicked(sign) {
    // code here
    const input = getInputText();

    if (input === "" || input.trim() === "" || input.endsWith("+") || input.endsWith("-")) {
        if (input.endsWith("+") || input.endsWith("-")) {
            if (sign === input[input.length - 1]) return true;
            if (sign === undefined || sign === null) {
                sign = input[input.length - 1] === "-"? "+" : "-";
                defaultSign = sign === "-"? "+" : "-";
            }
            deleteFromEndInput(1);
            printToInput(sign);
            return true;
        }
        if (sign === undefined || sign === null) {
            sign = defaultSign;
            defaultSign = defaultSign === "-"? "+" : "-";
        }
        printToInput(` ${sign}`);
        return true;
    }
    // number or √
    const lastSpace = input.lastIndexOf(" ");
    let currentNumber;

    if (lastSpace === -1) currentNumber = input;
    else currentNumber = input.slice(lastSpace + 1);

    if (currentNumber[0] === sign) return false;
    if (currentNumber[0] === "(") currentNumber = currentNumber.slice(1);
    deleteFromEndInput(currentNumber.length);

    if (sign === undefined || sign === null) {
        if (currentNumber[0] === "-") {
            sign = "+"
            currentNumber = currentNumber.slice(1);
        }
        else if (currentNumber[0] === "+") {
            sign = "-";
            currentNumber = currentNumber.slice(1);
        }
        else {
            sign = defaultSign;
            defaultSign = defaultSign === "-"? "+" : "-";
        }
    } else if (currentNumber[0] === "-" || currentNumber[0] === "+") currentNumber = currentNumber.slice(1);

    printToInput(`${sign}${currentNumber}`)
    return false;
}

export function decimalClicked() {
    const input = getInputText();

    if (!input || input.endsWith(" ")) {
        return printToInput("0.");
    }
    const lastPart = input.split(/[\+\-\*\/\"x"]/).pop();

    if (!lastPart.includes(".")) {
        return printToInput(lastPart ? "." : "0.");
    }
}

// number can be equal to 0 1 2 3 4 5 6 7 8 9
export function numberClicked(number) {
    const input = getInputText();
    number = String(number);
    if (number === "0" && input === "") printToInput("0.")
    else printToInput(number);
}

// brackets ()
export function bracketsClicked(t) {
    const s = getInputText();
    let o = 0, c = 0;

    if (t === 'open' && (s === "" || !isNaN(s[s.length - 1]) || s[s.length - 1] === ')')) return printToInput('(');
    
    if (t === 'close') {
        for (let i of s) { if (i === '(') o++; if (i === ')') c++; }
        if (o > c && !isNaN(s[s.length - 1]) && s[s.length - 1] !== ' ') return printToInput(')');
    }
} 

export function logHistory() {
    console.log(historyString);
}