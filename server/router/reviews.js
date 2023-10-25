const router = require("express").Router();
const Review = require("../model/reviewSchema");

// get all reviewSchema
router.get("/reviews", async(req, res) => {
    const data = await Review.find().populate({ path :'productId' }).sort([["createdAt", "desc"]])
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// submit review
router.post("/reviews", async(req, res)=> {
    try{
        const addReview = new Review({
            user : req.body.user,
            productId : req.body.productId,
            review : req.body.review,
            rating : req.body.rating,
        });
        var data = await addReview.save();
        res.status(200).send("Review Submitted Successfully.");
    }
    catch(err){
        res.status(400).json(err);
    };
    
});

module.exports = router;