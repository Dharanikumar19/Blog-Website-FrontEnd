import React, { useState } from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";

function Header() {
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);

    const handleLogout = () => {
        dispatch(setLogout())
    }


    return (
        <>
            <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#0f5298" }}>
                <MDBContainer>
                    <MDBNavbarBrand
                        href="/"
                        style={{ color: "#eef093", fontWeight: "600", fontSize: "22px" }}
                    >
                        Blog Website
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        type="button"
                        aria-expanded="false"
                        aria-label="Toogle navigation"
                        onClick={() => setShow(!show)}
                        style={{ color: "white" }}
                    >
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>
                    <MDBCollapse show={show} navbar>
                        <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        {user?.result?._id && (
                            <h6 style={{marginRight:"30px", marginTop:"19px", color:"white",fontSize: "19px"}}>User : {user?.result?.name}</h6>
                        )}
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/">
                                    <p className="header-text">Home</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            {
                                user?.result?._id && (
                                    <>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink href="/addBlog">
                                                <p className="header-text">Add-Blog</p>
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>

                                        <MDBNavbarItem>
                                            <MDBNavbarLink href="/dashboard">
                                                <p className="header-text">Dashboard</p>
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                    </>
                                )
                            }

                            {
                                user?.result?._id ? (
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href="/login">
                                            <p className="header-text" onClick={handleLogout} >Logout</p>
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                ) : (
                                    <MDBNavbarItem>
                                    <MDBNavbarLink href="/login">
                                        <p className="header-text">Login</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                )
                            }


                          

                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    )
}

export default Header
