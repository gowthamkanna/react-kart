import { Routes, Route } from 'react-router-dom';
import AdminLogin from './auth/Login';
import Dashboard from './pages/Dashboard';
import Categories from './pages/admin/categories/Categories';
import Products from './pages/admin/products/Products';
import {ProtectedRoute, ProtectedWebRoute, LoggedInRoute, LoggedInAdminRoute} from './auth/ProtectedRoute';
// import WebRoute from './webpage/auth/WebRoute';
import Reviews from './pages/admin/reviews/Reviews';
import Home from './webpage/Home';
import Shop from './webpage/Shop';
import Login from './webpage/auth/Login';
import ProductDetail from './webpage/ProductDetail';
import Register from './webpage/auth/Register';
import Wishlists from './webpage/Wishlists';
import Error404 from './webpage/error_pages/Error404';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
          {/* Website Routes */}
          <Route exact path="/" element={<ProtectedWebRoute><Home /></ProtectedWebRoute>} /> 
          <Route exact path="/shop" element={<ProtectedWebRoute><Shop /></ProtectedWebRoute>} /> 
          <Route exact path="/wishlists" element={<ProtectedWebRoute><Wishlists /></ProtectedWebRoute>} /> 
          <Route exact path="/product-details/:productID" element={<ProtectedWebRoute><ProductDetail /></ProtectedWebRoute>} /> 
          <Route exact path="/login" element={<LoggedInRoute><Login /></LoggedInRoute>} /> 
          <Route exact path="/register" element={ <LoggedInRoute><Register /></LoggedInRoute>} /> 
          {/* Admin Routes */}
          <Route exact path="/admin/login" element={<LoggedInAdminRoute><AdminLogin /></LoggedInAdminRoute>} /> 
          <Route exact path="/admin/dashboard" element={
            <ProtectedRoute>
            <Dashboard/>
            </ProtectedRoute>
          }/>
          <Route exact path="/admin/categories" element={
            <ProtectedRoute>
            <Categories/>
            </ProtectedRoute>
          }/>
          <Route exact path="/admin/products" element={
            <ProtectedRoute>
            <Products />
            </ProtectedRoute>
          }/>
          <Route exact path="/admin/reviews" element={
            <ProtectedRoute>
            <Reviews />
            </ProtectedRoute>
          }/>
          <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
