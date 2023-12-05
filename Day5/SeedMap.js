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

const findSeed = (seeds) => {
    let locations = []
    // const regex = /\d+\s*\d+\s*\d+/;
    // const maps = []
    // for (let i = 1; i < data.length; i++) {
    //     if (regex.test(data[i])) {
    //         maps.push(data[i].split(' ').map(Number))
    //     }
    // }
    // console.log(seeds)
    seeds.forEach(seed => {
        // console.log("*************** seed: " + seed)
        let flag = false
        for (let i = 1; i < data.length; i++) {
            if (flag || data[i].endsWith(':') || data[i] === '') {
                flag = false
            } else {
                const [dest, source, range] = data[i].split(' ').map(Number)
                if (source <= seed && seed < source + range) {
                    // console.log("seed " + seed + " withing rage: " + source + ' to ' + (source + range))

                    seed += dest - source
                    // console.log("dest - source: " + (dest - source))
                    // console.log("Seed: " + seed )
                    // Skip the rest and move to the next map
                    flag = true
                }
            }

        }

        locations.push(seed)
        // maps.forEach(([dest, source, range]) => {
        //     console.log("------")
        //     console.log([dest, source, range])
        //     if (source <= seed && seed < source + range) {
        //         console.log("seed " + seed + " withing rage: " + source + ' to ' + (source + range))

        //         seed += dest - source
        //         console.log("dest - source: " + (dest - source))
        //     }
        //     console.log(seed)
        // })
    })
    // console.log(locations)
    return (Math.min.apply(this, locations))
}

const SeedMap = () => {
    const seeds = data[0].split(' ').filter(val => !isNaN(val)).map(Number)
    let seedRange = []
    if (seeds.length % 2 === 0) {
        for (let i = 0; i < seeds.length - 1; i += 2) {
            let subRange = []
            for (let j = 0; j < seeds[i + 1]; j++) {
                subRange.push(seeds[i] + j)
            }
            seedRange.push(subRange)
        }
    }
    console.log(seedRange)
    let result = []
    seedRange.forEach(range =>{
        result.push(findSeed(range))
    })
    console.log(Math.min.apply(Math, result))
}
SeedMap()