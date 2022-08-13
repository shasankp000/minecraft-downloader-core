const Path = require("path")

function goBackOneDir() {
    let currn_dir = Path.join(__dirname, "../")
    process.chdir(currn_dir)

    console.log(__dirname)
}

module.exports = goBackOneDir