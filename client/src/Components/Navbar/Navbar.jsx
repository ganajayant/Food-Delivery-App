import axios from "axios";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

import "./Navbar.css";

export const Navbar = () => {
    const [state, setState] = React.useState(0);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        axios.get(`http://localhost:3001/users/${user.id}`).then(response => {
            const user = response.data;
            setState(user.cart.length);
        })
    }, [])

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div className="container-fluid">
            <a className="navbar-brand" href="/#">Food Eaters</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/products">Products</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-user
                            "></i>
                            User Profile
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="/orders">Order History</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="/#" onClick={(e) => {
                                e.preventDefault();
                                localStorage.clear();
                                Swal.fire({
                                    title: 'Success',
                                    text: 'Logout Success',
                                    icon: 'success',
                                    confirmButtonText: 'Ok',
                                    confirmButtonColor: '#000000'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.href = "/";
                                    }
                                })
                            }}>Logout</a></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <i className="fa badge fa-lg" value={state} style={{ marginTop: "2em" }} onClick={(e) => {
                            e.preventDefault();
                            window.location.href = "/cart";
                        }}>&#xf07a;</i>
                    </li>
                </ul>
            </div>
        </div>
    </nav >
}