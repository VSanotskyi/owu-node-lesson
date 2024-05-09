const fs = require("node:fs/promises");
const path = require('node:path')

const fn = async () => {
    try {
        const pathTextFile = path.join(__dirname, 'www', 'text.txt')

        await fs.writeFile(pathTextFile, 'Hello from node.js')

        const data = await fs.readFile(pathTextFile, {encoding: 'utf-8'})
        console.log(data)
    } catch (e) {
        console.log(e)
    }
}

void fn()