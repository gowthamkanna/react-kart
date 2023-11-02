const router = require("express").Router();
const Product = require("../model/ProductSchema");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const deleteFileMiddleware = require("../middlewares/deleteFilesMiddleware");
// const { route } = require("./reviews");


// Add Product
router.route("/products").post(uploadMiddleware, async (req, res) => {
    try{
    const addProduct = new Product({
        Name: req.body.Name,
        OriginalPrice: req.body.OriginalPrice,
        SalePrice: req.body.SalePrice,
        StockLeft: req.body.StockLeft,
        Description: req.body.Description,
        ProductImages: req.files,
        ProductCategory: req.body.ProductCategory,
    });

    var data = await addProduct.save();
    res.status(200).send({type: "success" ,message: "Product created successfully!", product: data});
    }
    catch(err) {
        res.status(400).json(err);
    }
});

// get a specific product
router.get("/products/:id", async (req, res) => {
    try{
    const data = await Product.findById(req.params.id);
    res.json(data);
    }
    catch(err){
        res.status(400).json(err);
    }
});


// get all products
router.get("/products", async (req, res) => {
    const data = await Product.find().populate({ path :"ProductCategory", select: 'name' }).sort([["createdAt", "desc"]])
    .then(data => {
        res.json(data);
    })
    .catch(err =>{
        res.status(400).json(err);
    });
});

// Update Product
router.put("/products/:id", uploadMiddleware, async(req, res) => {
    // console.log(req.body);
    Product.findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        OriginalPrice: req.body.OriginalPrice,
        SalePrice: req.body.SalePrice,
        StockLeft: req.body.StockLeft,
        Description: req.body.Description,
        ProductImages: req.files,
        ProductCategory: req.body.ProductCategory,
        Reviews: null,
        }, {new: true})
    .then(data => {
        res.status(200).send({type: "success" ,message: "Product updated successfully!"});
    })
    .catch(err => {
        res.status(400).json({type: "error" ,message: err});
    });
});

// delete Product

router.delete("/products/:id", deleteFileMiddleware, async (req, res) => {
    Product.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send({type: "success", message: "Product deleted successfully!"});
    })
    .catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                type: "error", message: "Product not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            type: "error", message: "Could not delete Product with id " + req.params.noteId
        });
    })
});

router.put("/insert-rating/:ProductId", async(req, res) => {
         try{
        const data = await Product.findById(req.params.ProductId);
        var ratingArray = [...data.Reviews, req.body];
        // res.json(data.Reviews);
        Product.findByIdAndUpdate(req.params.ProductId, {
            Reviews: ratingArray,
            }, {new: true})
        .then(data => {
            res.status(200).send({type: "success" ,message: "Review Submitted!"});
        })
        .catch(err => {
            res.status(400).json({type: "error" ,message: err});
        });
        }
        catch(err){
            res.status(400).json(err);
        }
})  

// get latest products with rating average
router.get("/latest-products", async(req, res) => {
    const data = await Product.find().limit(4)
    .populate({ path :"ProductCategory", select: 'name' })
    .sort([["createdAt", "desc"]])
    .then(async(data) => {
        // let ratingData = await Reviews.aggregate([{$group: {_id:"$productId", sum_val:{$sum:"$rating"}}}]);
        res.json(data);
    })
    .catch(err =>{
        res.status(400).json(err);
    });
});


module.exports = router;