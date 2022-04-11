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
import { googleSignIn, login } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";


const initialSate = {
    email: "",
    password: ""
}

function Login() {

    const [formValue, setFormValue] = useState(initialSate)
    const { loading, error } = useSelector((state) => ({ ...state.auth }))
    const { email, password } = formValue;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fillInputs = () => {
        setFormValue({email : "test@gmail.com", password : "123456"})
    }



    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && password) {
            dispatch(login({ formValue, navigate, toast }))
        }
    }

    const googleSuccess = (res) => {
        const email = res?.profileObj?.email;
        const name = res?.profileObj?.name;
        const token = res?.tokenId;
        const googleId = res?.googleId;
        const result = {email, name, token , googleId};
        dispatch(googleSignIn({result, navigate, toast}))
    }

    const googleFailure = (error) => {
        toast.error(error)
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
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <div className="col-md-12">
                            <MDBInput label="Email" type="email" value={email} name="email"
                                onChange={handleChange} required invalid validation="Enter your email" />
                        </div>
                        <div className="col-md-12">
                            <MDBInput label="Password" type="password" value={password} name="password"
                                onChange={handleChange} required invalid validation="Enter your password" />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }} className="mt-2">Login</MDBBtn>
                            {
                                loading && (
                                    <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                                )
                            }
                        </div>
                    </MDBValidation>
                    <br />
                    <GoogleLogin
                        clientId="79601463397-tv8mhfhr8c3o5936hsttgrj0cqp019s1.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <MDBBtn
                                style={{ width: "100%" }}
                                color="danger"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
                            </MDBBtn>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register"><p>Don't have an Account ? Sign Up</p></Link>
                    <MDBBtn style={{ width: "100%" }} onClick={()=> fillInputs()} className="mt-2">Demo Credentials</MDBBtn>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}

export default Login
