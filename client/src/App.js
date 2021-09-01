// ⛏️⛏️ MAIN APP FILE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import Menu from './components/Menu';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import React, { Component } from 'react';
import { hostname } from "./utils/global";
import Page404 from './pages/Page404';
import EventAdmin from './components/admin/EventAdmin';
import Event from './components/event/Event';


class App extends Component {
  constructor(props) {
    super(props);
    this.isMountedValue = false;
    this.state = {
      isAuthenticated: false,
      currentEventId: null
    };
    this.getAuthenticatedUser = this.getAuthenticatedUser.bind(this);
  }


  authValidation = (isAuthenticated) => {
    this.setState({ isAuthenticated })
  }




  // ⛏️⛏️ GET AUTHENTICATED USER ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
  async getAuthenticatedUser() {
    this.isMountedValue = true;
    const response = await fetch(`${hostname}/api/admin/dashboard`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    });
    const textRes = await response.text();
    const jsonRes = await JSON.parse(textRes);
    // console.log("User - ",jsonRes.user);
    if (this.isMountedValue) {
      if (jsonRes.user) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    }
  }


  componentDidMount() {
    this.getAuthenticatedUser();
  }



  // NEVER UPDATE STATE INSIDE COMPONENT DID UPDATE 
  // PROBLEM WITH THIS AS WELL 
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("Previous props - ", prevProps);
    // console.log("Previous State - ", prevState.isAuthenticated + " Current state - ", this.state.isAuthenticated);

    // this.getAuthenticatedUser(); // INSIDE GET AUTHENTICATED STATE IS BEING UPDATING 
    // check whether client has changed

    if (prevState.isAuthenticated !== this.state.isAuthenticated) {
      this.getAuthenticatedUser();
    }
    // debugger;
  }

  componentWillUnmount() {
    // console.log("Appjs unmounted");
    this.isMountedValue = false;
    this.setState({ isAuthenticated: false });
  }
  render() {
    console.log("Authenticated - " , this.state.isAuthenticated);
    return (
      <div className="App">
        <Menu authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/home"><Home /></Route>
          <Route exact path="/admin">
            {this.state.isAuthenticated ? <Redirect to="/admin/dashboard" /> : <Admin authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} />}
          </Route>
          <Route exact path="/admin/dashboard">
            {this.state.isAuthenticated ? <Dashboard authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} /> : <Redirect to="/admin" />}
          </Route>
          <Route exact path="/admin/dashboard/event/:id" >
             <EventAdmin isAuthenticated={this.state.isAuthenticated} /> 
          </Route>
          <Route exact path="/event/:id" >
             <Event /> 
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;






