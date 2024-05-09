const readline = require("node:readline/promises");

const fn = async () => {
    try {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        const name = await rl.question('Enter your name: ')
        console.log(`Hello, ${name}!`)
        rl.close()
    } catch (e) {
        console.log(e)
    }
}

void fn()