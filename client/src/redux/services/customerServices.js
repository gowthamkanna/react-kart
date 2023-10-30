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

const customerServices = {
    customerRegister,
    customerLogin,
    getCustomerData,
    getCustomerWishlistedProducts,
    addToWishlist,
}

export default customerServices;