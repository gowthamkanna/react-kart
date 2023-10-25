import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { customerLogout, getCustomerData } from "../../redux/Slice/customer.slice";
import "../assets/style.css";
import "../assets/responsive.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  const [name, setName] = useState("Guest");
  const [wishlistCount, setWishlistCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function userLoggedIn(){
    if(authToken === null){
      return <a href="/login">
    <i className="fa fa-user" aria-hidden="true"></i>
    <span>
      Login
    </span>
    </a>
    }
    else {
      return (
      <>
      <a href="/">
      <i className="fa fa-shopping-bag" aria-hidden="true"></i>&nbsp;
      {name}
      </a>
      <i className="fa-regular fa-heart position-relative">
        {wishlistCount > 0 ? 
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {wishlistCount}
            <span className="visually-hidden">Wishlist</span>
          </span>
          : null }
      </i>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={userLogout} className="btn nav_search-btn">
      <i className="fa fa-power-off" aria-hidden="true" ></i>
    </button>
      </> );
    }
  }

  function userLogout(){
    dispatch(customerLogout())
    .then((res) => {
      navigate("/");
    })
  }

  useEffect(() => {
    if(userId !== null){
    dispatch(getCustomerData(userId)).then((res) => {
      setName(res.payload.CustomerName);
      setWishlistCount(res.payload.wishlistCount);
    });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

    return (
        <>
    <div className="hero_area">
    <header className="header_section">
      <nav className="navbar navbar-expand-lg custom_nav-container ">
        <a className="navbar-brand" href="/">
          <span>
            -KART-
          </span>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className=""></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  ">
            <li className="nav-item">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shop">
                Shop
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="why.html">
                Why Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="testimonial.html">
                Testimonial
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="contact.html">Contact Us</a>
            </li>
          </ul>
          <div className="user_option">
            {userLoggedIn()}
          </div>
        </div>
      </nav>
    </header>

  </div>
        </>
    );
}