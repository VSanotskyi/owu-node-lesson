const fn = async () => {
    try {
        console.log(process.cwd())
    } catch (e) {
        console.log(e)
    }
}

void fn()