
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
        res.on('end', () => console.log(Buffer.concat(body).toString()));
    }).end()

    const doc = yaml.safeLoad(Buffer.concat(body).toString(), 'utf8');
    console.log(doc["entries"][name][0].version);
    console.log("Test App")


}
main().catch((e) => core.setFailed(e.message));
