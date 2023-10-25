import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const WebRoute = ({children}) => {
    let location = useLocation();
    let authToken = localStorage.getItem("authToken");
    let userType = localStorage.getItem("userType");
    // console.log(authToken);
    if(authToken == null || userType !== "customer") {
        return <Navigate to="/" state={{ from: location}} replace />
    }
    return children

}

export default WebRoute;