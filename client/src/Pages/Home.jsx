
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { Carousel } from "../Components/Carousel";
import { Navbar } from "../Components/Navbar/Navbar";

export const Home = () => {
    const [state, setState] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/menu").then((res) => {
            const data = res.data.filter((item) => item.rate <= 4);
            if (data.length > 8) {
                setState(data.slice(0, 8));
            }
            else {
                setState(data);
            }
        })
    }, [])
    return <div>
        <Navbar />
        <Carousel />
        <h2>Top Rated</h2>
        <div className='container' style={{ width: "100%" }}>
            <div className="row">
                <div className="col-md-12">
                </div>
            </div>
            <div className="row">
                {state.map((item) => {
                    return <div className="col-md-3 col-sm-6" key={item.id} >
                        <div className="product-grid">
                            <div className="product-image">
                                <a href="/#" className="image" />
                                <img className="pic-1" src={item.img} alt={"..."} />
                                <img className="pic-2" src={item.img} alt={"..."} />
                                <ul className="product-links">
                                    <li><a href="/#" onClick={
                                        (e) => {
                                            e.preventDefault();
                                            const user = JSON.parse(localStorage.getItem("user"));
                                            axios.get(`http://localhost:3001/users/${user.id}`).then(response => {
                                                const user = response.data;
                                                if (!user.cart.find((cartItem) => cartItem.id === item.id)) {
                                                    item.count = 1;
                                                    user.cart.push(item);
                                                }
                                                axios.put(`http://localhost:3001/users/${user.id}`, user).then(response => {
                                                })
                                            })
                                            Swal.fire({
                                                position: 'bottom-end',
                                                icon: 'success',
                                                title: 'Item added to cart',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        }
                                    }><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <ul className="rating">
                                    {
                                        Array(item.rate).fill().map((_, i) => (
                                            <li className="fa fa-star" key={i}></li>
                                        ))
                                    }
                                </ul>
                                <h3 className="title"><a onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = `/product/${item.id}`
                                }}>{item.dsc}</a></h3>
                                <div className="price" style={{ color: "black" }}>${item.price}</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}