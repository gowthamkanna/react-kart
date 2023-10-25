const mime = require('mime');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const status = require('./NestHTTPStatusCodes');
const SHA256 = require('crypto-js/sha256');
const ImageDetails = require('./ImageDetails');
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));


const uploadImage = async (req, res, next) => {

    let imageBuffer = Buffer.from(req.body.base64image, 'base64');
    let fileName = "file-" + new Date().getMilliseconds() + ".jpg";
    try {
        let dir = "./NestImages/";

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        let path = dir + SHA256(fileName + Date.now()) + ".jpg";
        let path_1 = dir + SHA256(fileName + Date.now() + Math.floor(Math.random*10)) + ".jpg"

        req['NestFilePath'] = path.substr(1);
        fs.writeFile(path, imageBuffer, (err) => {
            if (!err)
                console.log("file was created successfully");
        });
        fs.writeFileSync(path, imageBuffer, 'utf8');
        fs.writeFileSync(path_1, imageBuffer, 'utf8');
        console.log("path_0 : "+path);
        console.log("path_1 : "+path_1)
        await new ImageDetails().shapeFinder(req, path)
            .then(r => {
                console.table({r})
                req['imageData'] = r;
                req['originalPath'] = path_1;
            })
            .catch(e =>
                console.error(e)
            );
        next();
    } catch (e) {
        console.log(e)
        res.status(status.BAD_REQUEST).send({status: false, message: e.message});
    }
}

module.exports = uploadImage;
