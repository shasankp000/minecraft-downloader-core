const fs = require("fs")
const executeSystemCommand = require("./execute_sys_cmd")
const goBackOneDir = require("./goBOD")
const get = require("./async-file-dl")
const cliProgress = require('cli-progress');

const mcDir = `${process.cwd()}/.minecraft`
const assetsDir = `${mcDir}/assets`
const indexesDir = `${assetsDir}/indexes`
const objectsDir = `${assetsDir}/objects`
const vJsonsDir = `${process.cwd()}/version_jsons`

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const remove = require("./delete")

async function assets_downloader() {
    console.log("Downloading assets, this is gonna take a while...")

    const versionNumber2 = fs.readFileSync("answer1.txt").toString()
    const type2 = fs.readFileSync("answer2.txt").toString()

    console.log(versionNumber2)
    console.log(type2)

    let clientJarJsonFile = `${vJsonsDir}/${type2}/${versionNumber2}.json`
    let assetObjectJsonFile = `${assetsDir}/${versionNumber2.slice(0, 4)}.json`

    let assetObjectInIndexesJsonFile = `${indexesDir}/${versionNumber2.slice(0, 4)}.json`

    let clientJarUrl = fs.readFileSync(clientJarJsonFile)

    let clientJarData = JSON.parse(clientJarUrl)

    goBackOneDir()

    if (fs.existsSync(assetsDir)) {
        console.log("assets dir already exists, ignoring...")
        //process.chdir("libraries")
    }
    else {
        fs.mkdirSync(assetsDir, { recursive: false }, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Creating assets dir")
            }
        })
    }

    process.chdir(assetsDir)

    let assetIndexurl = clientJarData.assetIndex.url

    await get(assetIndexurl)

    let assetObjectIndex = fs.readFileSync(assetObjectJsonFile)

    let asset_data = JSON.parse(assetObjectIndex)


    if (fs.existsSync(indexesDir)) {
        console.log("indexes dir already exists, ignoring...")
        //process.chdir("libraries")
    }
    else {
        fs.mkdirSync(indexesDir, { recursive: false }, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Creating indexes dir")
            }
        })
    }

    fs.copyFile(assetObjectJsonFile, assetObjectInIndexesJsonFile, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(`moving ${versionNumber2.slice(0, 4)}.json to indexes folder`)
            remove(assetObjectJsonFile)
        }
    })

    if (fs.existsSync(objectsDir) == true) {
        console.log("objects dir already exists, ignoring...")
        //process.chdir("libraries")
    }
    else {
        fs.mkdirSync(objectsDir, { recursive: false }, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Creating objects dir")
            }
        })

    }

    let values = Object.values(asset_data.objects)
    //let keys = Object.keys(asset_data.objects)
    //console.log(values)


    console.log("Constructing urls....")

    const assets_url_array = []
    const assets_name_array = []
    const sliced_assets_name_array = []

    for (const eachValue1 of values) {
        assets_url_array.push(`https://resources.download.minecraft.net/` + `${eachValue1.hash.slice(0, 2)}/` + `${eachValue1.hash}`)
        assets_name_array.push(eachValue1.hash)
        sliced_assets_name_array.push(eachValue1.hash.slice(0, 2))
    }

    console.log(assets_url_array.length)
    console.log(assets_name_array.length)
    console.log(sliced_assets_name_array.length)


    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    console.log(`Downloading ${assets_name_array.length} assets`)

    bar1.start(assets_name_array.length, 0)


    try {
        for (let i = 0; i < assets_url_array.length; i++) {
            if (i < assets_url_array.length) {

                let dirName = objectsDir + `/${sliced_assets_name_array[i]}`

                if (!fs.existsSync(dirName)) {
                    fs.mkdirSync(dirName, { recursive: false }, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }

                process.chdir(dirName)

                await get(assets_url_array[i])

                bar1.update(i)

                process.chdir("../")
            }

            if (i == (assets_url_array.length - 1)) {
                bar1.stop()
            }

        }
    }
    catch (err) {
        console.log(err)
    }
}


assets_downloader()
