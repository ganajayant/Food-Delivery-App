import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Login } from "./Pages/Auth/Login";
import { Cart } from "./Pages/Cart/Cart";
import { Home } from "./Pages/Home";
import { OrdersPlaced } from "./Pages/OrdersPlaced/OrdersPlaced";
import { Product } from "./Pages/Product/Product";
import { Products } from "./Pages/ProductsPage/Products";

function PrivateOutlet(props) {
    if (localStorage.getItem("user")) {
        return <Outlet {...props} />
    } else {
        return <Navigate to="/login" />
    }
}

export const App = () => {
    return <Routes>
        <Route exact path="/" element={<PrivateOutlet />} >
            <Route path="/" element={<Home />} />
        </Route>
        <Route exact path="/products" element={<PrivateOutlet />} >
            <Route path="/products" element={<Products />} />
        </Route>
        <Route exact path="/product/:id" element={<PrivateOutlet />} >
            <Route path="/product/:id" element={<Product />} />
        </Route>
        <Route exact path="/cart" element={<PrivateOutlet />} >
            <Route path="/cart" element={<Cart />} />
        </Route>
        <Route exact path="/orders" element={<PrivateOutlet />} >
            <Route path="/orders" element={<OrdersPlaced />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
    </Routes >
}