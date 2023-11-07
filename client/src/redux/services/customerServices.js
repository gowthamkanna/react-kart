import api from "./http-common";

const customerRegister = (data) => {
    return api.post("/customers", data);
}
const customerLogin = (data) => {
    return api.post("/customer-login", data);
}
const getCustomerData = (id) => {
    return api.get(`/customers/${id}`);
}
const getCustomerWishlistedProducts = (id) => {
    return api.get(`/wishlists/${id}`);
}
const addToWishlist = (data) => {
    return api.post(`/wishlists/`, data);
}
const removeWishlist = (data) => {
    return api.post(`/remove-wishlisted/`, data);
}
const addToCart = (data) => {
    return api.post(`/add-to-cart/`, data);
}
const getCartById = (userID) => {
    return api.get(`/cart/${userID}`);
}
const deletecartById = (data) => {
    return api.post(`/remove-cart`, data);
}

const customerServices = {
    customerRegister,
    customerLogin,
    getCustomerData,
    getCustomerWishlistedProducts,
    addToWishlist,
    removeWishlist,
    addToCart,
    getCartById,
    deletecartById
}

export default customerServices;