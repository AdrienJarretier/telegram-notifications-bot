"use strict";

const api = require("./api.js")


const util = require("util");
const exec = util.promisify(require("child_process").exec);

// will count the number of processes on the system with name matching processName and send a notification when that number is zero.
async function notify_when_done(processName) {
    try {

        await exec("pgrep -c " + processName);

        setTimeout(notify_when_done, 60000);

    } catch (e) {

        api.sendMessage(processName + " is done");

    }
}

notify_when_done("shred");



