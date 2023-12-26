// Requiring the fs module
const fs = require("fs")

// Creating a function which takes a file as input
const readFileLines = filename =>
    fs
        .readFileSync(filename)
        .toString('UTF8')
        .split('\n')

// Driver code
const data = readFileLines('sample.txt');
const mapCard = card => {
    let map = new Map()
    card.split('').forEach(x => {
        if (map.has(x))
            map.set(x, map.get(x) + 1)
        else
            map.set(x, 1)
    })
    return map
}
const isFiveOfAKind = card => {
    return mapCard(card).size === 1
}

const isFourOfAKind = card => {
    const map = mapCard(card)
    return map.size === 2 && JSON.stringify([...map.values()].sort()) === "[1,4]"
}

const isFullHouse = card => {
    const map = mapCard(card)
    return map.size === 2 && JSON.stringify([...map.values()].sort()) === "[2,3]"
}

const isThreeOfAKind = card => {
    const map = mapCard(card)
    return map.size === 3 && JSON.stringify([...map.values()].sort()) === "[1,1,3]"
}

const isTwoPair = card => {
    const map = mapCard(card)
    return map.size === 3 && JSON.stringify([...map.values()].sort()) === "[1,2,2]"
}

const isOnePair = card => {
    const map = mapCard(card)
    return map.size === 4
}

// const isHighCard = card => {
//     const map = mapCard(card)
//     return map.size === 5
// }
const camelCards = () => {
    let five = [], four = [], full = [], three = [], two = [], one = [], high = []
    data.forEach(x => {
        const card = x.split(' ')[0]
    console.log(card)
        if (isFiveOfAKind(card)) {
            five.push(x)
        } else if (isFourOfAKind(card)) {
            four.push(x)
        } else if (isFullHouse(card)) {
            full.push(x)
        } else if (isThreeOfAKind(card)) {
            three.push(x)
        } else if (isTwoPair(card)) {
            two.push(x)
        } else if (isOnePair(card)) {
            one.push(x)
        } else {
            high.push(x)
        }
    })
    console.log(five)
}
camelCards()