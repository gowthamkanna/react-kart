import React from 'react'
// import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

export const ProtectedRoute = ({children}) => {
    let location = useLocation();
    // let authToken = user.token;
    let authToken = localStorage.getItem("authToken");
    let userType = localStorage.getItem("userType");
    // console.log(authToken);
    if(authToken === null) {
        return <Navigate to="/admin/login" state={{ from: location}} replace />
    }
    if(userType !== "admin") {
        return <Navigate to="/" state={{ from: location}} replace />
    }
    return children

};

export const ProtectedWebRoute = ({children}) => {
    let location = useLocation();
    // let authToken = user.token;
    let authToken = localStorage.getItem("authToken");
    let userType = localStorage.getItem("userType");
    console.log(location);
    if(authToken == null) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    if(userType !== "customer") {
        return <Navigate to="/admin/dashboard" state={{ from: location}} replace />
    }
    return children

};
export const LoggedInRoute = ({children}) => {
    let location = useLocation();
    let authToken = localStorage.getItem("authToken");
    if(authToken === null) {
        return children
    }
    return <Navigate to="/" state={{ from: location}} replace />

};

export const LoggedInAdminRoute = ({children}) => {
    let location = useLocation();
    let authToken = localStorage.getItem("authToken");
    if(authToken === null) {
        return children
    }
    return <Navigate to="/admin/dashboard" state={{ from: location}} replace />

};