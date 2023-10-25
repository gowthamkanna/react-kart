const Jimp = require('jimp');

module.exports = async(imagePath, width, height = Jimp.AUTO, quality)=>{
 await Promise.all(
     images.map(async imgPath => {
         const image = await Jimp.read(imagePath);
         await image.resize(width, height);
         await image.quality(quality);
         await image.writeAsync(imagePath);
     }));
};