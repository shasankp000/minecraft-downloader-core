const fs = require("fs") // for reading and writing files, downloading stuff.
const get = require("./async-file-dl")
const cliProgress = require('cli-progress');
const goBod = require("./goBOD")

async function release_version_json_Downloader() {

    goBod()

    process.chdir("version_jsons")
    const reader = fs.readFileSync("version_manifest.json") // reading the json file.
    const data = JSON.parse(reader) // parsing the file handle

    const release_array = []
    const name_array = []

    for (i in data.versions) {
        if(data.versions[i].type == "release") {
  
            release_array.push(data.versions[i].url)
            name_array.push(data.versions[i].id)

        }
    }

    //console.log(release_array)

    
    process.chdir("release")

    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    console.log(`Downloading ${release_array.length} files....`)

    bar1.start(release_array.length,0)


    for(let i=0; i<release_array.length; i++) {

        if (i<release_array.length) {
            let version_json_url = release_array[i]
            await get(version_json_url)
            bar1.update(i, {filename: `${data.versions[i].id}`})         
        }

        if(i==(release_array.length-1)) {
            bar1.stop()
            console.log("Download complete.")
        }

    }

}

module.exports = release_version_json_Downloader
//release_version_json_Downloader()