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

const count = () =>{
    let total = 0
    const dict = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    data.forEach(line => {
        let nums = []
        for(let i = 0;i<line.length; i++){
            // check if the current character is a number
            if(!isNaN(line.charAt(i))){
                // if so, add it to the nums list
                nums.push(parseInt(line.charAt(i)))
            } else {
                // if not, traverse the dictionary and check if the substring from the current character match any dictionary value
                dict.forEach(num =>{
                    // If so, add its current index +1 to the nums list
                    if(line.slice(i).startsWith(num)){
                        nums.push(dict.indexOf(num)+1)
                    }
                })
            }
        }
        // only use the first and last values in the nums array to calculate the total
        total += nums[0] * 10 + nums[nums.length-1]
    })
    return total
}
// Log to console
console.log(count())


// const processData = () =>{
//     const dictionary = new Map();
//     dictionary.set("one", "o1e")
//     dictionary.set("two", "t2o")
//     dictionary.set("three", "t3e")
//     dictionary.set("four", "f4r")
//     dictionary.set("five", "f5e")
//     dictionary.set("six", "s6x")
//     dictionary.set("seven", "s7n")
//     dictionary.set("eight", "e8t")
//     dictionary.set("nine", "n9e")
 
//     let result = []

//     // Create a regular expression that matches any substring in the dictionary
//     const regex = new RegExp(`(?:${[...dictionary.keys()].join("|")})`, "g")
//     data.forEach(line =>{
//         let matches = line.match(regex);
//         while(matches){
//             if(dictionary.has(matches[0])){
//                 line = line.replace(matches[0], dictionary.get(matches[0]))
//             }
//             matches = line.match(regex)
//         }
//         // if(matches){
//         //     matches.forEach(match =>{
//         //         if(dictionary.has(match)){
//         //             line = line.replace(match, dictionary.get(match))
//         //         }
//         //     })
//         // }
//         // let matches = []
//         // dictionary.forEach((value, key)=>{
//         //     for(let i = 0; i< line.length;i++){
//         //         if(line.slice(i).startsWith(key)){
//         //             matches.push(value)
//         //         }
//         //     }
//         // })
//         //     console.log(matches)
//         result.push(line)
//     })
//     return result
// }
// data = processData()
// console.table(data)

// const count = ()=>{
//   let total = 0
//   data.forEach(line =>{
//     let first, second = null
//     let i=0, j=line.length-1
//     while(first == null && i<line.length){
//       if(!isNaN(line.charAt(i)))
//         first = parseInt(line.charAt(i),10)
//       i++
//     }

//     while(second == null && j>=0){
//       if(!isNaN(line.charAt(j)))
//         second = parseInt(line.charAt(j),10)
//       j--
//     }
//     if(first && second) total += first*10+second
//   })
//   return total
// }