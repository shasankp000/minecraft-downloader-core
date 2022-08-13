const Path = require("path")
const fs = require("fs")
const executeSystemCommand = require("./execute_sys_cmd")
const executePowershellCommand = require("./execute_ps_cmd")
const goBackOneDir = require("./goBOD")

//const sleep = require("./sleep")

const file_downloader = require("./file_dl")

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function lib_downloader() {
    
    await delay(500)

    console.log("Downloading libraries, this is gonna take a while....")

    await delay(3000)
    
    goBackOneDir()

    const versionNumber1 = fs.readFileSync("answer1.txt").toString()
    const type = fs.readFileSync("answer2.txt").toString()

    console.log(versionNumber1)
    console.log(type)

    process.chdir("version_jsons")


    if (type=="release") {

        process.chdir("release")

        let clientJarUrl = fs.readFileSync(`${versionNumber1}.json`)

        let clientJarData = JSON.parse(clientJarUrl)

        let currn_dir = Path.join(__dirname, "../")
        process.chdir(currn_dir)
        console.log(__dirname)

        process.chdir(".minecraft")

    //let currn_dir = Path.join(__dirname, "../")
    //process.chdir(currn_dir)
    //console.log(__dirname)

    if (fs.existsSync(`${__dirname}/../.minecraft/libraries`)==true) {
        console.log("Libraries dir already exists, ignoring...")
        //process.chdir("libraries")
    }
    else {
        executeSystemCommand("mkdir libraries", "Creating libraries dir")
        await delay(1000)
    }
    

    //process.chdir("libraries")

        //const base_dir = __dirname

        

        for (let i=0; i<clientJarData.libraries.length; i++) {

            await delay(1000)

            process.chdir("libraries")

            await delay(3000)

            let libpathdir = clientJarData.libraries[i].downloads.artifact.path
            let libjarurl = clientJarData.libraries[i].downloads.artifact.url

            //let filename = Path.basename(libjarurl)

            let dirpath = Path.dirname(libpathdir)

            //let clientJar = clientJarData.downloads.client.url
            console.log(libpathdir)
            console.log(dirpath)

            await delay(3000)

            if (process.platform == "win32") {
                executePowershellCommand(`mkdir -p ${dirpath}`, `powershell.exe`, `Creating path ${dirpath}`)
            }
            else if (process.platform == "linux") {
                executeSystemCommand(`mkdir -p ${dirpath}`, `Creating path ${dirpath}`)
            }
            


            await delay(7000)

            process.chdir(dirpath)

            await delay(2000)

            file_downloader(libjarurl)

            await delay(10000)

            process.chdir(`${__dirname}/../.minecraft/`)

            
        }
    }
    

    //console.log("Download started.")


    // check line 108 in 1.18.2.json. 
    // get dirname from path and execute system command to create that path.
    // then navigate to path and download jar.


}



lib_downloader()

//lib_downloader()

/*
if (process.platform == "win32") {
    executePowershellCommand(`mkdir -p com/mojang/logging/1.0.0`, `powershell.exe`, `Creating path com/mojang/logging/1.0.0`)
}
*/
