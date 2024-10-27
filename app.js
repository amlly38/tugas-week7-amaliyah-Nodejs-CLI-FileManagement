const fs = require("node:fs")
const { type } = require("node:os");
const path = require("node:path")
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {}

// contoh script pembuatan folder
 app.makeFolder = () => {
    rl.question("Masukan Nama Folder : ",(folderName) => {
        try {
            fs.mkdir(__dirname + `/${folderName}`,() => {
            console.log("success created new folder " + folderName);
            });
        } catch (error) {
            console.log("failed created new folder " + folderName);
        } finally {
            rl.close();
        }  
    });
} 

// To Do : lanjutkan pembuatan logic disini 



module.exports = app