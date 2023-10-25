import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { getLatestProducts } from "../redux/Slice/product.slice";
import Slider_1 from "./assets/slider/slider_1.jpeg";
import Slider_2 from "./assets/slider/slider_2.jpeg";
import Slider_3 from "./assets/slider/slider_3.jpeg";
import Savings from "./assets/temp_img/saving-img.png";

export default function Home () {

    const [latest, setLatest] = useState([]);
    // const {latestProducts} = useSelector((state) => state.product); 
    const dispatch = useDispatch();
    
    const sliderConfiguration = () => ({
        showArrows: true,
        showStatus: false,
        showIndicators: true,
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

    const ProductSliderConfiguration = () => ({
      showArrows: false,
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
    var overallRating = 0;
    for(var i=0; i < ratings.length; i++){
      overallRating += ratings[i].rating;
    }
    var avgRating = overallRating/ratings.length;
    
    const STAR_COUNT = 5;
    const stars = Array.from({length: STAR_COUNT}, () => <i className="fa-regular fa-star"></i>);
    for (var j = 0; j < avgRating; j++) { // this will loop Math.floor(avgRating) times
      stars[j] = <i className="fa-solid fa-star"></i>;
    }

    if (avgRating % 1 !== 0){ // if avgRating is a decimal, add a half star
      stars[j-1] = <i className="fa-solid fa-star-half-stroke"></i>;
    }
    return <div className="rating text-center">{stars} ({ratings.length})</div>;

    }

    useEffect(() => {
      dispatch(getLatestProducts()).then((res) => {
            setLatest(res.payload);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <Header />
                <Carousel {...sliderConfiguration()} >
                        <div>
                            <img src={Slider_1} alt="slider 1" />
                        </div>
                        <div>
                            <img src={Slider_2} alt="slider 2" />
                        </div>
                        <div>
                            <img src={Slider_3} alt="slider 3" />
                        </div>
                </Carousel>
            {/* Latest Products */}
                <section className="shop_section layout_padding">
                <div className="container">
                  <div className="heading_container heading_center">
                    <h2>
                      Latest Products
                    </h2>
                  </div>
                  <div className="row">
                    {  latest ? latest.map((product) => (
                        <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
                              <div className="box">
                                  <div className="img-box">
                                    <Carousel {...ProductSliderConfiguration()} >
                                     {
                                       product.ProductImages.map((image) => (
                                        <div key={image._id}>
                                          <img src={process.env.REACT_APP_PRODUCT_IMAGE_URL+'/'+image.filename} alt={image.originalname} />
                                        </div>
                                        ))
                                     }
                                     </Carousel>
                                  </div>
                                  <div className="ration-box">
                                    {getOverallRating(product.Reviews)}
                                  </div>
                                  <div className="detail-box">
                                    <h6>
                                    {product.Name}
                                    </h6>
                                    <h6>
                                        Price :
                                      <span>
                                      {product.SalePrice}
                                      </span>
                                    </h6>
                                  </div>
                                  <div className="new">
                                    <span>
                                      New
                                    </span>
                                  </div>
                              </div>
                          </div>
                       )) : null 
                       }
                  </div>
                  <div className="btn-box">
                    <a href="/shop">
                      View All Products
                    </a>
                  </div>
                </div>
                </section>

        {/* New Arrivals */}

        <section className="saving_section ">
            <div className="box">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="img-box">
                      <img src={Savings} alt="Product" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="detail-box">
                      <div className="heading_container">
                        <h2>
                          Best Savings on <br/>
                          new arrivals
                        </h2>
                      </div>
                      <p>
                        Qui ex dolore at repellat, quia neque doloribus omnis adipisci, ipsum eos odio fugit ut eveniet blanditiis praesentium totam non nostrum dignissimos nihil eius facere et eaque. Qui, animi obcaecati.
                      </p>
                      <div className="btn-box">
                        <a href="/" className="btn1">
                          Buy Now
                        </a>
                        <a href="/" className="btn2">
                          See More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* Why Shop us */}

        <section className="why_section layout_padding">
           <div className="container">
             <div className="heading_container heading_center">
               <h2>
                 Why Shop With Us
               </h2>
             </div>
             <div className="row">
               <div className="col-md-4">
                 <div className="box ">
                   <div className="img-box">
                   <i className="fa fa-truck" aria-hidden="true"></i>
                   </div>
                   <div className="detail-box">
                     <h5>
                       Fast Delivery
                     </h5>
                     <p>
                       variations of passages of Lorem Ipsum available
                     </p>
                   </div>
                 </div>
               </div>
               <div className="col-md-4">
                 <div className="box ">
                   <div className="img-box">
                   <i className="fa fa-cart-plus" aria-hidden="true"></i>
                   </div>
                   <div className="detail-box">
                     <h5>
                       Free Shiping
                     </h5>
                     <p>
                       variations of passages of Lorem Ipsum available
                     </p>
                   </div>
                 </div>
               </div>
               <div className="col-md-4">
                 <div className="box ">
                   <div className="img-box">
                   <i className="fa fa-certificate" aria-hidden="true"></i>
                   </div>
                   <div className="detail-box">
                     <h5>
                       Best Quality
                     </h5>
                     <p>
                       variations of passages of Lorem Ipsum available
                     </p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </section>
    <Footer />

        </>
    );
}