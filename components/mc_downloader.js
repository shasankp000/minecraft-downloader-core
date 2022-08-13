const executeSystemCommand = require("./execute_sys_cmd")
const executePowershellCommand = require("./execute_ps_cmd")
//const sleep = require("./sleep.js")
const file_downloader = require("./file_dl")
const fs = require("fs")
const goBackOneDir = require("./goBOD")
const Path = require("path")

const get = require("async-get-file")


const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function mc_downloader() {

    await delay(500)
    
    goBackOneDir()

    const versionNumber = fs.readFileSync("answer1.txt").toString()
    const type = fs.readFileSync("answer2.txt").toString()

    console.log(versionNumber)
    console.log(type)

    process.chdir("version_jsons")

    if (type=="release") {

        process.chdir("release")

        let clientJarUrl = fs.readFileSync(`${versionNumber}.json`)

        let clientJarData = JSON.parse(clientJarUrl)

        let currn_dir = Path.join(__dirname, "../")
        process.chdir(currn_dir)
        console.log(__dirname)



        let clientJar = clientJarData.downloads.client.url
        console.log(clientJar)

        console.log("Download started.")

        if (fs.existsSync(`${__dirname}/../.minecraft`)==true) {
            console.log(".minecraft dir already exists, ignoring...")
        }
        else {
            executeSystemCommand("mkdir .minecraft", "creating .minecraft dir")
        }


        await delay(3000) 

        process.chdir(".minecraft")

        await delay(3000) 

        if (fs.existsSync(`${__dirname}/../.minecraft/versions`)==true) {
            console.log("versions dir already exists, ignoring...")
        }
        else {
            executeSystemCommand("mkdir versions", "creating versions dir")
        }


        await delay(3000) 

        process.chdir("versions")

        await delay(3000) 

        if (fs.existsSync(`${__dirname}/../.minecraft/versions/${versionNumber}`)) {
            console.log(`${versionNumber} dir already exists, ignoring`)
        }
        else {
            executeSystemCommand(`mkdir ${versionNumber}`, `creating ${versionNumber} dir`)
        }
        

        await delay(3000)

        process.chdir(`${versionNumber}`)

        goBackOneDir()
  

        //fs.copyFileSync(`version_jsons/release/${versionNumber}.json`, `.minecraft/versions/`)

        // going linux only for now. Will patch this soon.

        if (process.platform = "win32") {
            executePowershellCommand(`cp version_jsons/release/${versionNumber}.json .minecraft/versions/${versionNumber}/`, `powershell.exe`, `copying ${versionNumber}.json`)
        }

        else if (process.platform = "linux") {
            executeSystemCommand(`cp version_jsons/release/${versionNumber}.json .minecraft/versions/${versionNumber}/`, `copying ${versionNumber}.json`)
        }
        

        process.chdir(`.minecraft/versions/${versionNumber}`)

        // donwloading main client.jar
            
        //file_downloader(clientJar)

        let filename = Path.basename(clientJar)

        let options = {
            directory: process.cwd(),
            filename: filename
        }

        console.log(`Downloading client.jar....`)

        await get(clientJar, options)

        console.log("Download completed!")
        
        await delay(10000)  // needed to keep things in check, I guess.

        fs.renameSync(`${__dirname}/../.minecraft/versions/${versionNumber}/client.jar`, `${__dirname}/../.minecraft/versions/${versionNumber}/${versionNumber}.jar`)

        
        await delay(4000)

        process.chdir(`${__dirname}/../.minecraft/`)
        

    }
    // Few more things have to be implemented, so I will comment the snapshot part out for now.

    /*
    else if (type=="snapshot") {

        process.chdir("snapshot")

        let clientJarUrl = fs.readFileSync(`${versionNumber}.json`)

        let clientJarData = JSON.parse(clientJarUrl)

        let currn_dir = Path.join(__dirname, "../../")
        process.chdir(currn_dir)
        console.log(__dirname)

        setTimeout(this.snapshot_version_json_Downloader, 5000)



        let clientJar = clientJarData.downloads.client.url
        console.log(clientJar)

        console.log("Download started.")

        executeSystemCommand("mkdir .minecraft", "creating .minecraft dir")

        await delay(3000) 

        console.log("3000 ms has elasped")
        process.chdir(".minecraft")

        await delay(3000)  

        console.log("3000 ms has elasped")
        executeSystemCommand("mkdir versions", "creating versions dir")

        await delay(3000) 

        console.log("3000 ms has elasped")
        process.chdir("versions")

        await delay(3000)  
        console.log("3000 ms has elasped")

        // donwloading main client.jar
            
        file_downloader(clientJar)

    }
*/
    
    
}



mc_downloader()