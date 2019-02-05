# Slack Bot

## Setup
Required:
NodeJS and NPM

Clone the repo and navigate to the working directory.

Install dependencies
`npm install`

Configure environmental variables:
`SLACK_TOKEN`: OAuth token from Slack used to authenticate the bot user. Obtained from the Slack API page.
`JIRA_CREDENTIALS`: JIRA credentials in format `{user}:{password}`

Run application:
`npm run start`

## Components
**Correct Wemo Name**
Corrects users who type WeMo instead of, Wemo.
**Jira**
Returns issue metadata

*Trigger:* !WEMO-XXXXXX
*Returns:*
Status, Description, Assignee, Link to Issue
