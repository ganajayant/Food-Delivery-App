import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

import "./Login.css";

export const Login = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        cart: [],
        previousOrders: [],
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/users", state)
        Swal.fire({
            title: "Success!",
            text: "You have successfully registered!",
            icon: "success",
            confirmButtonText: "Cool",
            confirmButtonColor: '#000000'
        })
    }

    return <div className="container" id="container" style={{ marginTop: "6em" }}>
        <div className="form-container sign-up-container">
            <form action="#">
                <h1>Create Account</h1>
                <input type="text" placeholder="Name" name="name" value={
                    state.name
                } onChange={
                    handleChange
                } />
                <input type="email" placeholder="Email" name="email" value={
                    state.email
                } onChange={
                    handleChange
                } />
                <input type="password" placeholder="Password" name="password" value={
                    state.password
                } onChange={
                    handleChange
                } />
                <button onClick={
                    handleSubmit
                }>Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form action="#">
                <h1>Sign in</h1>
                <input type="email" placeholder="Email" name="email" value={
                    state.email
                } onChange={
                    handleChange
                } />
                <input type="password" placeholder="Password" name="password" value={
                    state.password
                } onChange={
                    handleChange
                } />
                <a href="/#">Forgot your password?</a>
                <button onClick={async (e) => {
                    e.preventDefault();
                    // authenticate user
                    const response = await axios.get("http://localhost:3001/users")
                    const { data } = response
                    const user = data.find(user => user.email === state.email && user.password === state.password)

                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user))
                        Swal.fire({
                            title: "Success!",
                            text: "You have successfully logged in!",
                            icon: "success",
                            confirmButtonText: "Cool",
                            confirmButtonColor: '#000000'
                        })
                        window.location.href = "/"
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Invalid email or password!",
                            icon: "error",
                            confirmButtonText: "Cool",
                            confirmButtonColor: '#000000'

                        })
                    }
                }} >Sign In</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button className="ghost" id="signIn" onClick={() => {
                        document.getElementById('container').classList.remove("right-panel-active");
                    }}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button className="ghost" id="signUp" onClick={() => {
                        document.getElementById('container').classList.add("right-panel-active");
                    }}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
}
