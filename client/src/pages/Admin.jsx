// ⛏️⛏️ ALL OPERATIONS OF ADMIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
import React, { Component } from 'react';
import { hostname } from '../utils/global';


class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            registerEmail: "",
            registerPassword: "",
            loginEmail: "",
            loginPassword: "",
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }



    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }



    async handleRegister(e) {
        e.preventDefault();
        // console.log(this.state);
        const response = await fetch(`${hostname}/api/admin/register`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        });
        console.log("Response - ", response);
    }




    async handleLogin(e) {
        e.preventDefault();
        // console.log(this.state);
        const response = await fetch(`${hostname}/api/admin/login`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.loginEmail,
                password: this.state.loginPassword
            })
        });
        console.log("Response - ", response);
    }




    render() {
        return (
            <div className="Admin">
                <div className="container">
                    {/* ⛏️⛏️ REGISTER ADMIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */}
                    <form className="register-admin">
                        <h2 className="text-primary">Register</h2>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" name="username" className="form-control" placeholder="Neymar JR" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" name="registerEmail" className="form-control" placeholder="name@example.com" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">password address</label>
                            <input type="password" name="registerPassword" className="form-control" autoComplete="on" placeholder="******" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" onClick={this.handleRegister}>Submit</button>
                        </div>
                    </form>

                    <br /><br /><br />

                    {/* ⛏️⛏️ LOGIN ADMIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */}
                    <form className="login-admin">
                        <h2 className="text-primary">Login</h2>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="loginEmail" className="form-control" placeholder="name@example.com" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">password</label>
                            <input type="password" name="loginPassword" className="form-control" autoComplete="on" placeholder="******" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" onClick={this.handleLogin} >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default Admin;