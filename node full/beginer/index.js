// const os =require("os");
// const path=require('path')
// console.log(os.version())
// console.log(os.homedir())
// console.log(os.type())
// console.log(__dirname)
// console.log(__filename)
// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))
// console.log(path.parse(__filename))

const {add,sub,multiply,divide}=require("./math")
console.log(add(2,3))
console.log(sub(2,3))
console.log(multiply(2,3))
console.log(divide(2,3))