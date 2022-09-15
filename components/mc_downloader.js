const executeSystemCommand = require("./execute_sys_cmd")
const executePowershellCommand = require("./execute_ps_cmd")
const fs = require("fs")
const goBackOneDir = require("./goBOD")
const Path = require("path")

const get = require("./async-file-dl")


const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function mc_downloader() {
   
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
        //console.log(clientJar)

        console.log("Download started.")

        if (fs.existsSync(`${__dirname}/../.minecraft`)==true) {
            console.log(".minecraft dir already exists, ignoring...")
        }
        else {
            fs.mkdir(`.minecraft`, {recursive:false}, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Creating .minecraft dir")
                }
            })
        }



        process.chdir(".minecraft")

        await delay(3000) 

        if (fs.existsSync(`${__dirname}/../.minecraft/versions`)==true) {
            console.log("versions dir already exists, ignoring...")
        }
        else {
            fs.mkdir(`versions`, {recursive:false}, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Creating versions dir")
                }
            })
        }


        process.chdir("versions")

        await delay(2000) 

        if (fs.existsSync(`${__dirname}/../.minecraft/versions/${versionNumber}`)) {
            console.log(`${versionNumber} dir already exists, ignoring`)
        }
        else {
            fs.mkdir(`${versionNumber}`, {recursive:false}, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(`Creating ${versionNumber} dir`)
                }
            })
        }
        

        await delay(2000)

        process.chdir(`${versionNumber}`)

        goBackOneDir()
  
        if (process.platform = "win32") {
           fs.copyFile(`version_jsons/release/${versionNumber}.json`, `.minecraft/versions/${versionNumber}/${versionNumber}.json`, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(`copying ${versionNumber}.json`)
            }
           })
            // executePowershellCommand(`cp version_jsons/release/${versionNumber}.json .minecraft/versions/${versionNumber}/`, `powershell.exe`, `copying ${versionNumber}.json`)
        }

        else if (process.platform = "linux") {
            executeSystemCommand(`cp version_jsons/release/${versionNumber}.json .minecraft/versions/${versionNumber}/`, `copying ${versionNumber}.json`)
        }
        

        process.chdir(`.minecraft/versions/${versionNumber}`)


        console.log(`Downloading client.jar....`)

        await get(clientJar)


        console.log("Download completed!")
        
        await delay(2000)  // needed to keep things in check, I guess.

        fs.rename(`${__dirname}/../.minecraft/versions/${versionNumber}/client.jar`, `${__dirname}/../.minecraft/versions/${versionNumber}/${versionNumber}.jar`, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(`Renaming client.jar to ${versionNumber}.jar`)
            }
        })

        process.chdir(`${__dirname}/../.minecraft/`)
        

    }
    
    else if (type=="snapshot") {

        process.chdir("snapshot")

        let clientJarUrl = fs.readFileSync(`${versionNumber}.json`)

        let clientJarData = JSON.parse(clientJarUrl)


        process.chdir("../../")


        let clientJar = clientJarData.downloads.client.url
        console.log(clientJar)

        console.log("Download started.")

        if (fs.existsSync(`${__dirname}/../.minecraft`)==true) {
            console.log(".minecraft dir already exists, ignoring...")
        }
        else {
            fs.mkdir(`.minecraft`, {recursive:false}, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Creating .minecraft dir")
                }
            })
        }



        process.chdir(".minecraft")

        await delay(3000) 

        if (fs.existsSync(`${__dirname}/../.minecraft/versions`)==true) {
            console.log("versions dir already exists, ignoring...")
        }
        else {
            fs.mkdir(`versions`, {recursive:false}, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Creating versions dir")
                }
            })
        }


        process.chdir("versions")

        await delay(2000) 

        if (fs.existsSync(`${__dirname}/../.minecraft/versions/${versionNumber}`)) {
            console.log(`${versionNumber} dir already exists, ignoring`)
        }
        else {
            fs.mkdir(`${versionNumber}`, {recursive:false}, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(`Creating ${versionNumber} dir`)
                }
            })
        }
        

        await delay(2000)

        process.chdir(`${versionNumber}`)

        goBackOneDir()
  
        if (process.platform = "win32") {
           fs.copyFile(`version_jsons/snapshot/${versionNumber}.json`, `.minecraft/versions/${versionNumber}/${versionNumber}.json`, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(`copying ${versionNumber}.json`)
            }
           })
            // executePowershellCommand(`cp version_jsons/release/${versionNumber}.json .minecraft/versions/${versionNumber}/`, `powershell.exe`, `copying ${versionNumber}.json`)
        }

        else if (process.platform = "linux") {
            executeSystemCommand(`cp version_jsons/snapshot/${versionNumber}.json .minecraft/versions/${versionNumber}/`, `copying ${versionNumber}.json`)
        }
        

        process.chdir(`.minecraft/versions/${versionNumber}`)


        console.log(`Downloading client.jar....`)

        await get(clientJar)


        console.log("Download completed!")
        
        await delay(2000)  // needed to keep things in check, I guess.

        fs.rename(`${__dirname}/../.minecraft/versions/${versionNumber}/client.jar`, `${__dirname}/../.minecraft/versions/${versionNumber}/${versionNumber}.jar`, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(`Renaming client.jar to ${versionNumber}.jar`)
            }
        })

        process.chdir(`${__dirname}/../.minecraft/`)
        



        // donwloading main client.jar
            

    }

    
    
}



mc_downloader()