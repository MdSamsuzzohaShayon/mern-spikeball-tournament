/* ⛏️⛏️ SHOW ALL EVENTS USER  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */

import React, { Component } from 'react';
import {hostname} from '../utils/global';

export class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }
    async handleLogout() {

        try {
            const response = await fetch(`${hostname}/api/admin/logout`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                console.log(response);
                // const textRes = await response.text();
                // const jsonRes = await JSON.parse(textRes);
                this.props.authValidation(false);
            }
        } catch (error) {
            console.log(error);
        }

    }
    render() {
        return (
            <div>
                Dashboard
                <button className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default Dashboard;
