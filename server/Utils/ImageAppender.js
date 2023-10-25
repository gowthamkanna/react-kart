const Jimp = require('jimp');
const base64ToPngConvertor = require('../Utils/Base64ToPng');
const fs = require('fs');

module.exports = async (src, image, x, y, width, height) => {
    try {
        let imagePath = base64ToPngConvertor(image);
        console.log(imagePath);
        let overlayImage = await Jimp.read(imagePath);
        let resizedImage = await overlayImage.resize(Number(width), Number(height));
        let sourcePath = "."+src;
        const srcImage = await Jimp.read(sourcePath);
        srcImage.composite(overlayImage, Number(x), Number(y));
        await srcImage.writeAsync(sourcePath);
       // fs.unlinkSync(imagePath);
        return {src:src,imagePath:imagePath};
    }catch (e) {
        console.error('error - '+e.message);
    }
}