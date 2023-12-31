import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
// import { addToWishlist } from "../redux/Slice/customer.slice";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import WishlistButton from "../Wishlists/WishlistButton";
import { addToCart } from "../../redux/Slice/customer.slice";
import { toast } from "react-toastify";

const ProductList = ({ product }) => {
  var wishlistedProducts = [];
  const userID = localStorage.getItem("userId");
  const dispatch = useDispatch();
  wishlistedProducts = useSelector(
    (state) => state.customer.customer.WishlistedProducts
  );
  // const cartProducts = useSelector(getCartProductsById());
  // console.log(cartProducts);
  // const dispatch = useDispatch();

  const handleAddToCart = (productID) => {
    dispatch(addToCart({ userID, productID })).then((res) => {
      if (res.payload.type === "success") {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
    });
  };

  const ProductSliderConfiguration = () => ({
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    infiniteLoop: true,
    showThumbs: false,
    useKeyboardArrows: false,
    autoPlay: true,
    stopOnHover: true,
    swipeable: true,
    // dynamicHeight: true,
    emulateTouch: false,
    autoFocus: false,
    interval: 3000,
  });

  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="box">
        <div className="img-box">
          <Carousel {...ProductSliderConfiguration()}>
            {product.ProductImages.map((image) => (
              <ProductImages key={image._id} image={image} />
            ))}
          </Carousel>
        </div>
        <div className="detail-box">
          <Link to={`/product-details/${product._id}`}>
            <h6 className="cursor-pointer">{product.Name}</h6>
          </Link>
          <h6>
            <i className="fa-solid fa-indian-rupee-sign"> </i>&nbsp;
            <span>{product.SalePrice}</span>
          </h6>
        </div>
        <div className="text-center mt-2 mb-2">
          <button
            className="btn btn-info buy_now_btn"
            onClick={() => handleAddToCart(product._id)}
          >
            <i className="fa fa-shopping-cart"></i>
          </button>
          &nbsp;
          <button className="btn btn-info buy_now_btn">Buy Now</button>
          &nbsp;
          <WishlistButton
            key={product._id}
            productID={product._id}
            wishlistedProducts={wishlistedProducts}
          />
        </div>
      </div>
    </div>
  );
};

export const ProductImages = ({ image }) => {
  return (
    <>
      <div>
        <img
          src={process.env.REACT_APP_PRODUCT_IMAGE_URL + "/" + image.filename}
          alt={image.originalname}
        />
      </div>
    </>
  );
};

export default ProductList;
