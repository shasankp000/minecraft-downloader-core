const {exec} = require("child_process") // for executing system commands


async function executeSystemCommand(cmd, shell, output) {
    // Makes life a lot more easier.
    exec(cmd, {'shell':`${shell}`},(error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${output}`);
    });
}

module.exports = executeSystemCommand