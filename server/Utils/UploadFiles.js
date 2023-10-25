const multer = require("multer");
const path = require("path");

class UploadFiles{

    uploadFile(filename, destination){
        console.log(filename);
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, destination)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname))
            }
        })
        this.uploadIcons = multer({storage: this.storage}).single(filename);
        return this.uploadIcons;
    }

}

module.exports = UploadFiles;