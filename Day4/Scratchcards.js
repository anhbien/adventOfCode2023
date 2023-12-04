// // Requiring the fs module
// const fs = require("fs")

// // Creating a function which takes a file as input
// const readFileLines = filename =>
//     fs
//         .readFileSync(filename)
//         .toString('UTF8')
//         .split('\n');

// // Driver code
// let data = readFileLines('value.txt');

// const scratchCards = () => {
//     let total = 0
//     let winingInstances = new Array(data.length).fill(1)
//     data.forEach((row, index) => {
//         const line = row.slice(row.indexOf(': ') + 2).split('|')
//         const winningNumbers = line[0].trim().split(' ').filter(val => !isNaN(val) || val !== '')
//         const lotteryNumbers = line[1].trim().split(' ').filter(val => !isNaN(val) || val !== '')
//         const winning = lotteryNumbers.filter(num => winningNumbers.includes(num)).filter(val => val !== '')
//         if (winning.length > 0) {
//             total += Math.pow(2, winning.length - 1)
//         }
//         winning.forEach((_, i) => {
//             winingInstances[index + i + 1] += winingInstances[index]
//         })
//     })
//     // console.log(winingInstances)
//     console.log('P1: ' + total)
//     console.log('P2: ' + winingInstances.reduce((a, b) => a + b))
// }

// scratchCards()

const fs = require("fs")

// Function to read lines from a file
function readLinesFromFile(filename) {
  try {
    const fileContent = fs.readFileSync(filename, "utf8");
    return fileContent.split("\n");
  } catch (error) {
    console.error("Error reading file:", error.message);
    return [];
  }
}

// Function to calculate the total prize and winning instances
function calculatePrizes(lines) {
  let totalPrize = 0;
  const winningInstances = new Array(lines.length).fill(1);

  lines.forEach((line, index) => {
    const [winningNumbersStr, lotteryNumbersStr] = line.split("|").map((str) => str.trim());
    const winningNumbers = winningNumbersStr.split(" ").filter((val) => !isNaN(val) || val !== "");
    const lotteryNumbers = lotteryNumbersStr.split(" ").filter((val) => !isNaN(val) || val !== "");

    const matchingNumbers = lotteryNumbers.filter((num) => winningNumbers.includes(num)).filter((val) => val !== "");

    if (matchingNumbers.length > 0) {
      totalPrize += 2 ** (matchingNumbers.length - 1);
    }

    matchingNumbers.forEach((_, i) => {
      winningInstances[index + i + 1] += winningInstances[index];
    });
  });

  return { totalPrize, winningInstances };
}

function main() {
  const filename = "value.txt";
  const lines = readLinesFromFile(filename);

  if (lines.length === 0) {
    console.log("No data to process.");
    return;
  }

  const { totalPrize, winningInstances } = calculatePrizes(lines);

  console.log("P1:", totalPrize);
  console.log("P2:", winningInstances.reduce((a, b) => a + b));
}

main();
