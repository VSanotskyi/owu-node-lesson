const EventEmitter = require('node:events')

const fn = async () => {
    try {
        const myEmitter = new EventEmitter()

        myEmitter.on('www', (...args) => {
            console.log('an event occurred!', args)
        })

        myEmitter.emit('www', 123, 234)
    } catch (e) {
        console.log(e)
    }
}

void fn()