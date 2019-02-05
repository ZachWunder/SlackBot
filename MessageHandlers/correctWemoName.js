module.exports = (message, rtm) => {
    if (message.text.indexOf("WeMo") > -1) {
        rtm.sendMessage("~WeMo~ *Wemo*", message.channel)
    }
}





    /*if (eventBody.text.indexOf("WeMo") > -1 &&
        eventBody.subtype != "bot_message" &&
        eventBody.channel_type != "im") {
            const options = {
                url: postMessageURL,
                method: "POST",
                headers: {
                    'Authorization': "Bearer " + BotToken
                },
                json: {
                    channel: eventBody.channel,
                    text: "~WeMo~ *Wemo*"
                }
            };
            const message = await request(options);
            console.log(message);
        }
    */
