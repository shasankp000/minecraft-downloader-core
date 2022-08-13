const fs = require("fs")
const sleep = require("./sleep.js")




function jsonReader(file, versionNumber) {
    try {
        const reader = fs.readFileSync(`${file}`) // reading the json file.
        const data = JSON.parse(reader) // parsing the file handle

        



        //console.log(data.latest.release)
        //console.log(data.versions[0])
        //console.log(data.versions[0].url)

       sleep(2000)

        for(let i=0; i<data.versions.length; i++) {
            if (data.versions[i].id == versionNumber) {
                const version_json_url = data.versions[i].url

                sleep(2)

                fs.writeFileSync("./url.txt", version_json_url) // writing url to a text file.
                console.log("Url written to file.")
                

                // since node.js's non block I/O model runs the rest of mc_downloader's code before running the versionJsonDownloader, I am embedding the code here.


            }
        }


        //const version_json_url = data.versions[0].url
    } 
    catch (err) { 
        console.log(err)
    }
}

module.exports = jsonReader