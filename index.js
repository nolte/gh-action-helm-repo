
const core = require('@actions/core');
const yaml = require('js-yaml');
const fs = require('fs');
const https = require('https');


async function main() {
    const repo = core.getInput('repo', { required: true });
    const name = core.getInput('name', { required: true });
    let myURL = new URL(repo + '/index.yaml');
    let body = [];
    https.request(myURL, res => {
        // XXX verify HTTP 200 response
        res.on('data', chunk => body.push(chunk));
        res.on('end', () => yaml.safeLoadAll(Buffer.concat(body).toString(), function (doc) {
            const latestVersion = doc["entries"][name][0].version
            core.setOutput('version', latestVersion);
            console.log("Latest Version From chart " + latestVersion)
        }));
    }).end()
    console.log("Test App")


}
main().catch((e) => core.setFailed(e.message));
