import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Modal } from "react-bootstrap";
import Select from  "react-select";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Table from "../../../components/table/ReactTable/Table";
import swal from 'sweetalert';
// import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories
} from "../../../redux/Slice/category.slice";
import {
    createProduct,
    getProducts,
    getProductsById,
    updateProduct,
    deleteProduct,
} from "../../../redux/Slice/product.slice";
// import { colors } from '@mui/material';
import { toast } from "react-toastify";

const defaultTheme = createTheme();

export default function Products() {
  const [UserModalpop, setOpenModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const { currentProduct } = useSelector((state) => state.product);
  const message = useSelector((state) => state.product.message);
  // const errors = useSelector((state) => state.category.errors);
  const [selectedOption, setSelectedOption] = useState(null);
  // category dropdown options
  var options = categories.map(function (val) {
    return { value: val._id, label: val.name };
  });
  
  //Add data
  const [addFormData, setAddFormData] = useState({
    _id: null,
    Name: "",
    OriginalPrice: "",
    SalePrice: "",
    StockLeft: "",
    Description: "",
    ProductCategory: "",
    ProductImages: "",
    ImagesToRemove: "",
  });

  const newFormData = { ...addFormData }; // state

  const dispatch = useDispatch();

  // Table columns

  const PRODUCT_COLUMNS = [
    {
      Header: "Name",
      Footer: "Name",
      accessor: "Name",
      disableFilters: true,
    },
    {
      Header: "Original Price",
      Footer: "Original Price",
      accessor: "OriginalPrice",
      disableFilters: true,
    },
    {
      Header: "Sale Price",
      Footer: "Sale Price",
      accessor: "SalePrice",
      disableFilters: true,
    },
    {
      Header: "Stock Left",
      Footer: "Stock Left",
      accessor: "StockLeft",
      disableFilters: true,
    },
    {
      Header: "Description",
      Footer: "Description",
      accessor: "Description",
      disableFilters: true,
    },
    {
      Header: "Category",
      Footer: "Category",
      accessor: "ProductCategory.name",
      disableFilters: true,
    },
    {
      Header: "Action",
      Footer: "Action",
      accessor: "_id",
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ value }) => {
        return (
          <>
            <div className="d-flex">
              <Link
                onClick={() => handleEditClick(value)}
                className="btn btn-primary shadow btn-xs sharp me-1"
                title="Edit"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                onClick={() => handleDeleteClick(value)}
                className="btn btn-danger shadow btn-xs sharp"
                title="Delete"
              >
                <i className="fa fa-trash"></i>
              </Link>
            </div>
          </>
        );
      },
    },
  ];

  // get all products when the page is loaded
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    newFormData._id = currentProduct._id;
    newFormData.Name = currentProduct.Name;
    newFormData.OriginalPrice = currentProduct.OriginalPrice;
    newFormData.SalePrice = currentProduct.SalePrice;
    newFormData.StockLeft = currentProduct.StockLeft;
    newFormData.Description = currentProduct.Description;
    newFormData.ImagesToRemove = currentProduct.ProductImages;
    // newFormData.ProductCategory = currentProduct.ProductCategory;
    setSelectedOption(currentProduct.ProductCategory);
    setAddFormData(newFormData);
  }, [currentProduct]);


  useEffect(() => {
    if(message !== ''){
      if(message.type === "success"){
        toast.success(message.message);
        setOpenModal(false);
      }
      else if(message.type === "error"){
        toast.error(message.message);
      }
    }
    dispatch(getProducts());
  }, [message])
  // handle Edit Click function
  const handleEditClick = (Id) => {
    dispatch(getProductsById(Id));
    dispatch(getCategories());
    setOpenModal(true);
    setSubmitted(false);
  };

  const handleDeleteClick = (Id) => {
    
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: false,
      closeOnEsc: false,
      allowOutsideClick: false,
    }).then((willDelete) => {
      if (willDelete) {
            dispatch(deleteProduct(Id));          
      }
    });

  }

  // handle form change
  const handleChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  // handle Poup Click function while add categories
  const handlePoupClick = () => {
    dispatch(getCategories());
    newFormData._id = newFormData._id = null;
    newFormData.Name= "";
    newFormData.OriginalPrice= "";
    newFormData.SalePrice= "";
    newFormData.StockLeft= "";
    newFormData.Description= "";
    newFormData.ProductCategory= null;
    newFormData.ProductImages= "";
    newFormData.ImagesToRemove= "";
    setAddFormData(newFormData);
    setOpenModal(true);
    setSubmitted(false);
  };

  // handle Submit data function
  const handleSubmit = (event) => {
    event.preventDefault();
    var error = false;
    if (!addFormData.Name || !addFormData.OriginalPrice || !addFormData.SalePrice || !addFormData.StockLeft || !addFormData.Description || !selectedOption ) {
      error = true;
    }

    if (!error) {
      const formData = new FormData();
        formData.append('_id', addFormData._id ? addFormData._id : null);
        formData.append('Name', addFormData.Name);
        formData.append('OriginalPrice', addFormData.OriginalPrice);
        formData.append('SalePrice', addFormData.SalePrice);
        formData.append('StockLeft', addFormData.StockLeft);
        formData.append('ProductCategory', selectedOption?selectedOption:null);
        if(addFormData.ImagesToRemove !== ''){
        addFormData.ImagesToRemove.forEach(item => {
          formData.append(`ImagesToRemove[]`, item.path);
        });
      }
        // formData.append('ImagesToRemove', addFormData.ImagesToRemove);
        formData.append('Description', addFormData.Description);
        for (const key of Object.keys(addFormData.ProductImages)) {
          formData.append('ProductImages', addFormData.ProductImages[key])
        }
      if (newFormData._id !== null) {
        // category update
        dispatch(updateProduct(formData));
        setOpenModal(false)
      } else {
        // add new category
        dispatch(createProduct(formData));
        setOpenModal(false);
      }
    } else {
      // setSubmitted(true);
      toast.error("Please fill out the required fields!");
    }
  };

  const handlePhoto = (e) => {
    setAddFormData({...addFormData, ProductImages: e.target.files });
}

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <Header />
        <div className="container-fluid inner-wrapper">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Products</span>
              <Button
                className="me-2"
                variant="primary btn-rounded float-end"
                onClick={handlePoupClick}
              >
                Add Products
              </Button>
            </div>
          </div>

          <div className="card">
            {products.length > 0 ? (
              <div className="card-body">
                {products && products.length > 0 && (
                  <Table
                    columns={PRODUCT_COLUMNS}
                    data={products && products.length > 0 && products}
                  />
                )}
              </div>
            ) : (
              <div className="card-body no-data-found">No Data Found</div>
            )}
          </div>
          <Footer />
        </div>
      </Box>
      {/* <!-- Modal --> */}
      <Modal className="fade bd-example-modal-lg" show={UserModalpop} size="lg">
        <Modal.Header>
          <Modal.Title>
            {/* Add User */}
            {newFormData._id ? "Edit Product" : "Add Product"}
          </Modal.Title>
          <Button
            variant=""
            className="btn-close"
            onClick={() => setOpenModal(false)}
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="text-black font-w500">
                  Name
                  <span className="text-danger">*</span>
                </label>
                <div className="contact-name">
                  <input
                    type="text"
                    className={`form-control ${
                      submitted && !addFormData.Name && "border-danger"
                    }`}
                    autoComplete="off"
                    name="Name"
                    required="required"
                    onChange={handleChange}
                    value={addFormData.Name}
                    placeholder="Name"
                    maxLength={50}
                  />
                  <span className="validation-text"></span>
                </div>
              </div>
              
              <div className="col-md-6 mb-4">
                <label className="text-black font-w500">
                Original Price 
                  <span className="text-danger">*</span>
                </label>
                <div className="contact-name">
                  <input
                    type="text"
                    className={`form-control ${
                      submitted && !addFormData.OriginalPrice && "border-danger"
                    }`}
                    autoComplete="off"
                    name="OriginalPrice"
                    required="required"
                    onChange={handleChange}
                    value={addFormData.OriginalPrice }
                    placeholder="Original Price "
                    maxLength={50}
                  />
                  <span className="validation-text"></span>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <label className="text-black font-w500">
                Sale Price 
                  <span className="text-danger">*</span>
                </label>
                <div className="contact-name">
                  <input
                    type="text"
                    className={`form-control ${
                      submitted && !addFormData.SalePrice && "border-danger"
                    }`}
                    autoComplete="off"
                    name="SalePrice"
                    required="required"
                    onChange={handleChange}
                    value={addFormData.SalePrice}
                    placeholder="Sale Price "
                    maxLength={50}
                  />
                  <span className="validation-text"></span>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <label className="text-black font-w500">
                Stock Left 
                  <span className="text-danger">*</span>
                </label>
                <div className="contact-name">
                  <input
                    type="text"
                    className={`form-control ${
                      submitted && !addFormData.StockLeft && "border-danger"
                    }`}
                    autoComplete="off"
                    name="StockLeft"
                    required="required"
                    onChange={handleChange}
                    value={addFormData.StockLeft }
                    placeholder="Stock Left"
                    maxLength={50}
                  />
                  <span className="validation-text"></span>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <label className="text-black font-w500">
                Description
                  <span className="text-danger">*</span>
                </label>
                <div className="contact-name">
                  <input
                    type="text"
                    className={`form-control ${
                      submitted && !addFormData.Description  && "border-danger"
                    }`}
                    autoComplete="off"
                    name="Description"
                    required="required"
                    onChange={handleChange}
                    value={addFormData.Description }
                    placeholder="Description"
                    maxLength={50}
                  />
                  <span className="validation-text"></span>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <label className="text-black font-w500">
                Product Images
                  {/* <span className="text-danger">*</span> */}
                </label>
                <div className="contact-name">
                  <input
                    type="file"
                    className={`form-control ${
                      submitted && !addFormData.ProductImages  && "border-danger"
                    }`}
                    autoComplete="off"
                    name="ProductImages"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handlePhoto}
                    // value={addFormData.ProductImages }
                    // placeholder="Description"
                    multiple
                    required
                  />
                  <span className="validation-text"></span>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <label className="text-black font-w500">
                Product Category
                </label>
                <div className="contact-name">
                <Select
                    defaultValue={selectedOption}
                    onChange= {(e) => {
                      setSelectedOption(e.value);
                    }}
                    options={options}
                />
                  <span className="validation-text"></span>
                </div>
              </div>

            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger light" 
          onClick={() => {
            setOpenModal(false);
          }}>
            Close
          </Button>
          <Button
            type="submit"
            variant=""
            //onClick={() => setLargeModal(false)}
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            {newFormData._id ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </ThemeProvider>
  );
}
