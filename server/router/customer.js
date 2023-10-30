const router = require("express").Router();
const Customer = require("../model/customerSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/customers", async(req, res) => {
    try {
        const emailExists = await Customer.findOne({CustomerEmail: req.body.CustomerEmail});
        if(emailExists){
            return res.status(400).json("Email Already Exists");
        }
        var hash = await bcrypt.hash(req.body.CustomerPassword, 10);
        const customer = new Customer({
            CustomerName: req.body.CustomerName,
            CustomerEmail: req.body.CustomerEmail,
            CustomerPhone: req.body.CustomerPhone,
            CustomerAddressOne: req.body.CustomerAddressOne,
            CustomerAddressCity: req.body.CustomerAddressCity,
            CustomerAddressState: req.body.CustomerAddressState,
            CustomerPostal: req.body.CustomerPostal,
            CustomerPassword: hash,
        });
        var data = await customer.save();
        res.status(200).json(data);
    }
    catch(err) {
        res.status(400).json(err);
    }
});

// Login
router.post("/customer-login", async(req, res) => {
    var userData = await Customer.findOne({CustomerEmail: req.body.CustomerEmail});
    if(!userData){
        return res.status(400).json("User not found");
    }

    var validatepwd = await bcrypt.compare(req.body.CustomerPassword, userData.CustomerPassword);
    if(!validatepwd){
        return res.status(400).json("Password incorrect");
    }
    var userToken = jwt.sign({email: userData.CustomerEmail}, "kartapp");
    res.header("authToken", userToken).json({
        email: userData.CustomerEmail,
        type: "customer",
        token: userToken,
        id: userData._id,
    });
});

// get a specific product
router.get("/customers/:id", async (req, res) => {
    try{
    const data = await Customer.findById(req.params.id);
    // const wishlist = await Wishlist.find({userId : req.params.id});
    // const result = {...data._doc, wishlistCount : wishlist.length};
    res.json(data);
    }
    catch(err){
        res.status(400).json(err);
    }
});


module.exports = router;