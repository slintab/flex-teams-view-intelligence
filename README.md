# Twilio Flex: Teams View Intelligence

This repository contains a plugin for integrating Twilio Conversations Intelligence with Flex to give supervisors real-time visibility into conversation insights, including sentiment and script adherence, directly within the [Teams View](https://www.twilio.com/docs/flex/onboarding-guide/explore-the-built-in-flex-ui-views#teams-view).

## Table of contents

- [Demo](#demo)
- [Components](#components)
- [Setup](#setup)
- [Maintainer](#maintainer)

## Demo

![Demo](demo.png?raw=true)

The plugin extends the built-in [TaskCard](https://assets.flex.twilio.com/docs/releases/flex-ui/2.17.1/programmable-components/components/Supervisor%E2%80%A4TaskCard/) component with a horizontal badge displaying real-time indicators, allowing supervisors to monitor all ongoing conversations at a glance. It also adds an Operators tab to the [TaskInfoPanel](https://assets.flex.twilio.com/docs/releases/flex-ui/2.17.1/programmable-components/components/Supervisor%E2%80%A4TaskInfoPanel/) where supervisors can view detailed information about each indicator.

## Components

![Diagram](architecture.png?raw=true)

The solution leverages the following building blocks:

- **Twilio Conversations Intelligence**: for extracting insights from conversations in real-time, using [language operators](https://www.twilio.com/docs/conversations/intelligence/real-time-conversation-intelligence).
- **Twilio Flex Plugin**: for displaying indicators to supervisors in the Flex UI.
- **Twilio Sync stream**: for storing and publishing data.
- **Twilio Functions _(live-sentiment-functions)_**: middleware for receiving and saving language operator results.

## Setup

**Step 1: Configure language operators**:

1. Under _Conversation Intelligence > Language operators_, create a custom language operator for conversation scoring. An example conversation scoring operator can be found [here](https://www.twilio.com/docs/conversations/intelligence/custom-language-operator-examples#conversation-scoring). The operator should return its output using the below format:

   ```
   {
     "properties": {
       "reason": {
         "type": "string"
       },
       "score": {
         "type": "number"
       }
     },
     "type": "object"
   }
   ```

2. On the same page, make a note of the IDs of the conversation scoring operator and of the following built-in language operators: Sentiment, Script-Adherence, Summary.

**Step 2: Configure Sync**:

1. Create a Sync Service under _Sync > Services_ and make a note of its SID.

**Step 3: Deploy Twilio Functions:**

1. Install the [Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit).
2. Navigate to the functions directory: `cd teams-view-intel-functions`
3. Rename `.env.example` to `.env`, and set the values of environment variables as follows:
   - `ACCOUNT_SID`: your Twilio account SID.
   - `AUTH_TOKEN`: your Twilio auth token.
   - `API_KEY`: your Twilio API key.
   - `API_SECRET`: your Twilio API secret.
   - `SYNC_SERVICE_SID`: SID of the Sync service from step 2.
   - `SENTIMENT_OPERATOR_ID`: ID of the sentiment operator from step 1.
   - `SCRIPT_ADHERENCE_OPERATOR_ID`: ID of the script adherence operator from step 1.
   - `SUMMARY_OPERATOR_ID`: ID of the summary operator from step 1..
   - `CONVERSATION_SCORE_OPERATOR_ID`: ID of the conversation scoring operator from step 1.
4. Deploy the functions using `npm run deploy`.

**Step 4: Configure Conversations Intelligence**:

1. Create an [intelligence configuration](https://www.twilio.com/docs/conversations/intelligence/create-intelligence-configuration#create-an-intelligence-configuration) and attach it to the [conversation configurations](https://www.twilio.com/docs/conversations/memory/getting-started#set-up-a-conversation-configuration) capturing your Flex traffic.
2. Add a rule to your intelligence configuration:
   - Add the Sentiment (Twilio), Summary (Twilio), Script-Adherence (Twilio) and Conversation-Scoring (custom) language operators to the rule.
   - Under Trigger, select Custom frequency and set it to the desired frequency level (e.g. 5).
   - Under Action, set the webhook to the URL of the `/operator-results` Function from step 3.

**Step 5: Deploy Flex plugin:**

1. Install the [Flex Plugins CLI](https://www.twilio.com/docs/flex/developer/plugins/cli).
2. Navigate to the plugin directory: `cd teams-view-intel-plugin`.
3. Rename `.env.example` to `.env`, and set `FLEX_APP_FUNCTIONS_URL` to the base URL of Twilio Functions from step 3.
4. Deploy the plugin using the `twilio flex:plugins:deploy` command.

That's it! To see the plugin in action, navigate to the Teams View in Flex.

## Maintainer

Thanks for reading this far!
If you have any questions, do not hesitate to reach out at `hello@slintab.dev`.
