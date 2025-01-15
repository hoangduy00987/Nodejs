const EventEmitter = require('events');

// Tạo một instance của EventEmitter
const eventEmitter = new EventEmitter();

// Đăng ký một listener cho sự kiện 'sayHello'
eventEmitter.on('sayHello',() => {
  console.log('Hello, world!');
});
eventEmitter.once("onlyOnce",() => {
    console.log("just listen one time")
 });
// Kích hoạt sự kiện 'sayHello'
eventEmitter.emit('sayHello');

eventEmitter.removeListener("sayHello",callback);
eventEmitter.emit('sayHello');
eventEmitter.emit('onlyOnce'); // Output: This event will only run once.
eventEmitter.emit('onlyOnce'); // -> don't return message