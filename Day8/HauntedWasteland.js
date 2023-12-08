// Requiring the fs module
const fs = require("fs")

// Creating a function which takes a file as input
const readFileLines = filename =>
    fs
        .readFileSync(filename)
        .toString('UTF8')
        .split('\n')

// Driver code
const data = readFileLines('value.txt');

const createMap = () => {
    const map = new Map()
    for (let i = 2; i < data.length; i++) {
        // Regex pattern to match the first element before the '=' sign
        const firstElementPattern = /^([^=]+)/;

        // Regex pattern to match and extract substrings inside parentheses as array elements
        const arrayElementsPattern = /\(([^)]+)\)/;

        // Example input string
        const inputString = data[i];

        // Extract the first element
        const firstElementMatch = inputString.match(firstElementPattern);
        let firstElement = "";
        if (firstElementMatch) {
            firstElement = firstElementMatch[1].trim();
        }

        // Extract and split the second element into an array
        const secondElementMatch = inputString.match(arrayElementsPattern);
        let secondElement = [];
        if (secondElementMatch) {
            secondElement = secondElementMatch[1].split(', ').map(element => element.trim());
        }

        map.set(firstElement, secondElement)
    }
    return map
}

const hauntedWasteland = (dest, start) => {
    const instruction = data[0]
    const map = createMap()
    let count = 1
    let current = start
    const numTimes = Infinity
    while (true) {
        for (let i = 0; i < instruction.length; i++) {
            const currentMapVal = map.get(current)
            if (count >= numTimes * instruction.length) {
                // Break out of the loop when you've looped through the array numTimes
                break;
            }
            switch (instruction[i]) {
                case 'L':
                    current = currentMapVal[0]
                    break;

                default:
                    current = currentMapVal[1]
                    break;
            }
            if (current === dest) {
                return count
            }
            else
                count++
        }
    }
}
// Function to find the greatest common divisor (GCD) of two numbers
function findGCD(a, b) {
    if (b === 0) {
        return a;
    } else {
        return findGCD(b, a % b);
    }
}

// Function to find the least common multiple (LCM) of two numbers
function findLCM(a, b) {
    return (a * b) / findGCD(a, b);
}

// Example of finding the LCM of an array of numbers
function findLCMOfArray(numbers) {
    if (numbers.length < 2) {
        throw new Error("At least two numbers are required.");
    }

    let lcm = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        lcm = findLCM(lcm, numbers[i]);
    }

    return lcm;
}

const hauntedWasteland2 = (start) => {
    const instruction = data[0]
    const map = createMap()
    let count = 1
    let current = start
    const numTimes = Infinity
    while (true) {
        for (let i = 0; i < instruction.length; i++) {
            const currentMapVal = map.get(current)
            if (count >= numTimes * instruction.length) {
                // Break out of the loop when you've looped through the array numTimes
                break;
            }
            switch (instruction[i]) {
                case 'L':
                    current = currentMapVal[0]
                    break;

                default:
                    current = currentMapVal[1]
                    break;
            }
            if (current[current.length - 1] === 'Z') {
                return count
            }
            else
                count++
        }
    }
}

const hauntedWastelandP2 = () => {
    const map = createMap()
    let result = []
    let current = [...map.keys()].filter(x => x[2] === 'A')
    for (let j = 0; j < current.length; j++) {
        result.push(hauntedWasteland2(current[j]))
    }
    return result
}

// console.log(hauntedWasteland("ZZZ", "AAA"))
console.log(findLCMOfArray(hauntedWastelandP2()))