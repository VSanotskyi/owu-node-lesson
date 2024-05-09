// console.log(__filename);
// console.log(__dirname);
// console.log(process.cwd());

const fn = () => {
    console.log('Hello from helper.js')
    console.log(__filename)
    console.log(__dirname)
    console.log(process.cwd())
}

module.exports = {
    fn
}