const fs = require("fs")
const {pipeline} = require('stream/promises');
const Path = require("path")
const fetch = require("node-fetch")

const downloadFile = async (url) => pipeline(
    (await fetch(url)).body,
    fs.createWriteStream(Path.basename(url))
);



//downloadFile("https://unsplash.com/photos/mBQIfKlvowM/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHx8fDE2NjAzMjk0ODc")

module.exports = downloadFile