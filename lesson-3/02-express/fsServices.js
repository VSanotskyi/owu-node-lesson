const fs = require('node:fs/promises')
const path = require('node:path')

const usersPath = path.join(__dirname, 'db.json')

const readUsers = async () => {
    const users = await fs.readFile(usersPath, {encoding: 'utf-8'})

    return JSON.parse(users)
}

const writeUser = async (data) => {
    await fs.writeFile(usersPath, JSON.stringify(data, null, 2))
}

module.exports = {
    readUsers,
    writeUser,
}