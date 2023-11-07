const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./router/user");
const categoryRouter = require("./router/category")
const productRouter = require("./router/product");
const reviewRouter = require("./router/reviews");
const customerRouter = require("./router/customer");
const wishlistRouter = require("./router/wishlist");
const addTocartRouter = require("./router/cart");
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use("/api", userRouter, categoryRouter, productRouter, reviewRouter, customerRouter, wishlistRouter, addTocartRouter);

app.use('/images', express.static('Product_Images'));

app.listen(5000, () => {
    console.log('Connected Successfully');
});

mongoose.connect('mongodb://0.0.0.0:27017/kart', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("DB Connected."))
.catch(err => console.log(`DB Connection Error: ${err}`));