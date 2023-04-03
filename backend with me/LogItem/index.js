const logEvent =require('./logEvent')
const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

//! initialize of obect
const myEmitter = new MyEmitter()

//! listeming to log events
myEmitter.on('logs',(msg)=>logEvent(msg))

setTimeout(()=>{
    myEmitter.emit('logs','log event emmitt')
},2000)