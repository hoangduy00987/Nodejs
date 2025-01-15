const EventEmitter = require('events');
class CustomEmitter extends EventEmitter {}

const myEmitter = new CustomEmitter();

myEmitter.on('greet', () => {
    console.log("Hello from CustomEmitter!");
});

myEmitter.emit('greet');