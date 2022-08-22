const Path = require("path")
const fs = require("fs")
const executeSystemCommand = require("./execute_sys_cmd")
const executePowershellCommand = require("./execute_ps_cmd")
const goBackOneDir = require("./goBOD")

//const sleep = require("./sleep")

//const file_downloader = require("./file_dl")

const get = require("./async-file-dl")

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function lib_downloader() {
    console.log("Downloading libraries, this is gonna take a while....")

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
        await executeSystemCommand("mkdir libraries", "Creating libraries dir")
        await delay(1000)
    }
    

    //process.chdir("libraries")

        //const base_dir = __dirname

        

        for (let i=0; i<clientJarData.libraries.length; i++) {

            await delay(1000)

            process.chdir("libraries")

            await delay(1000)

            let libpathdir = clientJarData.libraries[i].downloads.artifact.path
            let libjarurl = clientJarData.libraries[i].downloads.artifact.url

            //let filename = Path.basename(libjarurl)

            let dirpath = Path.dirname(libpathdir)

            //let clientJar = clientJarData.downloads.client.url
            console.log(libpathdir)
            console.log(dirpath)


            if (process.platform == "win32") {
                if (fs.existsSync(`${process.cwd()}/${dirpath}`==true)) {

                    console.log(`${dirpath} already exists, accessing...`)

                    process.chdir(dirpath)

                    await get(libjarurl)

                    await delay(2000)

                    process.chdir(`${__dirname}/../.minecraft/`)
                }

                else{

                    await executePowershellCommand(`mkdir -p ${dirpath}`, `powershell.exe`, `Creating path ${dirpath}`)

                    await delay(3000)

                    process.chdir(dirpath)

                    await get(libjarurl)
        
                    await delay(2000)
        
                    process.chdir(`${__dirname}/../.minecraft/`)
                }
                
            }
            else if (process.platform == "linux") {

                if (fs.existsSync(`${process.cwd()}/${dirpath}`==true)) {

                    console.log(`${dirpath} already exists, accessing...`)

                    process.chdir(dirpath)

                    await get(libjarurl)

                    await delay(2000)

                    process.chdir(`${__dirname}/../.minecraft/`)
                }

                else{

                    await executeSystemCommand(`mkdir -p ${dirpath}`, `Creating path ${dirpath}`)
                    
                    await delay(1000)

                    process.chdir(dirpath)
        
                    await get(libjarurl)
        
                    await delay(2000)
        
                    process.chdir(`${__dirname}/../.minecraft/`)
                }
                
            }
            
        }
    }
    
}



lib_downloader()
