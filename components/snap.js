const fs = require("fs")
const https = require("https")
const Path = require("path")

const goBackOneDir = require("./goBOD")

function snapshot_version_json_Downloader() {

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

            let filename = Path.basename(version_json_url)

            https.get(version_json_url, (res) => {
                const puth = filename;
                const writeStream1 = fs.createWriteStream(puth);
                
                res.pipe(writeStream1);
                
                writeStream1.on("finish", () => {
                writeStream1.close();
                console.log("Download Completed!");
                })
            })
        }
    }
    return true
}

module.exports = snapshot_version_json_Downloader