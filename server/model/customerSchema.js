const mongoose =  require("mongoose");

const CustomerSchema = mongoose.Schema({
    CustomerName:{
        type: String,
        required: true
    },
    CustomerEmail:{
        type: String,
        required: true
    },
    CustomerPhone:{
        type: String,
        required: true
    },
    CustomerAddressOne:{
        type: String,
        required: true
    },
    CustomerAddressCity:{
        type: String,
        required: true
    },
    CustomerAddressState:{
        type: String,
        required: true
    },
    CustomerPostal:{
        type: Number,
        required: true
    },
    CustomerPassword:{
        type: String,
        required: true
    },
    WishlistedProducts:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
    AddToCart:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }]

}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);