import React from 'react';
import { Link } from 'react-router-dom';
import { hostname } from '../utils/global';
import { Navbar, Nav, Container } from 'react-bootstrap';


const Menu = (props) => {
    /* ⛏️⛏️ LOGOUT EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    const handleLogout = async () => {

        try {
            const response = await fetch(`${hostname}/api/admin/logout`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            props.authValidation(false);
            if (response.status === 200) {
                const text = await response.text();
                console.log(JSON.parse(text));
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="Navbar">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand ><Link className="nav-link" to="/home">Spikeball</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link" to="/home">Home</Link>
                            <Link className="nav-link" to="/admin">Admin</Link>
                        </Nav>
                        <Nav>
                            {props.isAuthenticated ? (<li className="nav-item"><button className="btn btn-danger" onClick={handleLogout}>Logout</button></li>) : null}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    );
}


export default Menu;