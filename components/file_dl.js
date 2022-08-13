const fs = require("fs")
const https = require("https")
const Path = require("path")


function file_downloader(url) {
    let filename = Path.basename(url)

    console.log("Downloading ", `${filename}` + ".....")

    https.get(url, (res) => {
        const puth = filename;
        const writeStream1 = fs.createWriteStream(puth);
         
        res.pipe(writeStream1);
         
        writeStream1.on("finish", () => {
            writeStream1.close();
            console.log("Download Completed!");
            return true
        })
    })

}

module.exports = file_downloader