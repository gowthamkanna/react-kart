import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  customerLogout,
  getCustomerData,
} from "../../redux/Slice/customer.slice";
import "../assets/style.css";
import "../assets/responsive.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";

export default function Header() {
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  // const [name, setName] = useState("Guest");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const wishlistArray = useSelector((state) => state.customer.wishlist);
  const cartArray = useSelector((state) => state.customer.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function userLoggedIn() {
    if (authToken === null) {
      return (
        <a href="/login">
          <i className="fa fa-user" aria-hidden="true"></i>
          <span>Login</span>
        </a>
      );
    } else {
      return (
        <>
          <Link to="/cart" className="add-to-cart-header">
            <i className="fa fa-shopping-bag" aria-hidden="true">
              {cartCount > 0 ? (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                  <span className="visually-hidden">Cart</span>
                </span>
              ) : null}
            </i>
            {/* &nbsp; */}
            {/* {name} */}
          </Link>
          <Link to="/wishlists">
            <i className="fa-regular fa-heart position-relative">
              {wishlistCount > 0 ? (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlistCount}
                  <span className="visually-hidden">Wishlist</span>
                </span>
              ) : null}
            </i>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={userLogout} className="btn nav_search-btn">
            <i className="fa fa-power-off" aria-hidden="true"></i>
          </button>
        </>
      );
    }
  }

  function userLogout() {
    swal({
      title: "Are you sure logout..?",
      text: "sure to logout your account",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: false,
      closeOnEsc: false,
      allowOutsideClick: false,
    }).then((willDelete) => {
      if (willDelete) {
        navigate("/");
        dispatch(customerLogout()).then((res) => {
          toast.success("User Logged out");
          // navigate("/");
        });
      }
    });
  }

  useEffect(() => {
    if (userId !== null) {
      dispatch(getCustomerData(userId)).then((res) => {
        // setName(res.payload.CustomerName);
        setWishlistCount(res.payload.WishlistedProducts.length);
        setCartCount(res.payload.AddToCart.length);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, wishlistArray, cartArray]);

  return (
    <>
      <div className="hero_area">
        <header className="header_section">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <a className="navbar-brand" href="/">
              <span>-KART-</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className=""></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav  ">
                <li className="nav-item">
                  <span className="nav-link" onClick={() => navigate("/")}>
                    Home <span className="sr-only">(current)</span>
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link cursor-pointer"
                    onClick={() => navigate("/shop")}
                  >
                    Shop
                  </span>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Testimonial
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Contact Us
                  </a>
                </li>
              </ul>
              <div className="user_option">{userLoggedIn()}</div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}
