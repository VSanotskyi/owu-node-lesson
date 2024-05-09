const express = require('express')

const {readUsers, writeUser} = require('./fsServices')

const PORT = 8080

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'Hello from express'})
})

app.get('/users', async (req, res) => {
    const users = await readUsers()

    res.json(users)
})

app.get('/users/:id', async (req, res) => {
    const {id} = req.params

    const users = await readUsers()

    const index = users.findIndex(el => el.id === id)

    if (index === -1) {
        res.status(404).json({message: 'Not found'})
        return
    }

    const user = users[index]

    res.json(user)
})

app.post('/users', async (req, res) => {
    const user = req.body

    const users = await readUsers()

    const id = (Number(users[users.length - 1].id) + 1).toString()

    users.push({id, ...user})

    await writeUser(users)

    res.status(201).json(user)
})

app.put('/users/:id', async (req, res) => {
    const {id} = req.params
    const body = req.body

    const users = await readUsers()

    const index = users.findIndex(el => el.id === id)

    if (index === -1) {
        res.status(404).json({message: 'Not found'})
        return
    }
    const updateUser = {...users[index], ...body}

    users[index] = updateUser

    await writeUser(users)

    res.status(200).json(updateUser)
})

app.delete('/users/:id', async (req, res) => {
    const {id} = req.params

    const users = await readUsers()

    const index = users.findIndex(el => el.id === id)

    if (index === -1) {
        res.status(404).json({message: 'Not found'})
        return
    }

    users.splice(index, 1)

    await writeUser(users)

    res.status(200).json({message: 'delete is success'})
})

app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`)
})
