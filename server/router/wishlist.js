const router = require('express').Router();
const Customer = require('../model/customerSchema');
// insert user wishlist

router.post("/wishlists", async(req, res) => {
    try {
        // insert wishlist against customer
        const customerRecord = await Customer.findById(req.body.userID);
        const productExists =  await customerRecord.WishlistedProducts.find((product) => product==req.body.productID);
        if(productExists === undefined){
        var wishlistArray = [...customerRecord.WishlistedProducts, req.body.productID];
        await Customer.findByIdAndUpdate(req.body.userID, {
            WishlistedProducts: wishlistArray,
            }, {new: true})
        .then(data => {
            res.status(200).send({type: "success" ,message: "Product added to your wishlist..!", wishlist: data});
        })
        .catch(err => {
            res.status(400).json({type: "error" ,message: err});
        });
        }
        else {
            res.status(200).send({type: "success" ,message: "Product already in your wishlist..!"});
        }
    }
    catch(err){
        res.status(400).json(err);
    }
});

// get all wishlisted products by customer ID
router.get("/wishlists/:id", async(req, res)=> {
    try{
        const wishlistedProducts = await Customer.findById(req.params.id).populate({path : 'WishlistedProducts'});
        res.json(wishlistedProducts.WishlistedProducts);
    }
    catch(err){
        res.json(err.message);
    }
});

// delete wishlisted products from customer record
router.post("/remove-wishlisted", async(req, res) => {
    try{
        const wishlistedProducts = await Customer.findById(req.body.userID);
        // const removeIndex = wishlistedProducts.findIndex(req.body.productID);
        wishlistedProductsResult = [...wishlistedProducts.WishlistedProducts];
        updatedWishlistedProduct = wishlistedProductsResult.filter((item) => (item.toString() !== req.body.productID));
        await Customer.findByIdAndUpdate(req.body.userID, {
            WishlistedProducts: updatedWishlistedProduct,
            }, {new: true})
        .then(data => {
            res.status(200).send({type: "success" ,message: "Product removed to your wishlist..!", wishlist: updatedWishlistedProduct});
        })
        .catch(err => {
            res.status(400).json({type: "error" ,message: err.message});
        });
    }
    catch(err){
        res.status(400).json({type: "error" ,message: err.message});
    }  
});

module.exports = router;