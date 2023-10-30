import React, { useEffect, useState } from 'react'
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import { getCustomerWishlistedProducts } from '../redux/Slice/customer.slice';
import { useDispatch, useSelector } from 'react-redux';
import WishlistProducts from './WishlistProducts';

const Wishlists = () => {
    const[wishlistItems, setWishlistItems] = useState([]);
    const userID = localStorage.getItem("userId");
    // const {wishlist} = useSelector((state) => state.customer);
    const dispath = useDispatch();

    useEffect(() => {
        dispath(getCustomerWishlistedProducts(userID)).then((res) => {
            setWishlistItems(res.payload);
        });
    }, [dispath])
  return (
    <>
    <Header />
    <div className='container'>
        <div className='row'>
            {
                (wishlistItems.length > 0 ) ? 
                wishlistItems.map((item) => (
                    <WishlistProducts key={item._id} item={item} />
                )) : <li>No Items Found..</li>
            }
            
        </div>
    </div>
    
    <Footer />
    </>
  )
}

export default Wishlists;