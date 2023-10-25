import api from "./http-common";

const getCategories = () => {
    return api.get("/categories");
}

const getCategoriesById = (id) => {
    return api.get(`/categories/${id}`);
}

const createCategory = (name) => {
    return api.post(`/categories`, name);
}

const updateCategory = (data) => {
    return api.put(`/categories/${data._id}`, data);
}

const deleteCategory = (id) => {
    return api.delete(`/categories/${id}`);
}

const categoryServices = {
    getCategories,
    getCategoriesById,
    createCategory,
    updateCategory,
    deleteCategory,
};

export default categoryServices;