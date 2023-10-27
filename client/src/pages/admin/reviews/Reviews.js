import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from '../Header';
import Footer from '../Footer';
// import { Link } from "react-router-dom";
import Table from '../../../components/table/ReactTable/Table';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../../redux/Slice/review.slice';
const defaultTheme = createTheme();
export default function Reviews() {

  const {reviews} = useSelector((state) => state.review);
  const dispatch = useDispatch();

  function renderRating(value){
    var reviews = '';
    for (let star = 1; star <= value; star++) {
      reviews += "*";
    };
    return reviews;
  }

  const REVIEW_COLUMNS = [
    {
      Header: "User Name",
      Footer: "User Name",
      accessor: "user",
      disableFilters: true,
    },
    {
      Header: "Product ID",
      Footer: "Product ID",
      accessor: "productId._id",
      disableFilters: true,
    },
    {
      Header: "Product Name",
      Footer: "Product Name",
      accessor: "productId.Name",
      disableFilters: true,
    },
    {
      Header: "Review",
      Footer: "Review",
      accessor: "review",
      disableFilters: true,
    },
    {
      Header: "Rating",
      Footer: "Rating",
      accessor: "rating",
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ value }) => {
        return (
          <>
            <div id="star-rating">
            { renderRating(value) }
            </div>
          </>
        );
      },
    },
   
  ];

  useEffect(() => {
    dispatch(getReviews());
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
    <Box sx={{ display: 'flex' }}>
    <Header />
    <div className='container-fluid inner-wrapper'>
    <div className="card">
            <div className="card-header">
              <span className="card-title">Reviews</span>
            </div>
          </div>

          <div className="card">
            {reviews.length > 0 ? (
              <div className="card-body">
                {reviews && reviews.length > 0 && (
                  <Table
                    columns={REVIEW_COLUMNS}
                    data={reviews && reviews.length > 0 && reviews}
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
    </ThemeProvider>
      
  );
}