"use strict";

const api = require("./api.js")


const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function pgrep() {
    try {

        await exec("pgrep -c shred");

        setTimeout(pgrep, 60000);

    } catch (e) {

        api.sendMessage("shred is done");

    }
}

pgrep();



