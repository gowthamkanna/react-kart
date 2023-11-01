import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Pagination from "../../components/pagination/Pagination";
import { getProducts } from "../../redux/Slice/product.slice";
import ProductList from "./ProductList";

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

  // function productDetailRedirect(id){
  //   const data = { ProductID: id };
  //   navigate('/product-details');
  // }

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
                      <ProductList key={product._id.toString()} product={product} />
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