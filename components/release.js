const fs = require("fs") // for reading and writing files, downloading stuff.
const https = require("https") // for downloading stuff
const Path = require("path") // I will use this to determine filename from url.


function release_version_json_Downloader() {

        

    const reader = fs.readFileSync("version_manifest.json") // reading the json file.
    const data = JSON.parse(reader) // parsing the file handle

    process.chdir("release")


    for(let i=0; i<data.versions.length; i++) {
        if (i<data.versions.length) {
            if (data.versions[i].type == "release") {
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

    }

}

module.exports = release_version_json_Downloader