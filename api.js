"use strict";

const fs = require('fs');
const superagent = require('superagent');

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

const BOT_TOKEN = config.bot_token;
// const timestamp = date ('YmdHis', time()-3600);

const BASE_API_ULR = config.telegram_api_url;

const METHODS = {
    
    getMe : {method:"getMe",
        fixedParameters:{}
        },
    getUpdates : {method:"getUpdates",
        fixedParameters:{}
        },
    sendMessage : {
        method:"sendMessage",
        fixedParameters:{
            chat_id: config.chat_id
        }
    }
    
}

/* function getTimestamp() {
  function pad2(n) {  // always returns a string
      return (n < 10 ? '0' : '') + n;
  }

  let nowDate = new Date();

  nowDate.setTime(nowDate.getTime()-3600000);

  return nowDate.getFullYear() +
         pad2(nowDate.getMonth() + 1) + 
         pad2(nowDate.getDate()) +
         pad2(nowDate.getHours()) +
         pad2(nowDate.getMinutes()) +
         pad2(nowDate.getSeconds());
} */

function makeApiCallUrl(method) {

    let url = BASE_API_ULR + BOT_TOKEN + '/' + method;

    return url;

}

/* async function createSession() {

  let url = makeApiCallUrl("createSession");

  try {

    const res = await superagent.get(url);
    console.log(res.body);
    
  } catch (err) {

    console.error(err);

  }


} */

async function simpleRequest(method, parameters) {

  let url = makeApiCallUrl(method.method);


  try {

    const res = await superagent.get(url)
    .query(Object.assign(parameters, method.fixedParameters));
    
  } catch (err) {

    console.error("error when sending "+method.method);

  }


}

function sendMessage(text) {
    
    simpleRequest(METHODS.sendMessage, {text:text})
    
}

exports.sendMessage = sendMessage