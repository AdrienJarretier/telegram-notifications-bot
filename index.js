"use strict";

const api = require("cotController/control.js")


const util = require("util");
const exec = util.promisify(require("child_process").exec);

// will count the number of processes on the system with name matching processName and send a notification when that number is zero.
async function notify_when_process_done(processName) {
    try {

        await exec("pgrep -c " + processName);

        setTimeout(() => notify_when_process_done(processName), 60000);

    } catch (e) {

        api.sendMessage(processName + " is done");

    }
}

if (process.argv.length < 3) {

    console.error("missing process name argument")
    console.error("example usage : node . shred")

}
else {

    notify_when_process_done(process.argv[2]);
}




