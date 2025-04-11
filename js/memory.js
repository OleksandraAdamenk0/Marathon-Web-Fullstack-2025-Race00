import {setMemoryNumber} from "./logic.js";

export function setUpMemory() {
    const memoryNumber = Number(localStorage.getItem('memory')) || 0;
    setMemoryNumber(memoryNumber);
}

export function writeMemory(memoryNumber) {
    localStorage.setItem('memory', JSON.stringify(memoryNumber));
}