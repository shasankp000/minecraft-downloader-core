// Imports

const fs = require("fs") // for reading and writing files, downloading stuff.
const https = require("https") // for downloading stuff
const Path = require("path") // I will use this to determine filename from url.



const executeSystemCommand = require("./components/execute_sys_cmd")
const release_version_json_Downloader = require("./components/release")
const snapshot_version_json_Downloader = require("./components/snap")

const get = require("./components/async-file-dl")



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

            await get("https://launchermeta.mojang.com/mc/game/version_manifest.json")
            
            await delay(1000)

            // download all jsons of all versions.

            console.log("Updating release jsons....")
            await release_version_json_Downloader()

            await delay(2000)
            
            console.log("Updating snapshot jsons...")

            await snapshot_version_json_Downloader()


            console.log("Version info updated.")



        }

        catch (err) {
            // first time run will just execute first block of code, downloading the version_manifest.json
            console.log(err)
        }
    }




mc_dl_core()
