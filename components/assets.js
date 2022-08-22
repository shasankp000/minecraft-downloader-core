const fs = require("fs")
const executeSystemCommand = require("./execute_sys_cmd")
const executePowershellCommand = require("./execute_ps_cmd")
const goBackOneDir = require("./goBOD")
const get = require("./async-file-dl") //coz I was too lazy to make a file downloader using promises. I will do that tho in future updates and remove this dependency.

const file_downloader = require("./file_dl")

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function assets_downloader() {
    await delay(1000)

    console.log("Downloading assets, this is gonna take a while...")

    goBackOneDir()

    const versionNumber2 = fs.readFileSync("answer1.txt").toString()
    const type2 = fs.readFileSync("answer2.txt").toString()

    console.log(versionNumber2)
    console.log(type2)

    process.chdir("version_jsons")

    

    if (type2=="release") {

        process.chdir("release")

        let clientJarUrl = fs.readFileSync(`${versionNumber2}.json`)
    
        let clientJarData = JSON.parse(clientJarUrl) 
    
        await delay(1000)
    
        goBackOneDir()
    
        process.chdir(".minecraft")
    
        if (fs.existsSync(`${__dirname}/../.minecraft/assets`)==true) {
            console.log("assets dir already exists, ignoring...")
            //process.chdir("libraries")
        }
        else {
            executeSystemCommand("mkdir assets", "Creating assets dir")
            await delay(1000)
        }
    
        process.chdir("assets")
    
        let assetIndexurl = clientJarData.assetIndex.url
    
        await get(assetIndexurl)
    
        let assetObjectIndex = fs.readFileSync(`${versionNumber2.slice(0,4)}.json`)
    
        let asset_data = JSON.parse(assetObjectIndex)

        executeSystemCommand("mkdir indexes", "creating indexes dir..")

        await delay(2000)

        if (process.platform == "win32") {
            executePowershellCommand(`mv ${versionNumber2.slice(0,4)}.json indexes/`, `powershell.exe`, `moving ${versionNumber2.slice(0,4)}.json to indexes folder`)
        }
        else if (process.platform == "linux") {
            executeSystemCommand(`mv ${versionNumber2.slice(0,4)}.json indexes/`, `moving ${versionNumber2.slice(0,4)}.json to indexes folder`)
        }
        
    
        await delay(1000)

        executeSystemCommand("mkdir objects", "creating objects dir..")

        await delay(2000)

        process.chdir("objects")

        //console.log(asset_data.objects)
    
        let values = Object.values(asset_data.objects)
        //let keys = Object.keys(asset_data.objects)
        //console.log(values)


        await delay(1000)

        console.log("Checking files...")

        try {
            for (const eachValue of values) {
                if (fs.existsSync(`${__dirname}/../.minecraft/assets/objects/${eachValue.hash.slice(0,2)}`)==true) {
                    console.log(`${eachValue.hash.slice(0,2)} dir already exists, accessing...`)

                    await delay(1000)

                    process.chdir(`${eachValue.hash.slice(0,2)}`)

                    await delay(1000)

                    console.log(`Downloading asset ${eachValue.hash}....`)



                    // using this as there are too many assets to download, if that's done parallelly, the process will hang.

                    await get(`https://resources.download.minecraft.net/` + `${eachValue.hash.slice(0,2)}/` + `${eachValue.hash}`)
                    console.log("Download completed.")

                    process.chdir("../")

                }
                else if (fs.existsSync(`${__dirname}/../.minecraft/assets/objects/${eachValue.hash.slice(0,2)}`)==false){

                    await executeSystemCommand(`mkdir ${eachValue.hash.slice(0,2)}`, `creating directory ${eachValue.hash.slice(0,2)}..`)

                    await delay(1000)

                    process.chdir(`${eachValue.hash.slice(0,2)}`)

                    await delay(1000)

                    console.log(`Downloading asset ${eachValue.hash}....`)



                    // using this as there are too many assets to download, if that's done parallelly, the process will hang.

                    await get(`https://resources.download.minecraft.net/` + `${eachValue.hash.slice(0,2)}/` + `${eachValue.hash}`)
                    console.log("Download completed.")

                    process.chdir("../")
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}




assets_downloader()