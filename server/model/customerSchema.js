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
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);