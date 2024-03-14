import React, { useState } from "react";
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        number: ""
    });

    const registration = () => {
        const { email, password, name, number } = user;
        if (email && password && name && number) {
            axios.post(`http://localhost:4000/Register`, user)
                .then((res) => {
                    if (res.data.msg) {
                        alert(res.data.msg);
                        navigate('/');
                    } else {
                        alert(res.data.error);
                    }
                })
                .catch(error => {
                    console.error('Error registering user:', error);
                    alert("Something went wrong");
                });
        } else {
            alert("All fields are required");
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    return (
        <div className="container-fluid loginbackground" style={{ marginTop: '80px' }}>
            <div className="row justify-content-center">
                <div className="col-md-4 p-5 loginForm" style={{ background: "rgb(240, 240, 240)" }}>
                    <div className="row">
                        <h5 className="text-center" style={{ color: "rgb(7,36,62)" }}>Register Here</h5>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="employeeName" className="form-label">UserName</label>
                        <input type="text" className="form-control inputLogin" id="employeeName" aria-describedby="emailHelp" name="name" onChange={handleChange} style={{ width: "100%" }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control inputLogin" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange} style={{ width: "100%" }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control inputLogin" id="exampleInputPassword1 myInput" name='password' onChange={handleChange} style={{ width: "100%" }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputContact" className="form-label">Mobile No:</label>
                        <input type="number" className="form-control inputLogin" id="exampleInputContact myInput" name='number' onChange={handleChange} style={{ width: "100%" }} />
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-6">
                            <button type="submit" onClick={registration} className="btn btn-primary w-100" style={{ background: "rgb(7, 36, 62)", color: "white", width: "100%" }}>Register</button>
                        </div>
                        <div className="col-6">
                            <button type="button" className="btn btn-primary w-100" style={{ background: "rgb(7, 36, 62)", color: "white", width: "100%" }}>
                                <NavLink to='/' style={{ textDecoration: "none", color: "white" }}>Login</NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
