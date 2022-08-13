// Imports

const fs = require("fs") // for reading and writing files, downloading stuff.
const https = require("https") // for downloading stuff
const Path = require("path") // I will use this to determine filename from url.



const executeSystemCommand = require("./components/execute_sys_cmd")
const release_version_json_Downloader = require("./components/release")
const snapshot_version_json_Downloader = require("./components/snap")




const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function mc_dl_core() {
    
        try {

            console.log("Minecraft-download-core v1.0.0")


            if (fs.existsSync(`${__dirname}/version_jsons`)==true) {
                console.log("version_jsons dir already exists, ignoring...")
            }
            else {
                executeSystemCommand("mkdir version_jsons", "Creating version_jsons dir")
            }

            //executeSystemCommand("cp ./answer1.txt ./version_jsons")
            await delay(2000)
            //executeSystemCommand("cp ./answer2.txt ./version_jsons")

            process.chdir("version_jsons")

            if (fs.existsSync(`${__dirname}/version_jsons/release`)==true) {
                console.log("release dir already exists, ignoring...")
            }
            else {
                executeSystemCommand("mkdir release", "Creating release dir")
            }

            if (fs.existsSync(`${__dirname}/version_jsons/snapshot`)==true) {
                console.log("snapshot dir already exists, ignoring...")
            }
            else {
                executeSystemCommand("mkdir snapshot", "Creating snapshot dir")
            }

            await delay(2000)
            // get version_manifest.json

            https.get("https://launchermeta.mojang.com/mc/game/version_manifest.json", (res) => {
                const fname = Path.basename("https://launchermeta.mojang.com/mc/game/version_manifest.json")
                const writeStream = fs.createWriteStream(fname)
    
                res.pipe(writeStream)
    
                writeStream.on("finish", () => {
                    writeStream.close()
                    console.log("Downloaded" + " " + `${fname}`)
                })
    
            })

            
            await delay(5000)

            // download all jsons of all versions.

            console.log("Updating release jsons....")
            release_version_json_Downloader()

            await delay(5000)
            
            console.log("Updating snapshot jsons...")

            snapshot_version_json_Downloader()

            await delay(10000)

            console.log("Version info updated.")
        }

        catch (err) {
            // first time run will just execute first block of code, downloading the version_manifest.json
            console.log(err)
        }
    }




mc_dl_core()
