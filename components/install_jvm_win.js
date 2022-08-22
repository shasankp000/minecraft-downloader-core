const executeSystemCommand = require("./execute_sys_cmd")
const get = require("./async-file-dl")
const Path = require("path")

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function downloadWINJRE(url) {

    console.log("Downloading JRE 17....")

    await get(url)

    await delay(500)

    console.log("Done")

    const fileName = Path.basename(url)

    await executeSystemCommand(`msiexec /i ${fileName}`)

}

downloadWINJRE("https://download.bell-sw.com/java/17.0.4.1+1/bellsoft-jre17.0.4.1+1-windows-amd64.msi")