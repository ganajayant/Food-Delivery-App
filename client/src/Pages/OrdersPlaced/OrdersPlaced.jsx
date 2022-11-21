import axios from "axios"
import { useEffect, useState } from "react"

import { Navbar } from "../../Components/Navbar/Navbar"

export const OrdersPlaced = () => {
    const [state, setState] = useState([])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        axios.get(`http://localhost:3001/users/${user.id}`).then(response => {
            const orders = response.data;
            setState(orders.previousOrders);
        })
    }, [])
    return <div>
        <Navbar />
        <div className="container" style={{ width: "100%" }}>
            <div className="row">
                <div className="col-md-12">
                    <h1 style={{ textAlign: "center" }}>Orders Placed</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Order Date</th>
                                <th>Order Status</th>
                                <th>Order Total</th>
                                <th>Order Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.map((order) => {
                                return <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.date}</td>
                                    <td>{order.status}</td>
                                    <td>${order.total}</td>
                                    <td>{order.orderdetails.length}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}