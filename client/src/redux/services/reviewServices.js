import api from "../services/http-common";

const getReviews = () => {
    return api.get(`/reviews`);
}

const reviewServices = {
    getReviews
}

export default reviewServices;