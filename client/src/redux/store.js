import {configureStore} from '@reduxjs/toolkit';
import UserReducer from "./Slice/user";
import categoryReducer from "./Slice/category.slice";
import productReducer from "./Slice/product.slice"
import reviewReducer from "./Slice/review.slice";
import customerReducer from "./Slice/customer.slice";

const reducer = {
  user: UserReducer,
  category: categoryReducer,
  product: productReducer,
  review: reviewReducer,
  customer: customerReducer,
};

const store = configureStore({
  reducer: reducer,
});

export default store;