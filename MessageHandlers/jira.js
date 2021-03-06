const request = require("request-promise-native");
module.exports = async (message, rtm) => {
    if ( message.text ) {
        const tickets = message.text.match(/(!WEMO-[0-9])\w+/g);
        if ( tickets && tickets.length ) {
            try {
                // Exclude !
                const ticket = tickets[0].substring(1)
                const ticketURL = "https://jira.belkin.com/browse/" + ticket;
                const issue = await getIssueInfo(ticket);
                console.log(issue)
                const issueInfo =
                    `
                    Ticket info for issue *${ticket}*\n*Status*: ${issue.status}\n*Description*: ${issue.description}\n*Assignee*: ${issue.assignee}\n*Link to Issue*: ${ticketURL}
                    `;
                rtm.sendMessage(issueInfo, message.channel)
            } catch (e) {
                rtm.sendMessage("Cannot connect to JIRA", message.channel)
                return;
            }
        }
    }
};

const getIssueInfo = async ticket => {
    console.log("Getting Issue Info")
    const credentials = Buffer.from(process.env.JIRA_CREDENTIALS).toString('base64');
    const jiraURL = "https://jira.belkin.com/rest/api/2/issue/";
    const fields = "assignee,summary,status";

    return new Promise(async (resolve, reject) => {
        try {
            const ticketURL = jiraURL + ticket + "?fields=" + fields;
            const response = await request({
                    url: ticketURL,
                    qs: {fields: fields},
                    method: "GET",
                    headers: {
                        'Authorization': "Basic " + credentials
                    }
            });
            const ticketData = JSON.parse(response);
            resolve({
                status: ticketData.fields.status.name,
                description: ticketData.fields.summary,
                assignee: ticketData.fields.assignee.name,
                link: ticketData.self
            });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
};
