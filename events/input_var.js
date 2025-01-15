const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("addNumber", (a,b) => {
    console.log(`Sum: ${a + b}`);
})
emitter.emit('addNumber', 5,7);