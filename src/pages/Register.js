import React, { useState, useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { register } from "../redux/features/authSlice";

const initialSate = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

function Register() {

    const [formValue, setFormValue] = useState(initialSate)
    const { loading, error } = useSelector((state) => ({ ...state.auth }))
    const { email, password, firstName, lastName, confirmPassword } = formValue;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            return toast.error("Password should match")
        }
        if(email && password && firstName && lastName && confirmPassword){
            dispatch(register({formValue, navigate, toast }))
        }
    }

    return (
        <div style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "450px",
            alignContent: "center",
            marginTop: "120px"
        }}>
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x" />
                <h5>Sign Up</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">

                    <div className="col-md-6">
                        <MDBInput label="FirstName" type="text" value={firstName} name="firstName"
                        onChange={handleChange} required invalid validation="Enter your first name" />
                    </div>

                    <div className="col-md-6">
                        <MDBInput label="LastName" type="text" value={lastName} name="lastName"
                        onChange={handleChange} required invalid validation="Enter your last name" />
                    </div>

                    <div className="col-md-12">
                        <MDBInput label="Email" type="email" value={email} name="email"
                        onChange={handleChange} required invalid validation="Enter your email" />
                    </div>

                    <div className="col-md-12">
                        <MDBInput label="Password" type="password" value={password} name="password"
                        onChange={handleChange} required invalid validation="Enter your password" />
                    </div>
                    
                    <div className="col-md-12">
                        <MDBInput label="Confirm Password" type="password" value={confirmPassword} name="confirmPassword"
                        onChange={handleChange} required invalid validation="Enter your Confirm Password" />
                    </div>

                    <div className="col-12">
                        <MDBBtn style={{ width: "100%" }} className="mt-2">Register</MDBBtn>
                            {
                                loading && (
                                    <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                                )
                            }
                    </div>

                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/login"><p>Already have an Account ? Login Up</p></Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}

export default Register
