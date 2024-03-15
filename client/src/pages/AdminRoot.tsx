// @ts-nocheck

// ⛏️⛏️ ALL OPERATIONS OF ADMIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
import React, { Component } from 'react';
import '../style/Admin.css';
import withNavigate from '../HOC/withNavigate';
import { Navigate, Outlet } from 'react-router-dom';
import Menu from '../components/elements/Menu';





class AdminRoot extends Component {

    render() {
        return (<div className="Admin">
            <Menu />
            <div className="container">
               <Outlet />
            </div>
        </div>
        );
    }
}


export default withNavigate(AdminRoot);