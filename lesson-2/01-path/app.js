const path = require('node:path')

const fn = async () => {
    try {
        console.log(path.basename(__filename));
        console.log(path.dirname(__filename))
        console.log(path.extname(__filename))
        console.log(path.parse(__filename))
        console.log(path.parse(__filename).name)
        console.log(path.join(__dirname, 'www', 'helper.js'))
        console.log(path.normalize('///lesson-1//www//helper.js'))
    } catch (e) {
        console.log(e)
    }
}

void fn()