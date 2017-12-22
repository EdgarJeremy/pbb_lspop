/**
 * File Utils
 */
const fs = require("fs");
const path = require("path");


const File = {
    deleteUploaded: (files) => {
        console.log(__dirname);
        for (let file in files) {
            if (file) {
                fs.unlink(path.resolve(__dirname,"..",files[file][0].destination,files[file][0].filename),function(err){
                    console.log(err);
                });
            }
        }
    },
    deleteOldFile: (filename) => {
        fs.unlink(path.resolve(__dirname,"...","assets/uploads",filename),function(err){
            console.log(err);
        });
    }
}

module.exports = File;