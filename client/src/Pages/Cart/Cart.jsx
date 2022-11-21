import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

import { Navbar } from "../../Components/Navbar/Navbar"

export const Cart = () => {
    const [state, setState] = useState([])
    useEffect(() => {
        const { id } = JSON.parse(localStorage.getItem("user"));
        axios.get(`http://localhost:3001/users/${id}`).then(response => {
            setState(response.data.cart)
        })
    }, [])
    return <div>
        <Navbar />
        <section >
            <div className="card-header py-3" style={{ textAlign: "center" }}>
                <h3 className="mb-0">Cart Items</h3>
            </div>
            <div className="container py-5" style={{ width: "100%" }}>
                {state.length === 0 ? <h1 style={{ textAlign: "center" }}>No Items in Cart</h1> : <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                        <div className="card-body">
                            {state.map
                                (item => {
                                    return <div className="row" key={item.id}>
                                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                            <a href={`/product/${item.id}`}>
                                                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                    <img src={item.img}
                                                        className="w-100" alt="..." />
                                                </div>
                                            </a>

                                        </div>

                                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                            <p><strong>{item.dsc}</strong></p>
                                            <p>Price: ${item.price}</p>
                                            <p>Rate:
                                                {
                                                    Array(item.rate).fill().map((_, i) => (
                                                        <i className="fa fa-star" key={i}></i>
                                                    ))
                                                }
                                            </p>
                                            <button type="button" className="btn btn-primary btn-sm me-1 mb-2"
                                                data-mdb-toggle="tooltip"
                                                title="Remove item" style={{ backgroundColor: "black" }} onClick={(e) => {
                                                    e.preventDefault();
                                                    const { id } = JSON.parse(localStorage.getItem("user"));
                                                    axios.get(`http://localhost:3001/users/${id}`).then(response => {
                                                        const user = response.data;
                                                        user.cart = user.cart.filter((cartItem) => cartItem.id !== item.id);
                                                        axios.put(`http://localhost:3001/users/${id}`, user).then(response => {
                                                            setState(response.data.cart)
                                                        })
                                                    })
                                                }} >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>

                                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                            <div className="d-flex mb-4" style={{
                                                maxWidth: "300px"
                                            }} >
                                                <button className="btn px-3 me-2" style={{ width: "44px", height: "37px", backgroundColor: "black", marginTop: "8px" }} onClick={(e) => {
                                                    e.preventDefault();
                                                    const { id } = JSON.parse(localStorage.getItem("user"));
                                                    axios.get(`http://localhost:3001/users/${id}`).then(response => {
                                                        const user = response.data;
                                                        const cartItem = user.cart.find((cartItem) => cartItem.id === item.id);
                                                        cartItem.count = cartItem.count - 1;
                                                        if (cartItem.count === 0) {
                                                            user.cart = user.cart.filter((cartItem) => cartItem.id !== item.id);
                                                        }
                                                        axios.put(`http://localhost:3001/users/${id}`, user).then(response => {
                                                            setState(response.data.cart)
                                                        }
                                                        )
                                                    })
                                                }}>
                                                    <i className="fas fa-minus" style={{ color: "white" }}></i>
                                                </button>

                                                <div className="form-outline">
                                                    <input id="form1" min="0" name="quantity" value={item.count} type="number" className="form-control" />
                                                    <label className="form-label" htmlFor="form1">Quantity</label>
                                                </div>

                                                <button className="btn btn-primary px-3 ms-2"
                                                    style={{ width: "44px", height: "37px", backgroundColor: "black", marginTop: "8px" }} onClick={(e) => {
                                                        e.preventDefault();
                                                        const { id } = JSON.parse(localStorage.getItem("user"));
                                                        axios.get(`http://localhost:3001/users/${id}`).then(response => {
                                                            const user = response.data;
                                                            const cartItem = user.cart.find((cartItem) => cartItem.id === item.id);
                                                            cartItem.count = cartItem.count + 1;
                                                            axios.put(`http://localhost:3001/users/${id}`, user).then(response => {
                                                                setState(response.data.cart)
                                                            })
                                                        })
                                                    }}>
                                                    <i className="fas fa-plus" style={{ color: "white" }}></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            <hr className="my-4" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Summary</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    {state.map(item => {
                                        return <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0" key={item.id}>
                                            {item.dsc}
                                            <span>${item.price * item.count}</span>
                                        </li>
                                    })}
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Total amount</strong>
                                            <strong>
                                                <p className="mb-0">(including VAT)</p>
                                            </strong>
                                        </div>
                                        <span><strong>
                                            ${state.reduce((acc, item) => {
                                                return acc + item.price * item.count
                                            }, 0)}
                                        </strong></span>
                                    </li>
                                </ul>

                                <button type="button" className="btn btn-lg btn-block" style={{ backgroundColor: "black", color: "white" }} onClick={(e) => {
                                    e.preventDefault();
                                    const { id } = JSON.parse(localStorage.getItem("user"));
                                    axios.get(`http://localhost:3001/users/${id}`).then(response => {
                                        const user = response.data;
                                        let orderdetails = [];
                                        user.cart.forEach((cartItem) => {
                                            orderdetails.push({
                                                product_id: cartItem.id,
                                                quantity: cartItem.count,
                                                price: cartItem.price
                                            })
                                        })
                                        const order = {
                                            id: user.previousOrders.length + 1,
                                            user_id: user.id,
                                            orderdetails,
                                            total: state.reduce((acc, item) => {
                                                return acc + item.price * item.count
                                            }
                                                , 0),
                                            date: new Date().toLocaleDateString(),
                                            status: "delivered",
                                        }
                                        user.previousOrders.push(order);
                                        user.cart = [];
                                        axios.put(`http://localhost:3001/users/${id}`, user).then(response => {
                                            setState(response.data.cart)
                                            Swal.fire({
                                                title: 'Success!',
                                                text: 'Your order has been placed',
                                                icon: 'success',
                                                confirmButtonText: 'Ok',
                                                confirmButtonColor: '#000000'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    window.location.href = "/orders";
                                                }
                                            })
                                        })
                                    })

                                }}>
                                    Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>}

            </div>
        </section >
    </div >

}