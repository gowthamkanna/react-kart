import React, { useEffect, useState } from 'react'
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import { Carousel } from 'react-responsive-carousel';
import { getProductsById } from '../redux/Slice/product.slice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
  // const {currentProduct} = useSelector((state) => state.product);
  const [currentProduct, setCurrentProduct] = useState({});
  const dispatch = useDispatch();
  // const location = useLocation();
  // const productID = location.state ? location.state.ProductID : 0;
  const {productID} = useParams();
  const ProductSliderConfiguration = () => ({
    showArrows: true,
    showStatus: false,
    showIndicators: false,
    infiniteLoop: true,
    showThumbs: false,
    useKeyboardArrows: false,
    autoPlay: true,
    stopOnHover: true,
    swipeable: true,
    // dynamicHeight: true,
    emulateTouch: false,
    autoFocus: false,
    interval: 3000,
  });


  const getOverallRating = (ratings) => {  
    const STAR_COUNT = 5;
    const stars = Array.from({length: STAR_COUNT}, () => <i className="fa-regular fa-star"></i>);
    for (var j = 0; j < ratings; j++) { // this will loop Math.floor(avgRating) times
      stars[j] = <i className="fa-solid fa-star"></i>;
    }

    if (ratings % 1 !== 0){ // if avgRating is a decimal, add a half star
      stars[j-1] = <i className="fa-solid fa-star-half-stroke"></i>;
    }
    return <div className="rating text-center">{stars}</div>;

    }

  useEffect(() => {
    dispatch(getProductsById(productID)).then(res => {
      setCurrentProduct(res.payload);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <Header />
        <div className='container mt-5 mb-5'>
        <div className='row'>
        { (productID !== 0) ? (
          <>
           <div className='col-md-6 col-sm-12 d-flex'>
          <Carousel {...ProductSliderConfiguration()} >
            {
              (currentProduct.ProductImages) ? (currentProduct.ProductImages.map((image) => (
               <div key={image._id}>
                 <img src={process.env.REACT_APP_PRODUCT_IMAGE_URL+'/'+image.filename} alt={image.originalname} />
               </div>
               ))): ''
            }
          </Carousel>
          </div>
          <div className='col-md-6 col-sm-12'>
            <h1>{currentProduct.Name}</h1>
            <p className="badge bg-success product-price"><span className='strikked-text product-original-price'>{currentProduct.OriginalPrice}</span><i className="fa-solid fa-indian-rupee-sign"></i> {currentProduct.SalePrice}</p>
            <hr />
            {(currentProduct.StockLeft <= 5 && currentProduct.StockLeft > 0) ? (<p className="badge bg-success product-stock"> only {currentProduct.StockLeft} left ..</p>) : null }
            <p className="product-description">{currentProduct.Description}</p>
          </div>

          <div className='col-md-12 col-sm-12 mt-4'>
            <h2>Customer Reviews</h2>
            {
              currentProduct.Reviews ? currentProduct.Reviews.map((review, index) => (
                <div className="card mb-2">
                  <div className="card-body">
                    <div className='row'>
                      <div className='col-md-6 col-sm-12'>
                        <h4 className='rating-name'>{review.user}</h4>
                        <p className='rating-content'>"{review.review}"</p>
                      </div>
                      <div className='col-md-6 col-sm-12'>
                        <div className='float-end product-detail-rating'>{getOverallRating(review.rating)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                )) : "No Reviews found."
            }
          </div>
          </>
          ): (<div className='badge bg-danger pb-3 pt-3'>Product Not Found.</div>) }
        </div>
        
        </div>
      <Footer />
    </>
  )
}

export default ProductDetail