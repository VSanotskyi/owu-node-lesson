const os = require("node:os");

const fn = async () => {
    try {
        console.log(os.arch());
        console.log(os.cpus());
        console.log(os.homedir());
        console.log(os.hostname());
        console.log(os.version());
        console.log(os.machine());
    } catch (e) {
        console.log(e)
    }
}

void fn()