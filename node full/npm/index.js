const {format} =require('date-fns')
// const uuid = require('uuid') //! with uuid
const {v4:uuid} = require('uuid') //! with uuid obj
let date=format(new Date (),'yyyyMMdd\tHH:mm:ss')
// console.log(uuid.v4()) //! with uuid
console.log(uuid()) //! //! with uuid
console.log(date)