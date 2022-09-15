const fs = require("fs")
const executeSystemCommand = require("./execute_sys_cmd")
const goBackOneDir = require("./goBOD")
const get = require("./async-file-dl") 
const cliProgress = require('cli-progress');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const remove = require("./delete")

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
            fs.mkdir(`assets`, {recursive:false}, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Creating assets dir")
                }
            })
            await delay(1000)
        }
    
        process.chdir("assets")
    
        let assetIndexurl = clientJarData.assetIndex.url
    
        await get(assetIndexurl)
    
        let assetObjectIndex = fs.readFileSync(`${versionNumber2.slice(0,4)}.json`)
    
        let asset_data = JSON.parse(assetObjectIndex)

        if (fs.existsSync(`${__dirname}/../.minecraft/assets/indexes`)==true) {
            console.log("indexes dir already exists, ignoring...")
            //process.chdir("libraries")
        }
        else {
            fs.mkdir(`indexes`, {recursive:false}, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Creating indexes dir")
                }
            })
        }

        await delay(2000)

        if (process.platform == "win32") {
            fs.copyFile(`${process.cwd()}/${versionNumber2.slice(0,4)}.json`, `${process.cwd()}/indexes/${versionNumber2.slice(0,4)}.json`, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(`moving ${versionNumber2.slice(0,4)}.json to indexes folder`)
                    remove(`${versionNumber2.slice(0,4)}.json`, `${process.cwd()}`)
                }
            })
            //executePowershellCommand(`mv ${versionNumber2.slice(0,4)}.json indexes/`, `powershell.exe`, `moving ${versionNumber2.slice(0,4)}.json to indexes folder`)
        }
        else if (process.platform == "linux") {
            //executeSystemCommand(`mv ${versionNumber2.slice(0,4)}.json indexes/`, `moving ${versionNumber2.slice(0,4)}.json to indexes folder`)
            fs.copyFile(`${process.cwd()}/${versionNumber2.slice(0,4)}.json`, `${process.cwd()}/indexes/${versionNumber2.slice(0,4)}.json`, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(`moving ${versionNumber2.slice(0,4)}.json to indexes folder`)
                    remove(`${versionNumber2.slice(0,4)}.json`, `${process.cwd()}`)
                }
            })
        }
        

        if (fs.existsSync(`${__dirname}/../.minecraft/assets/objects`)==true) {
            console.log("objects dir already exists, ignoring...")
            //process.chdir("libraries")
        }
        else {
            fs.mkdir(`objects`, {recursive:false}, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Creating objects dir")
                }
            })

        }

        await delay(2000)

        process.chdir("objects")

        //console.log(asset_data.objects)
    
        let values = Object.values(asset_data.objects)
        //let keys = Object.keys(asset_data.objects)
        //console.log(values)


        await delay(1000)

        console.log("Constructing urls....")

        const assets_url_array = []
        const assets_name_array = []
        const sliced_assets_name_array = []

        for (const eachValue1 of values) {
            assets_url_array.push(`https://resources.download.minecraft.net/` + `${eachValue1.hash.slice(0,2)}/` + `${eachValue1.hash}`)
            assets_name_array.push(eachValue1.hash)
            sliced_assets_name_array.push(eachValue1.hash.slice(0,2))
        }

        console.log(assets_url_array.length)
        console.log(assets_name_array.length)
        console.log(sliced_assets_name_array.length)


        const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

        console.log(`Downloading ${assets_name_array.length} assets`)

        bar1.start(assets_name_array.length,0)

    
        try {
            for (let i=0; i<assets_url_array.length; i++) {
                if (i<assets_url_array.length) {
                    if (fs.existsSync(`${__dirname}/../.minecraft/assets/objects/${sliced_assets_name_array[i]}`)==true) {

                        process.chdir(`${sliced_assets_name_array[i]}`)
    
                        await delay(1000)
    
                        await get(assets_url_array[i])
    
                        bar1.update(i)
    
                        process.chdir("../")
    
                    }
                    else if (fs.existsSync(`${__dirname}/../.minecraft/assets/objects/${sliced_assets_name_array[i]}`)==false){
    
                        fs.mkdir(`${sliced_assets_name_array[i]}`, {recursive:false}, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                process.chdir(`${sliced_assets_name_array[i]}`)
                            }
                        })

                        await get(assets_url_array[i])
    
                        bar1.update(i)
    
                        process.chdir("../")
                    }

                }

                if(i==(assets_url_array.length-1)) {
                    bar1.stop()
                }
                
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    else if (type2 == "snapshot") {
        process.chdir("snapshot")

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
            fs.mkdir(`assets`, {recursive:false}, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Creating assets dir")
                }
            })
            await delay(1000)
        }
    
        process.chdir("assets")
    
        let assetIndexurl = clientJarData.assetIndex.url
    
        await get(assetIndexurl)
    
        let assetObjectIndex = fs.readFileSync(`${versionNumber2.slice(0,4)}.json`)
    
        let asset_data = JSON.parse(assetObjectIndex)

        if (fs.existsSync(`${__dirname}/../.minecraft/assets/indexes`)==true) {
            console.log("indexes dir already exists, ignoring...")
            //process.chdir("libraries")
        }
        else {
            fs.mkdir(`indexes`, {recursive:false}, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Creating indexes dir")
                }
            })
        }

        await delay(2000)

        if (process.platform == "win32") {
            fs.copyFile(`${process.cwd()}/${versionNumber2.slice(0,4)}.json`, `${process.cwd()}/indexes/${versionNumber2.slice(0,4)}.json`, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(`moving ${versionNumber2.slice(0,4)}.json to indexes folder`)
                    remove(`${versionNumber2.slice(0,4)}.json`, `${process.cwd()}`)
                }
            })
            //executePowershellCommand(`mv ${versionNumber2.slice(0,4)}.json indexes/`, `powershell.exe`, `moving ${versionNumber2.slice(0,4)}.json to indexes folder`)
        }
        else if (process.platform == "linux") {
            //executeSystemCommand(`mv ${versionNumber2.slice(0,4)}.json indexes/`, `moving ${versionNumber2.slice(0,4)}.json to indexes folder`)
            fs.copyFile(`${process.cwd()}/${versionNumber2.slice(0,4)}.json`, `${process.cwd()}/indexes/${versionNumber2.slice(0,4)}.json`, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(`moving ${versionNumber2.slice(0,4)}.json to indexes folder`)
                    remove(`${versionNumber2.slice(0,4)}.json`, `${process.cwd()}`)
                }
            })
        }
        

        if (fs.existsSync(`${__dirname}/../.minecraft/assets/objects`)==true) {
            console.log("objects dir already exists, ignoring...")
            //process.chdir("libraries")
        }
        else {
            fs.mkdir(`objects`, {recursive:false}, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Creating objects dir")
                }
            })

        }

        await delay(2000)

        process.chdir("objects")

        //console.log(asset_data.objects)
    
        let values = Object.values(asset_data.objects)
        //let keys = Object.keys(asset_data.objects)
        //console.log(values)


        await delay(1000)

        console.log("Constructing urls....")

        const assets_url_array = []
        const assets_name_array = []
        const sliced_assets_name_array = []

        for (const eachValue1 of values) {
            assets_url_array.push(`https://resources.download.minecraft.net/` + `${eachValue1.hash.slice(0,2)}/` + `${eachValue1.hash}`)
            assets_name_array.push(eachValue1.hash)
            sliced_assets_name_array.push(eachValue1.hash.slice(0,2))
        }

        console.log(assets_url_array.length)
        console.log(assets_name_array.length)
        console.log(sliced_assets_name_array.length)


        const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

        console.log(`Downloading ${assets_name_array.length} assets`)

        bar1.start(assets_name_array.length,0)

    
        try {
            for (let i=0; i<assets_url_array.length; i++) {
                if (i<assets_url_array.length) {
                    if (fs.existsSync(`${__dirname}/../.minecraft/assets/objects/${sliced_assets_name_array[i]}`)==true) {

                        process.chdir(`${sliced_assets_name_array[i]}`)
    
                        await delay(1000)
    
                        await get(assets_url_array[i])
    
                        bar1.update(i)
    
                        process.chdir("../")
    
                    }
                    else if (fs.existsSync(`${__dirname}/../.minecraft/assets/objects/${sliced_assets_name_array[i]}`)==false){
    
                        fs.mkdir(`${sliced_assets_name_array[i]}`, {recursive:false}, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                process.chdir(`${sliced_assets_name_array[i]}`)
                            }
                        })

                        await get(assets_url_array[i])
    
                        bar1.update(i)
    
                        process.chdir("../")
                    }

                }

                if(i==(assets_url_array.length-1)) {
                    bar1.stop()
                }
                
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}




assets_downloader()