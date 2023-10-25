const fs = require('fs');
const Product = require("../model/ProductSchema");
// const path = require('path');

// Custom file delete middleware
const deleteFileMiddleware = async (req, res, next) => {
    try{
        const data = await Product.findById(req.params.id);
        imageToRemove = data.ProductImages ? data.ProductImages : null;
        console.log(imageToRemove);
    }
    catch(err){
        res.status(400).json({type: "error", message: "No Records Found"});
    }

    
    if(imageToRemove !== null){
  
      imageToRemove.forEach((file) => {
        fs.unlinkSync(file.path);
        
      });
    }
    // Attach files to the request object
    req.files = imageToRemove;
    // Proceed to the next middleware or route handler
    next();
};

module.exports = deleteFileMiddleware;