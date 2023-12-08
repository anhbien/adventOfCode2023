// Requiring the fs module
const fs = require("fs")

// Creating a function which takes a file as input
const readFileLines = filename =>
    fs
        .readFileSync(filename)
        .toString('UTF8')
        .split('\n')

// Driver code
const data = readFileLines('value.txt')

const countPossibleWins = (time, distance) => {

    // OPTION 1
    // let count = 0;

    // for (let hold = 1; hold < time; hold++) {
    //     const longest = hold * (time - hold);
    //     if (distance < longest) {
    //         count++
    //     }
    // }

    // return count


    // OPTION 2
    for (let start = 1, end = time; start < time && end > 1; start++, end--) {
        const longestFront = start * (time - start)
        const longestEnd = end * (time - end)
        if (distance < longestFront && distance < longestEnd) {
            console.log(start, end)
            return end - start + 2 // 2 is because we need to include the start and end points
        }
    }
    return 0
}

const waitForItP1 = () => {
    const times = data[0].match(/\d+/g).map(Number)
    const distances = data[1].match(/\d+/g).map(Number)
    let result = 1
    for (let i = 0; i < times.length; i++) {
        const count = countPossibleWins(times[i], distances[i])
        result *= count
    }
    return result
}

const waitForItP2 = () => {
    const time = data[0].match(/\d+/g).join('')
    const distance = data[1].match(/\d+/g).join('')
    let count = countPossibleWins(time, distance)
    return count
}

console.log('P1 :' + waitForItP1())
console.log('P2 :' + waitForItP2())
