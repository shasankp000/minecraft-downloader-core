const fs = require("fs")
const readline = require("readline-sync")

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


async function askStuff() {

    let q1 = readline.question("Enter versionNumber: ")
    let q2 = readline.question("Enter type(release/snapshot): ")

    await delay(1000)

    fs.writeFileSync("./answer1.txt", q1)
    fs.writeFileSync("./answer2.txt", q2)

    await delay(3000)

    console.log("Inputs logged")
}

askStuff()