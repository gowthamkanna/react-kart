const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    productId : {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Wishlist", wishlistSchema);