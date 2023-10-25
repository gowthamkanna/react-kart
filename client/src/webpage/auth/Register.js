import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { customerRegister } from "../../redux/Slice/customer.slice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Register () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = (values) => {
        var errors = {};
        // Name
        if(!values.CustomerName){
            errors.CustomerName = "Name is required";
        }
        // email
        if(!values.CustomerEmail){
            errors.CustomerEmail = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.CustomerEmail)) {
            errors.CustomerEmail = "Invalid Email address";
        }
        // Phone
        if(!values.CustomerPhone){
            errors.CustomerPhone = "Phone is required";
        }
        else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(values.CustomerPhone)) {
            errors.CustomerPhone = 'Invalid Phone number';
        }
        // Address Line One
        if(!values.CustomerAddressOne){
            errors.CustomerAddressOne = "Address is required";
        }
        
        // City
        if(!values.CustomerAddressCity){
            errors.CustomerAddressCity = "City is required";
        }
        // State
        if(!values.CustomerAddressState){
            errors.CustomerAddressState = "State is required";
        }
        // Postal Code
        if(!values.CustomerPostal){
            errors.CustomerPostal = "Postal Code is required";
        }
        else if(!values.CustomerPostal.length === 6){
            errors.CustomerPostal = "Postal Code is required";
        }
        // Postal Code
        if(!values.CustomerPassword){
            errors.CustomerPassword = "Password is required";
        }

        return errors;
    }
    const formik = useFormik({
        initialValues: {
            CustomerName:'',
            CustomerEmail:'',
            CustomerPhone:'',
            CustomerAddressOne:'',
            CustomerAddressCity:'',
            CustomerAddressState:'',
            CustomerPostal:'',
            CustomerPassword:'',
        },
        validate,
        onSubmit: async(userInputs) => {
            dispatch(
                customerRegister({
                    CustomerName: userInputs.CustomerName,
                    CustomerEmail: userInputs.CustomerEmail,
                    CustomerPhone: userInputs.CustomerPhone,
                    CustomerAddressOne: userInputs.CustomerAddressOne,
                    CustomerAddressCity: userInputs.CustomerAddressCity,
                    CustomerAddressState: userInputs.CustomerAddressState,
                    CustomerPostal: userInputs.CustomerPostal,
                    CustomerPassword: userInputs.CustomerPassword,
                }))
                .then((res) => {
                    navigate('/login');
                    toast.success("Registered Successfully.");
                })
        }
    })
    return (
        <>
        <Header />
                <section className="contact_section layout_padding">
                <div className="container px-0">
                  <div className="heading_container ">
                    <h2 className="">
                      Signup
                    </h2>
                  </div>
                </div>
                <div className="container container-bg">
                  <div className="row">
                    <div className="col-lg-7 col-md-6 px-0">
                      <div className="map_container">
                        <div className="map-responsive">
                          <img className="img-responsive" src="https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg" alt="register" />
                          </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-5 px-0">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                          <input type="text" className="form-control" name="CustomerName" placeholder="Name" onChange={formik.handleChange} />
                          { formik.errors.CustomerName ? <p className="error">{formik.errors.CustomerName}</p> : null }
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" name="CustomerEmail" placeholder="Email" onChange={formik.handleChange} />
                          { formik.errors.CustomerEmail ? <p className="error">{formik.errors.CustomerEmail}</p> : null }
                        </div>
                        <div className="form-group">
                          <input type="number" className="form-control" name="CustomerPhone" placeholder="Phone" onChange={formik.handleChange} />
                          { formik.errors.CustomerPhone ? <p className="error">{formik.errors.CustomerPhone}</p> : null }
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" name="CustomerAddressOne" placeholder="Address Line 1" onChange={formik.handleChange} />
                          { formik.errors.CustomerAddressOne ? <p className="error">{formik.errors.CustomerAddressOne}</p> : null }
                        </div>
                        <div className="row">
                        <div className="col">
                          <input type="text" className="form-control" name="CustomerAddressCity" placeholder="City" onChange={formik.handleChange} />
                          { formik.errors.CustomerAddressCity ? <p className="error">{formik.errors.CustomerAddressCity}</p> : null }
                        </div>
                        <div className="col">
                          <input type="text" className="form-control" name="CustomerAddressState" placeholder="State" onChange={formik.handleChange} />
                          { formik.errors.CustomerAddressState ? <p className="error">{formik.errors.CustomerAddressState}</p> : null }
                        </div>
                        </div>
                        <div className="form-group">
                          <input type="number" className="form-control" name="CustomerPostal" placeholder="Postal Code" onChange={formik.handleChange} />
                          { formik.errors.CustomerPostal ? <p className="error">{formik.errors.CustomerPostal}</p> : null }
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control" name="CustomerPassword" placeholder="Password" onChange={formik.handleChange} />
                          { formik.errors.CustomerPostal ? <p className="error">{formik.errors.CustomerPassword}</p> : null }
                        </div>
                        <div className="d-flex">
                          <input type="submit" className="registerSubmit" value="REGISTER" />
                        </div>
                        <p className="text-center">Already Have Account.? <Link to="/login">Signin</Link> </p>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
        <Footer />
        </>
    );
}