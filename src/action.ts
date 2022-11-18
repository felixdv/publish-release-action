import * as core from '@actions/core';
import * as github from '@actions/github';
import * as httpm from '@actions/http-client';

import { getPostData } from './getPostData';

async function run(): Promise<void> {
    try {
        const slackWebhookUrl = core.getInput('slackWebhookUrl');
        console.log(`Webhook URL: ${slackWebhookUrl}`);

        // If input is not provided, text will be an empty string
        const text = core.getInput('text');
        console.log(`Text: ${text}`);

        const stage = core.getInput('stage') ?? process.env.STAGE ?? 'undefined';

        // Test to see what environment we have here
        core.setOutput('environment', process.env);

        const postData = getPostData(github.context, {
            text,
            stage,
        });
        core.setOutput('request', JSON.stringify(postData));

        const httpClient = new httpm.HttpClient('slack webhook client');
        const requestHeaders = {
            [httpm.Headers.ContentType]: 'application/json',
        };
        const response = await httpClient.postJson(slackWebhookUrl, postData, requestHeaders);

        core.setOutput(
            'response',
            JSON.stringify({
                statusCode: response.statusCode,
                result: response.result,
            }),
        );
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
