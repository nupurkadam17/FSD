
const fs = require("fs");

// Create a file
fs.writeFileSync("sample.txt", "Hello Node.js!");

console.log("Reading File...");

// Read file asynchronously
fs.readFile("sample.txt", "utf8", function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("File Content:", data);
    }
});

console.log("Program Ended");
