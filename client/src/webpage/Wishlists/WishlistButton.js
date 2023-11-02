import React from "react";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../redux/Slice/customer.slice";
import { toast } from "react-toastify";

const WishlistButton = ({ productID, wishlistedProducts }) => {
  const dispatch = useDispatch();

  const addToWishlistButton = (product = []) => {
    if (wishlistedProducts) {
      var isPresent = wishlistedProducts.some(function (item) {
        return item._id === product;
      });
      return !isPresent ? (
        <button
          onClick={() => addProductToWishlist(product)}
          className="btn btn-info buy_now_btn"
        >
          <i className="fa-regular fa-heart"></i>
        </button>
      ) : (
        <button
          onClick={() => addProductToWishlist(product)}
          className="btn btn-info buy_now_btn"
        >
          <i className="fa-solid fa-heart"></i>
        </button>
      );
    }
  };

  const addProductToWishlist = (productID) => {
    const userID = localStorage.getItem("userId");
    dispatch(addToWishlist({ userID, productID }))
      .then((res) => {
        toast.success(res.payload.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
    return;
  };

  return <>{addToWishlistButton(productID)}</>;
};

export default WishlistButton;
