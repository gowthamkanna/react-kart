const router = require("express").Router();
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {

    try{
        var emailExists = await User.findOne({email : req.body.email});
        if(emailExists){
            return res.status(400).json("Email Already Exists");
        }
        var hash = await bcrypt.hash(req.body.password, 10);
        const user = new User ({
            name : req.body.name,
            email : req.body.email,
            password : hash,
        });

        var data = await user.save();
        res.json(data);
    }
    catch(err) {
        res.status(400).json(err);
    }
});
// Login
router.post("/login", async(req, res) => {
    var userData = await User.findOne({email: req.body.email});
    if(!userData){
        return res.status(400).json("User not found");
    }

    var validatepwd = await bcrypt.compare(req.body.password, userData.password);
    if(!validatepwd){
        return res.status(400).json("Password incorrect");
    }
    var userToken = jwt.sign({email: userData.email}, "kartapp");
    res.header("authToken", userToken).json({
        email: userData.email,
        type: userData.type,
        token: userToken,
    });
})

// validate User Token
const validateToken = (req, res, next) => {
    var userToken = req.header("authToken");
    req.authToken = userToken;
    next();
}

// Get All Users

router.get("/getAll", validateToken, async (req, res) => {
    jwt.verify(req.authToken, "kartapp", async (err, data) => {
        if(err) {
            res.sendStatus(403);
        }
        else {
            const data = await User.find().select(['-password']);
            res.json(data);
        }
    });
})

module.exports = router;