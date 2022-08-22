const fs = require("fs")
const https = require("https")
const Path = require("path")

const get = require("./async-file-dl")

const goBackOneDir = require("./goBOD")

async function snapshot_version_json_Downloader() {

    // since this function is being called after release.js, inside of app.js, PID will be same
    // hence we need to go back one directory.

    goBackOneDir()

    process.chdir("version_jsons")

    const reader = fs.readFileSync("version_manifest.json") // reading the json file.
    const data = JSON.parse(reader) // parsing the file handle

    process.chdir("snapshot")


    for(let i=0; i<data.versions.length; i++) {
        if (data.versions[i].type == "snapshot") {
            let version_json_url = data.versions[i].url
            await get(version_json_url)
        }
    }
    return true
}

module.exports = snapshot_version_json_Downloader