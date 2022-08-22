const fetch = require("node-fetch")
const fs = require("fs")
const {pipeline} = require('stream/promises');
const get = require("./async-file-dl")
const goBackOneDir = require("./goBOD");
const executeSystemCommand = require("./execute_sys_cmd");
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser")
const Path = require("path")

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))




const getFabricVersions = async(url) => pipeline(
    (await fetch(url)).body,
    fs.createWriteStream(`${process.cwd()}/fabric_versions.json`)
);

const getFabricLoaders = async(url) => pipeline(
    (await fetch(url)).body,
    fs.createWriteStream(`${process.cwd()}/fabric_loaders.json`)
);

const getFabricInstallers = async(url) => pipeline(
    (await fetch(url)).body,
    fs.createWriteStream(`${process.cwd()}/fabric_installers.xml`)
);


async function fabric_dl() {
    
    console.log("Updating configurations....")

    await delay(500)

    await getFabricVersions("https://meta.fabricmc.net/v2/versions")
    
    await getFabricLoaders("https://meta.fabricmc.net/v2/versions/loader")

    await getFabricInstallers("https://maven.fabricmc.net/net/fabricmc/fabric-installer/maven-metadata.xml")

    console.log("Done")

    await delay(500)
    
    const versionNumber3 = fs.readFileSync("answer1.txt")
    const xmldata = fs.readFileSync("./fabric_installers.xml")
    const loader_json = fs.readFileSync("./fabric_loaders.json")

    const type = fs.readFileSync("answer2.txt")


    const parser = new XMLParser();
    let jObj = parser.parse(xmldata);
    const loader_data = JSON.parse(loader_json)


    let latest_installer_version = jObj.metadata.versioning.latest
    let latest_loader_vesion = loader_data[0].version
    //console.log(latest_installer_version)
    //console.log(latest_loader_vesion)
    
    

    if (type == "release") {

        //console.log(jObj.metadata.versioning.latest)


        console.log(`Downloading latest fabric installer`)

        await delay(500)

        await get(`https://maven.fabricmc.net/net/fabricmc/fabric-installer/${latest_installer_version}/fabric-installer-${latest_installer_version}.jar`)

        console.log("Done")

        await delay(1000)

        executeSystemCommand(`java -jar fabric-installer-${latest_installer_version}.jar client -dir "${process.cwd()}/.minecraft" -mcversion ${versionNumber3} -loader ${latest_loader_vesion} -noprofile`, `Installing fabric ${versionNumber3}`)
        
        console.log("Done")

    }

}

fabric_dl()