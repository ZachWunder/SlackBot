const { RTMClient } = require('@slack/client');

const correctWemoName = require("./MessageHandlers/correctWemoName");
const jira = require("./MessageHandlers/jira");

const token = process.env.SLACK_TOKEN;

const rtm = new RTMClient(token);
rtm.start();

rtm.on('connected', message => {
    console.log("Connected");
})

rtm.on('message', message => {
    // Skip messages that are from a bot or own user ID
    if ( (message.subtype && message.subtype === 'bot_message') ||
       (!message.subtype && message.user === rtm.activeUserId) ) {
           return;
    }

    console.log(message);

    correctWemoName(message, rtm)
    jira(message, rtm)
});
