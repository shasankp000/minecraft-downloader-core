const Path = require("path")
const fs = require("fs")
const goBackOneDir = require("./goBOD")
const cliProgress = require('cli-progress');
const get = require("./async-file-dl")
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))



async function lib_downloader() {
    console.log("Downloading libraries, this is gonna take a while....")

    goBackOneDir()

    const versionNumber1 = fs.readFileSync("answer1.txt").toString()
    const type = fs.readFileSync("answer2.txt").toString()

    console.log(versionNumber1)
    console.log(type)

    process.chdir("version_jsons")


    if (type=="release") {

        process.chdir("release")

        let clientJarUrl = fs.readFileSync(`${versionNumber1}.json`)

        let clientJarData = JSON.parse(clientJarUrl)

        let currn_dir = Path.join(__dirname, "../")
        process.chdir(currn_dir)
        console.log(__dirname)

        process.chdir(".minecraft")


    if (fs.existsSync(`${__dirname}/../.minecraft/libraries`)==true) {
        console.log("Libraries dir already exists, ignoring...")
        //process.chdir("libraries")
    }
    else {
        fs.mkdir(`libraries`, {recursive:false}, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Creating libraries dir")
            }
        })
        await delay(1000)
    }

    const lib_url_array = []
    const dirpath_array = []
    const name_array = []
    
    for (j in clientJarData.libraries) {
        name_array.push(clientJarData.libraries[j].name)
        lib_url_array.push(clientJarData.libraries[j].downloads.artifact.url)

        let libpathdir = clientJarData.libraries[j].downloads.artifact.path
        let dirpath = Path.dirname(libpathdir)

        dirpath_array.push(dirpath)

    }

        console.log(name_array.length)
        console.log(lib_url_array.length)
        console.log(dirpath_array.length)

        const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

        console.log(`Downloading ${name_array.length} libraries`)

        bar1.start(name_array.length,0)
        

        for (let i=0; i<name_array.length; i++) {
            if (i<name_array.length) {
                await delay(1000)

                process.chdir("libraries")

                await delay(1000)
                

                if (process.platform == "win32") {
                    if (fs.existsSync(`${process.cwd()}/${dirpath_array[i]}`==true)) {

                        process.chdir(dirpath_array[i])

                        //console.log(`Downloading ${lib_url_array[i]}`)

                        await get(lib_url_array[i])

                        //await delay(2000)

                        bar1.update(i)

                        process.chdir(`${__dirname}/../.minecraft/`)


                    }

                    else{

                        fs.mkdir(`${dirpath_array[i]}`, {recursive:true}, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                process.chdir(dirpath_array[i])

                                //console.log(`Downloading ${lib_url_array[i]}`)     
                            }
                        })
                        
                        await get(lib_url_array[i])
                    
                        bar1.update(i)
            
                        process.chdir(`${__dirname}/../.minecraft/`)

                    }
                    
                }
                else if (process.platform == "linux") {
                    if (fs.existsSync(`${process.cwd()}/${dirpath_array[i]}`==true)) {

                        //console.log(`${dirpath} already exists, accessing...`)

                        process.chdir(dirpath_array[i])

                        //console.log(`Downloading ${lib_url_array[i]}`)

                        await get(lib_url_array[i])

                        bar1.update(i)

                        process.chdir(`${__dirname}/../.minecraft/`)


                    }

                    else{

                        fs.mkdir(`${dirpath_array[i]}`, {recursive:true}, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                process.chdir(dirpath_array[i])

                                //console.log(`Downloading ${lib_url_array[i]}`)     
                            }
                        })
                        
                        await get(lib_url_array[i])
                    
                        bar1.update(i)
            
                        process.chdir(`${__dirname}/../.minecraft/`)



                    }
                    
                }
            
                
            }

            if (i==(name_array.length-1)) {
                bar1.stop()
            }
            
        }
    }

    else if(type=="snapshot") {
        process.chdir("snapshot")

        let clientJarUrl = fs.readFileSync(`${versionNumber1}.json`)

        let clientJarData = JSON.parse(clientJarUrl)

        let currn_dir = Path.join(__dirname, "../")
        process.chdir(currn_dir)
        console.log(__dirname)

        process.chdir(".minecraft")

    //let currn_dir = Path.join(__dirname, "../")
    //process.chdir(currn_dir)
    //console.log(__dirname)

    if (fs.existsSync(`${__dirname}/../.minecraft/libraries`)==true) {
        console.log("Libraries dir already exists, ignoring...")
        //process.chdir("libraries")
    }
    else {
        fs.mkdir(`libraries`, {recursive:false}, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Creating libraries dir")
            }
        })
        await delay(1000)
    }

    const lib_url_array = []
    const dirpath_array = []
    const name_array = []
    
    for (j in clientJarData.libraries) {
        name_array.push(clientJarData.libraries[j].name)
        lib_url_array.push(clientJarData.libraries[j].downloads.artifact.url)

        let libpathdir = clientJarData.libraries[j].downloads.artifact.path
        let dirpath = Path.dirname(libpathdir)

        dirpath_array.push(dirpath)

    }

    //process.chdir("libraries")

        //const base_dir = __dirname

        console.log(name_array.length)
        console.log(lib_url_array.length)
        console.log(dirpath_array.length)

        const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

        console.log(`Downloading ${name_array.length} libraries`)

        bar1.start(name_array.length,0)
        

        for (let i=0; i<name_array.length; i++) {
            if (i<name_array.length) {
                await delay(1000)

                process.chdir("libraries")

                await delay(1000)
                

                if (process.platform == "win32") {
                    if (fs.existsSync(`${process.cwd()}/${dirpath_array[i]}`==true)) {

                        //console.log(`${dirpath} already exists, accessing...`)

                        process.chdir(dirpath_array[i])

                        //console.log(`Downloading ${lib_url_array[i]}`)

                        await get(lib_url_array[i])

                        //await delay(2000)

                        bar1.update(i)

                        process.chdir(`${__dirname}/../.minecraft/`)


                    }

                    else{

                        fs.mkdir(`${dirpath_array[i]}`, {recursive:true}, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                process.chdir(dirpath_array[i])

                                //console.log(`Downloading ${lib_url_array[i]}`)     
                            }
                        })
                        
                        await get(lib_url_array[i])
                    
                        //await delay(2000)

                        bar1.update(i)
            
                        process.chdir(`${__dirname}/../.minecraft/`)



                    }
                    
                }
                else if (process.platform == "linux") {
                    if (fs.existsSync(`${process.cwd()}/${dirpath_array[i]}`==true)) {

                        //console.log(`${dirpath} already exists, accessing...`)

                        process.chdir(dirpath_array[i])

                        //console.log(`Downloading ${lib_url_array[i]}`)

                        await get(lib_url_array[i])

                        //await delay(2000)

                        bar1.update(i)

                        process.chdir(`${__dirname}/../.minecraft/`)


                    }

                    else{

                        fs.mkdir(`${dirpath_array[i]}`, {recursive:true}, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                process.chdir(dirpath_array[i])

                                //console.log(`Downloading ${lib_url_array[i]}`)     
                            }
                        })
                        
                        await get(lib_url_array[i])
                    
                        //await delay(2000)

                        bar1.update(i)
            
                        process.chdir(`${__dirname}/../.minecraft/`)



                    }
                    
                }
            
                
            }

            if (i==(name_array.length-1)) {
                bar1.stop()
            }
            
        }
    }


    
}



lib_downloader()
