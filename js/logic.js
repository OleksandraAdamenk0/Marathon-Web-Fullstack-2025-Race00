let defaultSign = "-";

function getInputText() {
    return document.getElementById('input').innerText;
}

function setInputText(inputText) {
    document.getElementById('input').innerText = inputText;
}

function setOutputText(outputText) {
    if (String(outputText).length > 12) document.getElementById('output').style.fontSize = "24px";
    document.getElementById('output').innerText = outputText;
}

function printToInput(str) {
    const oldStr = getInputText();
    setInputText(oldStr + str);
}

function deleteInput(number) {
    if (number === 0) return;
    console.log(number);
    const input = getInputText();
    const newline = input.slice(0, -number);
    setInputText(newline);
}

function clearOutput() {
    document.querySelector('.output-line').innerText = "0";
}

export function clearClicked() {
    clearOutput();
    const input = getInputText();
    if (input.length === 0) return false;
    if (input.endsWith(" + ") ||
        input.endsWith(" - ") ||
        input.endsWith(" x ") ||
        input.endsWith(" ÷ ") ||
        input.endsWith(" % "))
        deleteInput(3);
    else if ((input[input.length - 2] === "+" || input[input.length - 2] === "-") &&
        !isNaN(input[input.length - 1]))
        deleteInput(2);
    else deleteInput(1);
    return true;
}

// operation can be equal to + - / * x %
export function operationClicked(operation) {
    const input = getInputText();
    if (input.length === 0) return false;
    if (isNaN(input[input.length - 1])) return false;

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

    setOutputText(!input || input.trim() === "" || (!isNaN(input.trim()) && input.trim() !== "")
        ? "0"
        : processExpression(input));

}

function processExpression(input) {
    try {
        const expression = input
            .replace(/x/g, '*')
            .replace(/÷/g, '/')
            .replace(/√(-?\d+(\.\d+)?)/g, 'Math.sqrt($1)')
            .replace(/–/g, '-');
        // .replace(/%/g, '/100')
        // .replace(/x\^n/g, '**')
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

export function powerClicked() {

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
    deleteInput(currentNumber.length);
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
            deleteInput(1);
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
    deleteInput(currentNumber.length);
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
    if (number === "0" && input === "") printToInput("0.")
    else printToInput(number);
}


