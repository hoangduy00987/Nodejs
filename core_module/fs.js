const fs = require('fs');
fs.readFile('input.txt', 'utf-8', (err,data) => {
    console.log(data)

})

let string = "Hello world!";
fs.writeFile('output.txt', string, 'utf-8', (err) => {
    console.log("ghi file thanh cong");
});