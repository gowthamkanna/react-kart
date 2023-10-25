import api from "./http-common";

const getProducts = () => {
    return api.get("/products");
}
const getProductsById = (id) => {
    return api.get(`/products/${id}`);
}

const createProduct = (data) => {
    return api.post(`/products`, data);
}

const updateProduct = (data, imageToRemove) => {
    var Id = data.get("_id");
    return api.put(`/products/${Id}`, data);
}

const deleteProduct = (data) => {
    return api.delete(`/products/${data}`);
}

const getLatestProduct = () => {
    return api.get('/latest-products');
}

const productServices = {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct,
    getLatestProduct,
}

export default productServices;