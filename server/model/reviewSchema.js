const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    review: {
        type: String,
    },
    rating: {
        type: Number,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model('Reviews', reviewSchema);