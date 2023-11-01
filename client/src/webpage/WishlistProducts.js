import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeWishlist } from '../redux/Slice/customer.slice';

const WishlistProducts = ({item}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeWishlisted = (productID) => {
    const userID = localStorage.getItem("userId");
    if(userID != null){
      dispatch(removeWishlist({ userID, productID })).then(res => {
          toast.success("Item remove from your wishlist.");
      })
      .catch(err => {
          toast.error(err.message);
      });

    }
    else {
      navigate("/login");
    }
  }


  return (
    <>
        <div className='col-sm-12 col-md-6 col-lg-6'>
            <div className="list-group">
            {
                    <div className="list-group-item" key={item._id}>
                        <>
                        <div className="image-parent">
                            <img src={process.env.REACT_APP_PRODUCT_IMAGE_URL+'/'+item.ProductImages[0]['filename']} className="img-small" alt="quixote" />
                         </div>
                        <div className='list-text'>
                            <h4>{item.Name}</h4>
                            <p><i className="fa-solid fa-indian-rupee-sign"></i> {item.SalePrice}</p>
                            <p>{item.Description.substring(0, 100)}...</p>
                            <button onClick={()=> removeWishlisted(item._id) } className='btn btn-danger'><i className="fa-solid fa-trash"></i> Remove</button>
                        </div>
                        </>
                    </div>
            }
            </div>
            </div>
    </>
  )
}

export default WishlistProducts