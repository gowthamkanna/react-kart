import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Pagination from "../components/pagination/Pagination";
import { Carousel } from 'react-responsive-carousel';
import { getProducts } from "../redux/Slice/product.slice";
import { addToWishlist } from "../redux/Slice/customer.slice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

let PageSize = 10;

export default function Shop () {

    const [products, setProducts] = useState([]);
    // const {products} = useSelector((state) => state.product);
    const [currentPage, setCurrentPage] = useState(0);
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts()).then((res) => {
            setProducts(res.payload);
            setCurrentPage(1);
        });
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const productData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return products.slice(firstPageIndex, lastPageIndex);
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

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

  // function productDetailRedirect(id){
  //   const data = { ProductID: id };
  //   navigate('/product-details');
  // }

  function addProductToWishlist(productID){
    const userID = localStorage.getItem("userId");
    dispatch(addToWishlist({userID, productID})).then(res => {
      toast.success(res.payload.message);
    })
    .catch(err => {
      toast.error(err.message);
    })
  }

    return(
        <>
            <Header />
            <section className="shop_section layout_padding">
              <div className="container">
                <div className="heading_container heading_center">
                  <h2>
                    Our Products
                  </h2>
                </div>
                <div className="row">
                {  productData ? productData.map((product) => (
                            <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
                            <div className="box">
                              <a href="/">
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
                                <div className="detail-box">
                                   {/* <h6 onClick={() => redirectToProductDetail(product._id)} className="cursor-pointer">
                                      {product.Name}
                                    </h6> */}
                                    <Link to={`/product-details/${product._id}`}><h6  className="cursor-pointer">
                                  {product.Name}
                                  </h6></Link>
                                  
                                  <h6>
                                      Price :
                                    <span>
                                    {product.SalePrice}
                                    </span>
                                  </h6>
                                </div>
                              </a>
                              <div className="text-center mt-2 mb-2"><button className="btn btn-info buy_now_btn"><i className="fa fa-shopping-cart" ></i></button>
                              &nbsp;
                              <button onClick={() => addProductToWishlist(product._id)} className="btn btn-info buy_now_btn"><i className="fa-solid fa-heart"></i></button>
                              </div>
                            </div>
                            </div>
                       )) : '' 
                       }
              </div>
              <div className="text-center mt-5 mb-5 pagination-wrapper">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={products.length}
                  pageSize={PageSize}
                  onPageChange={page => setCurrentPage(page)}
                />
                </div>
              
              </div>
            </section>
            <Footer />

        </>
    );
}