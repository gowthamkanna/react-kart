import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { customerLogin } from "../../redux/Slice/customer.slice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Register () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = (values) => {
        var errors = {};
        // email
        if(!values.CustomerEmail){
            errors.CustomerEmail = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.CustomerEmail)) {
            errors.CustomerEmail = "Invalid Email address";
        }
        
        // Password
        if(!values.CustomerPassword){
            errors.CustomerPassword = "Password is required";
        }

        return errors;
    }
    const formik = useFormik({
        initialValues: {
            CustomerEmail:'',
            CustomerPassword:'',
        },
        validate,
        onSubmit: async(userInputs) => {
            dispatch(
                customerLogin({
                    CustomerEmail: userInputs.CustomerEmail,
                    CustomerPassword: userInputs.CustomerPassword,
                }))
                .then((res) => {
                  if(res.payload.responseType === "success"){
                    localStorage.setItem("authToken", res.payload.token);
                    localStorage.setItem("userType", res.payload.type);
                    localStorage.setItem("userId", res.payload.id);
                    navigate('/');
                    toast.success("Login Successfully.");
                  }
                  else {
                    toast.error(res.payload.message);
                  }
                })
        }
    })
    return (
        <>
        <Header />
                <section className="contact_section layout_padding">
                <div className="container container-bg">
                  <div className="row">
                    <div className="col-lg-7 col-md-6 px-0">
                      <div className="map_container">
                        <div className="map-responsive">
                          <img className="loginImg" src="https://www.sme-news.co.uk/wp-content/uploads/2021/11/Login.jpg" alt="register" />
                          </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-5 px-0">
                    <h2 className="mt-4 mb-2 text-center">
                      Sign In
                    </h2>
                      <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                          <input type="text" className="form-control" name="CustomerEmail" placeholder="Email" onChange={formik.handleChange} />
                          { formik.errors.CustomerEmail ? <p className="error">{formik.errors.CustomerEmail}</p> : null }
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control" name="CustomerPassword" placeholder="Password" onChange={formik.handleChange} />
                          { formik.errors.CustomerPostal ? <p className="error">{formik.errors.CustomerPassword}</p> : null }
                        </div>
                        <div className="d-flex">
                          <input type="submit" className="registerSubmit" value="SIGN IN" />
                        </div>
                        <p className="text-center">Don't Have Account.? <Link to="/register">Signup</Link> </p>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
        <Footer />
        </>
    );
}