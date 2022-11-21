import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Navbar } from "../../Components/Navbar/Navbar";

export const Product = () => {
    const { id } = useParams();
    const [state, setState] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:3001/menu/${id}`).then(response => {
            setState(response.data)
        })
    }, [id])
    return <div>
        <Navbar />
        <div className="row">
            <div className="col-md-6">
                <div className="images p-3">
                    <div className="text-center p-4" style={{ marginTop: "5em" }}> <img id="main-image" src={state.img} width="300" alt={"..."} /> </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="product p-4" style={{ marginTop: "4em" }}>
                    <div className="mt-4 mb-3" >
                        <span className="text-uppercase text-muted brand">{state.name}</span>
                        <h5 className="text-uppercase">{state.dsc}</h5>
                        <div className="price d-flex flex-row align-items-center"> <span className="act-price">$ {state.price}</span>
                        </div>
                    </div>
                    <p className="about">Country:{state.country}</p>
                    <div className="cart mt-4 align-items-center" style={{ color: "white" }}> <button className="btn text-uppercase mr-2 px-4" style={{ backgroundColor: "black" }} onClick={(e) => {
                        e.preventDefault();
                        const user = JSON.parse(localStorage.getItem("user"));
                        axios.get(`http://localhost:3001/users/${user.id}`).then(response => {
                            const user = response.data;
                            if (!user.cart.find((cartItem) => cartItem.id === state.id)) {
                                state.count = 1;
                                user.cart.push(state);
                            }
                            axios.put(`http://localhost:3001/users/${user.id}`, user).then(response => {
                            })
                        })
                    }} >Add to cart</button> </div>
                </div>
            </div>
        </div >
    </div>

}