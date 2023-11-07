import React from 'react'
import { useSelector } from 'react-redux';
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import CartProductList from './CartProductList';
// import { getCartById } from '../../redux/Slice/customer.slice';
// import CartTotal from './CartTotal';

const Cart = () => {
  const cartArray = useSelector((state) => state.customer.customer.AddToCart);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getCartById());
  // }, [dispatch])
  return (
    <div>
      <Header /> 
      <>
      <section className="shop_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Cart</h2>
          </div>
        <div className='row'>
          <>
          { cartArray && <CartProductList cartArray={cartArray}/> }
          {/* {cartArray ? (cartArray.map((product) => (
              <CartProductList key={product._id} product={product}/>
            ))
            )
            :
            (
              <span className="badge bg-danger pt-3 pb-3">
                No Items Found..
              </span>
            )
            }
            {
              cartArray && <CartTotal cartArray={cartArray} />
            } */}
          </>
        </div>  
      </div>
      </section> 
      </>   
      <Footer />
    </div>
  )
}

export default Cart