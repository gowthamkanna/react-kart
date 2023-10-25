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

const customerServices = {
    customerRegister,
    customerLogin,
    getCustomerData,
}

export default customerServices;