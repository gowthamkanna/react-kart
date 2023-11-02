import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Pagination from "../../components/pagination/Pagination";
import { getProducts } from "../../redux/Slice/product.slice";
import { toast } from "react-toastify";
import { getCategories } from "../../redux/Slice/category.slice";
import ProductList from "./ProductList";
import "../assets/filter.css";

let PageSize = 10;
let productsArray = [];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterOption, setFilterOption] = useState({
    categories: [],
    keyword: "",
  });
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFilterOption({
      ...filterOption,
      keyword: event.target.value,
    });
  };

  useEffect(() => {
    dispatch(getProducts()).then((res) => {
      setProducts(res.payload);
      setCurrentPage(1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // get all categories
  useEffect(() => {
    dispatch(getCategories())
      .then((response) => {
        setCategories(response.payload);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [dispatch]);

  const handleFilterOption = (e) => {
    if (e.target.checked === true) {
      setFilterOption({
        ...filterOption,
        categories: [...filterOption.categories, e.target.value],
      });
    } else {
      const filterResult = filterOption.categories.filter(
        (filter) => filter !== e.target.value
      );
      setFilterOption({
        ...filterOption,
        categories: [...filterResult],
      });
    }
    setCurrentPage(1);
  };

  // Page Filter with pagination
  const productData = useMemo(() => {
    var productsResult = [];
    // filter by category
    if (filterOption.categories.length > 0) {
      filterOption.categories.map((filterItem, index) => {
        productsResult = products.filter(
          (product) => product.ProductCategory._id === filterItem
        );
        if (index > 0) {
          return (productsArray = [...productsArray, ...productsResult]);
        } else {
          return (productsArray = [...productsResult]);
        }
      });
    } else {
      productsArray = [...products];
    }
    // filter by keyword
    if (filterOption.keyword !== "") {
      productsArray = productsArray.filter(
        (product) =>
          product.Name.toLowerCase().includes(
            filterOption.keyword.toLowerCase()
          ) ||
          product.Description.toLowerCase().includes(
            filterOption.keyword.toLowerCase()
          )
      );
    }
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return productsArray.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filterOption, products]);

  return (
    <>
      <Header />
      <section className="shop_section layout_padding">
        <div className="container-fluid">
          <div className="heading_container heading_center">
            <h2>Our Products</h2>
          </div>
          <div className="row">
            <div className="col-md-2 filter-sidebar-container">
              <div className="search-section">
                <div className="filter-sidebar">
                  <div className="row main-content ml-md-0">
                    <div className="sidebar px-0">
                      <div className="sidebar__inner ">
                        <div className="filter-body">
                          <div>
                            <h2 className="filter-title">Categories</h2>
                            <div className="mb-30 filter-options">
                              {categories
                                ? categories.map((item) => (
                                    <div
                                      className="custom-control custom-checkbox mb-3 mt-3"
                                      key={item._id}
                                    >
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={item.name}
                                        onClick={(e) => handleFilterOption(e)}
                                        value={item._id}
                                      />
                                      &nbsp;
                                      <label
                                        className="custom-control-label"
                                        htmlFor={item.name}
                                      >
                                        {item.name}
                                      </label>
                                    </div>
                                  ))
                                : null}
                            </div>
                          </div>

                          <div>
                            <h2 className="filter-title">Keyword</h2>
                            <div className="mb-30 filter-options">
                              <input
                                type="text"
                                name="keyword"
                                className="filter-text form-control"
                                placeholder="Keyword"
                                value={filterOption.keyword}
                                onChange={(e) => handleChange(e)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-10">
              <div className="row">
                {productData
                  ? productData.map((product) => (
                      <ProductList key={product._id} product={product} />
                    ))
                  : ""}
              </div>
              <div className="text-center mt-5 mb-5 pagination-wrapper">
                <Pagination
                  key={currentPage}
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={productsArray.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
