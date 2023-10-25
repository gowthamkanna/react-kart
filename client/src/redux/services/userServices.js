import api from "./http-common";

const userLogin = (data) => {
    return api.post("/login", data);
}

const UserServices = {
    userLogin,
};

export default UserServices;