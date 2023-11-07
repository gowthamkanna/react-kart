import React from "react";
import { useSelector } from "react-redux";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import CartProductList from "./CartProductList";

const Cart = () => {
  const cartArray = useSelector((state) => state.customer.customer.AddToCart);
  return (
    <div>
      <Header />
      <>
        <section className="shop_section layout_padding">
          <div className="container">
            <div className="heading_container heading_center">
              <h2>Cart</h2>
            </div>
            <div className="row">
              <>{cartArray && <CartProductList cartArray={cartArray} />}</>
            </div>
          </div>
        </section>
      </>
      <Footer />
    </div>
  );
};

export default Cart;
