import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { deletecartById } from "../../redux/Slice/customer.slice";

const CartProductList = ({ cartArray }) => {
    const[productDetails, setProductDetails] = useState([]);
    const userData = useSelector((state) => state.customer.customer);
    const userID = localStorage.getItem("userId");
    const dispatch = useDispatch();

// calculate product total price
    const ProductTotal = useMemo(() => {
        let productTotalAmount = 0;
        let productQuantity = 1;
      cartArray && cartArray.forEach((cartProduct) => {
        productQuantity = productDetails.filter((product) => (product.productID === cartProduct._id))
        if(productQuantity.length > 0){
        productTotalAmount = Number(productTotalAmount) + (Number(cartProduct.SalePrice) * Number(productQuantity[0].stock));
        }
        else {
            productTotalAmount = Number(productTotalAmount)+Number(cartProduct.SalePrice);
        }
      });
      return productTotalAmount;
    }, [cartArray, productDetails]);

    const handleQuantity = (stock, productID) => {
        let quantityWithId = {
            stock,
            productID
        };
        const isExists = productDetails.filter((item) => item.productID === productID);
        if(isExists.length > 0){
            const filteredArray = productDetails.filter((item) => item.productID !== productID)
            setProductDetails([...filteredArray, quantityWithId]);
        }
        else {
            setProductDetails([...productDetails, quantityWithId]);
        }
    }

    const handleQuantityOption = (stock, productID) => {
    let item = 1;
    let quantityObject = {};
    let quantityOptions = [];
    while(item <= stock){
        quantityObject = {
            ...quantityObject,
            value: item, 
            label: item
            }
            quantityOptions = [...quantityOptions, quantityObject];
            item = item+1;
        }
        return <Select defaultValue={{value: "1", label: "1"}} options={quantityOptions} onChange={(e) => handleQuantity(e.value, productID)} />
    }

    const handleDelete = (productID) => {
        dispatch(deletecartById({userID, productID})).then((res) => {
            if(res.payload.type === "success"){
                toast.success(res.payload.message);
            }
            else {
                toast.error(res.payload.message);
            }
        });
    }

  return (
    <div>
      {
        cartArray ? cartArray.map((product) => (
        <div key={product._id}>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-2">
              <img src={process.env.REACT_APP_PRODUCT_IMAGE_URL+"/"+product.ProductImages[0].filename} className="img-fluid kart-grid-image" alt={product.Name} />
            </div>
            <div className="col-md-10">
              <div className="card-body">
                <button className="btn btn-danger delete-cart float-end" onClick={() => handleDelete(product._id)}><i className="fa-solid fa-trash"></i></button>
                <h5 className="card-title">{product.Name}</h5>
                <p className="card-text">
                <i className="fa-solid fa-indian-rupee-sign">&nbsp;</i>{product.SalePrice}
                </p>
                <p className="card-text">
                  <small className="text-muted">{product.Description}</small>
                </p>
                <div>Quantity : 
                  {handleQuantityOption(Number(product.StockLeft), product._id)}
                  </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        )) 
        :
        (
          <span className="badge bg-danger pt-3 pb-3">
            No Items Found..
          </span>
        )
      }
      {
        cartArray.length > 0 ? 
        ( <>
            <hr />
            <div className="deliver-details">
              <h4>Delivery Details :</h4>
              <p>
                {userData.CustomerAddressOne && userData.CustomerAddressOne + ", "}
                {userData.CustomerAddressCity && userData.CustomerAddressCity + ", "}
                {userData.CustomerAddressState && userData.CustomerAddressState + ", "}
                {userData.CustomerPostal && userData.CustomerPostal+"."}
              </p>
            </div>
            <div className="col-12 text-end">
              <hr />
              <p>Total Price : {ProductTotal}</p>
              <hr />
            </div>
          </>) : (
            <div className="col-12 no-kart-products">
                <span className="badge bg-danger pt-3 pb-3">
                No Items Found in your cart..
              </span>
            </div>
            )
      }
    </div>
  );
};

export default CartProductList;
