import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const login = async () => {
        try {
            const res = await axios.post(`http://localhost:4000/login`, user);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                if (res.data.role === 'voter') {
                    navigate('/vote');
                } else if (res.data.role === 'admin') {
                    navigate('/Admin'); 
                } else {
                    console.log("Unknown user role");
                    alert("Login failed");
                }
            } else {
                console.log(res.data);
                alert("Login failed");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert("Failed to login. Please try again.");
        }
    };

    return (
        <div className='container-fluid loginbackground' style={{ marginTop: '100px' }}>
            <div className="row justify-content-center">
                <div className="col-md-4 p-5 loginForm" style={{ background: "rgb(240, 240, 240)", maxWidth: "500px", margin: "auto" }}>
                    <div className="row">
                        <h5 className='text-center' style={{ color: "rgb(7, 36, 62)" }}>Login Here</h5>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">UserName</label>
                        <input type="text" className="form-control inputLogin" id="exampleInputName" aria-describedby="nameHelp" name="name" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control inputLogin" id="exampleInputPassword1 myInput" name='password' onChange={handleChange} />
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-6">
                            <NavLink to='/Register'>
                                <button className="btn btn w-100" style={{ background: "black", color: "white", width: "100%" }}>Register</button>
                            </NavLink>
                        </div>
                        <div className="col-6">
                            <button type="submit" onClick={login} className="btn btn w-100" style={{ background: "black", color: "white", width: "100%" }}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
