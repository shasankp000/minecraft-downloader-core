const fs = require("fs")

async function deleteFile(filename, path) {
    fs.unlink(`${path}/${filename}`, (err) => {
        if (err) {
            throw err;
        }
        else {
            console.log(`Deleted ${filename}`);
        }

    });
}

module.exports = deleteFile