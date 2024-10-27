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

// case "ext-sorter":
app.extSorter = () => {
    try {
        const res = fs.readdirSync("unorganize_folder");

        const rename = (folderName, element) => {
            fs.mkdir(__dirname + `/${folderName}`,() => {
                fs.rename(
                    __dirname + "/unorganize_folder"+ "/" + element,
                    __dirname + `/${folderName}`+ "/" + element,
                    (err) => {}
                );
            });
        };

        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            const ext = element.split(".")[element.split(".").length - 1];
            if (["txt", "pdf", "md", "json", "csv", "html"].includes(ext)) {
                rename("text", element);
            } else if (["jpg", "png", "jpeg", "gif", "svg", "webp", "bmp"].includes(ext)) {
                rename("image", element);
            } else {
                rename("other", element);
            }
        }
         console.log("success sort file");
    } catch (error) {
        console.log("failed sort file" + error.message);
    } finally {
        rl.close();
    }
}

// case "read-folder":
app.readFolder = () => {
    rl.question("Masukan Nama Folder untuk dibaca: ",(folderName) => {
        const res = fs.readdirSync(folderName);

        const output = [];

        const imageExt = ["jpg", "png", "jpeg", "gif", "svg", "webp", "bmp"];
        const textExt = ["txt", "pdf", "md", "json", "csv", "html"];
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            try {
                const stat = fs.statSync(__dirname + `/${folderName}` + "/" + element);
                const ext = element.split(".")[element.split(".").length - 1];

                let jenisFile = "undefined";
                if(stat.isDirectory()) {
                    jenisFile = "folder";
                } else if (imageExt.includes(ext)) {
                    jenisFile = "gambar";
                } else if (textExt.includes(ext)) {
                    jenisFile = "text";
                }

                let ukuranFile = "";
                if(stat.size > 1024576) {
                    ukuranFile = `${(stat.size / 1048576).toFixed(2)}mb`;
                } else {
                    ukuranFile = `${(stat.size / 1024).toFixed(2)}kb`;
                }

                output.push({
                    namaFile : element,
                    extensi : ext,
                    jenisFile : jenisFile,
                    tanggalDibuat : stat.birthtime.toISOString().split("T")[0],
                    ukuranFile : ukuranFile,
                })

            } catch (err) {
                console.log("Unsuccess read file : " + folderName + "/" + folderName, element);
                }
            }
            console.log(output);
            rl.close()
        })
};

module.exports = app