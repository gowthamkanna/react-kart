import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const CartTotal = ({ cartArray }) => {
  const userData = useSelector((state) => state.customer.customer);

  const ProductTotal = useMemo(() => {
    let productTotal = 0;
    cartArray.forEach((price) => {
      productTotal = Number(productTotal) + Number(price.SalePrice);
    });
    return productTotal;
  }, [totalPrice, quantity, cartArray]);

  return (
    <>
      <hr />
      <div className="deliver-details">
        <h4>Delivery Details :</h4>
        <p>
          {userData.CustomerAddressOne && userData.CustomerAddressOne + ", "}
          {userData.CustomerAddressCity && userData.CustomerAddressCity + ", "}
          {userData.CustomerAddressState && userData.CustomerAddressState + ", "}
          {userData.CustomerPostal && userData.CustomerPostal}
        </p>
      </div>
      <div className="col-12 text-end">
        <hr />
        <p>Total Price : {ProductTotal}</p>
      </div>
    </>
  );
};

export default CartTotal;
