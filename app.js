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

// case "make-file":
app.makeFile = () => {
    rl.question("Masukan Nama Folder : ",(folder) => {
        rl.question("Masukan Nama File : ",(fileName) => {
            rl.question("Masukan Extensi File : ",(ext) => {
                try {
                    fs.writeFileSync(path.join(`${folder}/${fileName}.${ext}`), "");
                    console.log(`success created new file ${fileName}.${ext} in folder ${folder}`);
                } catch (error) {
                    console.log(`failed created new file ${fileName}.${ext} in folder ${folder}\nerror: ${error.message}`);
                } finally {
                    rl.close();
                }
            })
        })
    })
}

module.exports = app