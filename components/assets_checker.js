const fs = require("fs")
const goBackOneDir = require("./goBOD")

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))





async function check_assets() {
    goBackOneDir()

    const versionNumber3 = fs.readFileSync("answer1.txt").toString()

    process.chdir(".minecraft")

    await delay(1000)

    process.chdir("assets")

    await delay(1000)

    process.chdir("indexes")


    
    let assets_data = fs.readFileSync(`${versionNumber3.slice(0,4)}.json`)
    let parsed_data = JSON.parse(assets_data)

    process.chdir("../")

    await delay(1000)

    process.chdir("objects")

    await delay(1000)

    let values1 = Object.values(parsed_data.objects)

    console.log("Checking file integrity....")

    await delay(5000)


    for(const eachValue1 of values1) {
        if (fs.existsSync(`${__dirname}/../.minecraft/assets/objects/${eachValue1.hash.slice(0,2)}`)==true) {
            console.log(`${eachValue1.hash.slice(0,2)} dir already exists, accessing...`)

            await delay(1000)

            process.chdir(`${eachValue1.hash.slice(0,2)}`)

            await delay(1000)

            let currn_dir = process.cwd()

            let read_dir = fs.readdirSync(currn_dir)

            for(obj of read_dir) {
                let stats = fs.statSync(obj);
                let fileSizeInBytes = stats.size;


                if (fileSizeInBytes == eachValue1.size) {
                    console.log(`${eachValue1.hash}'s size is correct.`)
                    fs.writeFileSync(`${__dirname}/../log.txt`, "Good")
                    
                }
                else if (fileSizeInBytes != eachValue1.size) {
                    console.log(`${eachValue1.hash}'s size is not correct.`)
                    fs.writeFileSync(`${__dirname}/../log.txt`, "Bad")
                }
            }

            process.chdir("../")

        }
    }
    

    //process.chdir(".minecraft/assets/objects")
}

async function start_checking() {
    await check_assets()

    await delay(5000)

    let log = fs.readFileSync(`${__dirname}/../log.txt`).toString()

    if (log == "Good"){
        console.log("File integrity of all files is OK")
    }
    else if (log == "Bad") {
        console.log("Files are corrupted.")
    }
}

start_checking()