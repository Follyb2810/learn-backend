const logEvent =require('./logEvent')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

//! initializes object

const myEmitter = new MyEmitter()

//add listeners for the events
myEmitter.on('log',(msg)=>logEvent(msg))

setTimeout(()=>{
    //! event emit
    myEmitter.emit('log','log event emitted')
},2000)