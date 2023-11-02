import React, { useEffect, useState } from "react";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import { getCustomerWishlistedProducts } from "../../redux/Slice/customer.slice";
import { useDispatch, useSelector } from "react-redux";
import WishlistProducts from "./WishlistProducts";

const Wishlists = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const wishlistArray = useSelector((state) => state.customer.wishlist);
  const userID = localStorage.getItem("userId");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerWishlistedProducts(userID)).then((res) => {
      setWishlistItems(res.payload);
    });
  }, [dispatch, wishlistArray, userID]);

  return (
    <>
      <Header />
      <section className="shop_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Wishlist</h2>
          </div>
          <div className="row">
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <WishlistProducts key={item._id} item={item} />
              ))
            ) : (
              <span className="badge bg-danger pt-3 pb-3">
                No Items Found..
              </span>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Wishlists;
