const fs = require("fs") // for reading and writing files, downloading stuff.
const get = require("./async-file-dl")

async function release_version_json_Downloader() {

        

    const reader = fs.readFileSync("version_manifest.json") // reading the json file.
    const data = JSON.parse(reader) // parsing the file handle

    process.chdir("release")


    for(let i=0; i<data.versions.length; i++) {
        if (i<data.versions.length) {
            if (data.versions[i].type == "release") {
                let version_json_url = data.versions[i].url
                await get(version_json_url)
        }
        
        }

    }

}

module.exports = release_version_json_Downloader