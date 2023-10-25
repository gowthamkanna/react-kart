const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    Name : {
        type:String,
        required: true,
    },
    OriginalPrice : {
        type: String,
        require: true,
    },
    SalePrice : {
        type: String,
        require: true,
    },
    StockLeft : {
        type: String,
        required: true,
    },
    Description : {
        type: String,
        required: true,
    },
    ProductImages : {
        type: Array,
        // required: true,
    },
    ProductCategory : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        // required: true,
    },
    Reviews : {
        type: Array,
        // required: true,
    }
},{ timestamps: true });


module.exports = mongoose.model("Product", ProductSchema);