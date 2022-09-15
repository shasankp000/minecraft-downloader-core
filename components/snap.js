const fs = require("fs")
const cliProgress = require('cli-progress');
const get = require("./async-file-dl")

const goBackOneDir = require("./goBOD")

async function snapshot_version_json_Downloader() {

    // since this function is being called after release.js, inside of app.js, PID will be same
    // hence we need to go back one directory.

    goBackOneDir()

    process.chdir("version_jsons")

    const reader = fs.readFileSync("version_manifest.json") // reading the json file.
    const data = JSON.parse(reader) // parsing the file handle

    const snap_array = []
    const name_array = []

    for (i in data.versions) {
        if(data.versions[i].type == "snapshot") {
  
            snap_array.push(data.versions[i].url)
            name_array.push(data.versions[i].id)

        }
    }

    //console.log(release_array)

    
    process.chdir("snapshot")

    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    console.log(`Downloading ${snap_array.length} files....`)

    bar1.start(snap_array.length,0)


    for(let i=0; i<snap_array.length; i++) {

        if (i<snap_array.length) {
            let version_json_url = snap_array[i]
            await get(version_json_url)
            bar1.update(i, {filename: `${data.versions[i].id}`})         
        }

        if(i==(snap_array.length-1)) {
            bar1.stop()
            console.log("Download complete.")
        }

    }


}


module.exports = snapshot_version_json_Downloader
//snapshot_version_json_Downloader()