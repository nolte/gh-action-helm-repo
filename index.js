
const core = require('@actions/core');

async function main() {
    console.log("Test App")

}
main().catch((e) => core.setFailed(e.message));
