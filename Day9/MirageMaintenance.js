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

const pridictNext = arr => {
    let next = 0
    let valArr = arr.split(' ').map(v => Number(v))
    let prev = [valArr[0]]
    while (!valArr.every(x => x === 0)) {
        valArr.forEach((v, i) => {
            if (i < valArr.length - 1)
                valArr[i] = valArr[i + 1] - v
            else if (i === valArr.length - 1) {
                next += v
            }
        })
        prev.push(valArr[0])
        valArr.pop(valArr.length - 1)
    }

    let returnPrev = 0
    for (let i = prev.length - 1; i > 0; i--) {
        returnPrev = prev[i - 1] - returnPrev
    }
    return [next, returnPrev]
}

const mirage = () => {
    let p1result = 0
    let p2result = 0
    data.forEach(row => {
        const result = pridictNext(row)
        p1result += result[0]
        p2result += result[1]
    });

    console.log('P1: ', p1result)
    console.log('P2: ', p2result)
}

mirage()