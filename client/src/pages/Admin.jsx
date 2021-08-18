// ⛏️⛏️ ALL OPERATIONS OF ADMIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
import React, { Component } from 'react';
import { hostname } from '../utils/global';
import Login from '../components/admin/Login';
import './Admin.css';





class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginEmail: "",
            loginPassword: "",
            errors: [],
            success: "",
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


// ⛏️⛏️ VALUE IS COMING FROM CHILD COMPONENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    componentDidMount(){
        console.log("Update");
    }
    componentDidUpdate(){
        console.log("Update");
    }
    componentWillUnmount(){
        console.log("Unmount");
    }







    // ⛏️⛏️ LOGIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    async handleLogin(e) {
        e.preventDefault();
        try {
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
            if (response.status === 200) {
                const textRes = await response.text();
                const jsonRes = await JSON.parse(textRes);
                // console.log("Json - ", jsonRes);
                // if (jsonRes.user) {
                //     this.setState({
                //         errors: [],
                //         success: "Login successfull"
                //     });
                //     // REDIRECT FROM  HERE TO DASHBOARD 
                // }

                this.setState({
                    errors: [],
                    success: "Login successfull"
                });

                this.props.authValidation(true);
            }

            if (response.status === 400 || response.status === 401) {
                this.setState({
                    errors: [...this.state.errors, { msg: "Your email or password is invalid" }],
                    success: "",
                });
                this.props.authValidation(false);

            }
        } catch (error) {
            console.log(error);
        }
    }








    render() {
        return (
            <div className="Admin">
                <div className="container">
                    <Login 
                    success={this.state.success} 
                    handleChange={this.handleChange} 
                    errors={this.state.errors} 
                    handleLogin={this.handleLogin} 
                    />
                </div>
                {/* {this.checkErrors()} */}
            </div>
        );
    }
}


export default Admin;