import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Table from "../../../components/table/ReactTable/Table";
import swal from 'sweetalert';
// import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  getCategoriesById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../../redux/Slice/category.slice";
// import { colors } from '@mui/material';
import { toast } from "react-toastify";

const defaultTheme = createTheme();

export default function Categories() {
  const [UserModalpop, setOpenModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { categories } = useSelector((state) => state.category);
  const { editCategory } = useSelector((state) => state.category);
  const success = useSelector((state) => state.category.success);
  // const errors = useSelector((state) => state.category.errors);

  //Add data
  const [addFormData, setAddFormData] = useState({
    _id: null,
    name: "",
  });

  const newFormData = { ...addFormData }; // state

  const dispatch = useDispatch();

  // Table columns

  const CATEGORY_COLUMNS = [
    {
      Header: "Name",
      Footer: "Name",
      accessor: "name",
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

  // Retrieve all categories for list
  // const initFetch = useCallback(() => {
  //   dispatch(getCategories());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  },[]);

  useEffect(() => {
    newFormData._id = editCategory._id;
    newFormData.name = editCategory.name;
    setAddFormData(newFormData);
  }, [editCategory]);

  useEffect(() => {
    if (success !== "") {
      dispatch(getCategories());
      setOpenModal(false);
    }
  }, [success, dispatch]);

  // handle Edit Click function
  const handleEditClick = (Id) => {
    dispatch(getCategoriesById(Id));
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
          dispatch(deleteCategory(Id));
      }
    });

  }

  // handle form change
  const handleChange = (event) => {
    event.preventDefault();
    newFormData.name = event.target.value;
    setAddFormData(newFormData);
  };

  // handle Poup Click function while add categories
  const handlePoupClick = () => {
    newFormData._id = newFormData._id = null;
    newFormData.name = "";
    setAddFormData(newFormData);
    setOpenModal(true);
    setSubmitted(false);
  };

  // handle Submit data function
  const handleSubmit = (event) => {
    event.preventDefault();
    var error = false;
    if (!addFormData.name || addFormData.name.trim() === "") {
      error = true;
    }

    if (!error) {
      if (newFormData._id !== null) {
        // category update
        dispatch(updateCategory(addFormData));
      } else {
        // add new category
        dispatch(createCategory({name : newFormData.name}))
        .then(res => {
          toast.success(res.payload);
        })
        .catch(err => {
          toast.success(err.payload);
        });
        
      }
    } else {
      setSubmitted(true);
      toast.error("Please fill out the required fields !");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <Header />
        <div className="container-fluid inner-wrapper">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Categories</span>
              <Button
                className="me-2"
                variant="primary btn-rounded float-end"
                onClick={handlePoupClick}
              >
                Add Category
              </Button>
            </div>
          </div>

          <div className="card">
            {categories.length > 0 ? (
              <div className="card-body">
                {categories && categories.length > 0 && (
                  <Table
                    columns={CATEGORY_COLUMNS}
                    data={categories && categories.length > 0 && categories}
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
            {newFormData._id ? "Edit Category" : "Add Category"}
          </Modal.Title>
          <Button
            variant=""
            className="btn-close"
            onClick={() => setOpenModal(false)}
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 mb-4">
                <label className="text-black font-w500">
                  Category Name
                  <span className="text-danger">*</span>
                </label>
                <div className="contact-name">
                  <input
                    type="text"
                    className={`form-control ${
                      submitted && !newFormData.name && "border-danger"
                    }`}
                    autoComplete="off"
                    name="name"
                    required="required"
                    onChange={handleChange}
                    value={addFormData.name}
                    placeholder="Category Name"
                    maxLength={50}
                  />
                  <span className="validation-text"></span>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger light" onClick={() => setOpenModal(false)}>
            Close
          </Button>
          <Button
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
