// Requiring the fs module
const fs = require("fs")

// Creating a function which takes a file as input
const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n');
 
// Driver code
let data = readFileLines('value.txt');
let dataMap = []
data.forEach(row =>{
    const rowData = row.split(':')
    if(rowData && rowData.length >1){
        const value = {"red": 0, "green": 0, "blue": 0}
        rowData[1].split(';').forEach(item => {
            item.split(',').forEach(pick =>{
                pick.split(',').forEach(cube =>{
                    const val = cube.split(' ');
                    const count = parseInt(val[1])
                    switch (val[2]) {
                        case "red":
                            if(count>value.red){
                                value.red=count;
                            }
                            break;
                        case "green":
                            if(count>value.green){
                                value.green=count;
                            }
                            break;
                        case "blue":
                            if(count>value.blue){
                                value.blue=count;
                            }
                            break;
                        default:
                            break;
                    }
                })
            })
        })
        dataMap.push(value);
    }
})
//only 12 red cubes, 13 green cubes, and 14 blue cubes
const maxVal = {"red": 12, "green": 13, "blue": 14}
let total = 0
let sumPower = 0
dataMap.forEach((row, index) =>{
    sumPower += row.red * row.green * row.blue
    if(row.red <= maxVal.red && row.green <= maxVal.green && row.blue <= maxVal.blue){
        total += index +1
    }
})
console.table("Part 1: " + total)
console.table("Part 2 "+ sumPower)