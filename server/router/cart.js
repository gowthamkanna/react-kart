const router = require("express").Router();
const Customer = require("../model/customerSchema");

router.post("/add-to-cart", async (req, res) => {
  try {
    const customerRecord = await Customer.findById(req.body.userID);
    const productExists = await customerRecord.AddToCart.find(
      (product) => product == req.body.productID
    );
    if (productExists === undefined) {
      var cartArray = [...customerRecord.AddToCart, req.body.productID];
      await Customer.findByIdAndUpdate(
        req.body.userID,
        {
          AddToCart: cartArray,
        },
        { new: true }
      )
        .then((data) => {
          res
            .status(200)
            .send({
              type: "success",
              message: "Product added to your cart..!",
              cart: cartArray,
            });
        })
        .catch((err) => {
          res.status(400).json({ type: "error", message: err });
        });
    } else {
      res
        .status(200)
        .send({ type: "success", message: "Product already in your cart..!" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// get all wishlisted products by customer ID
router.get("/cart/:id", async (req, res) => {
  try {
    const cartProducts = await Customer.findById(req.params.id).populate({
      path: "AddToCart",
    });
    res.json(cartProducts.AddToCart);
  } catch (err) {
    res.json(err.message);
  }
});

// delete wishlisted products from customer record
router.post("/remove-cart", async (req, res) => {
  try {
    const cartProducts = await Customer.findById(req.body.userID);
    // const removeIndex = wishlistedProducts.findIndex(req.body.productID);
    cartProductsResult = [...cartProducts.AddToCart];
    updatedCartProduct = cartProductsResult.filter(
      (item) => item.toString() !== req.body.productID
    );
    await Customer.findByIdAndUpdate(
      req.body.userID,
      {
        AddToCart: updatedCartProduct,
      },
      { new: true }
    )
      .then((data) => {
        res
          .status(200)
          .send({
            type: "success",
            message: "Product removed to your cart..!",
            cart: data.AddToCart,
          });
      })
      .catch((err) => {
        res.status(400).json({ type: "error", message: err.message });
      });
  } catch (err) {
    res.status(400).json({ type: "error", message: err.message });
  }
});

module.exports = router;
