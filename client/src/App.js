// ⛏️⛏️ MAIN APP FILE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import Menu from './components/Menu';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import React, { Component } from 'react';
import { hostname } from "./utils/global";
import Page404 from './pages/Page404';
import EventAdmin from './components/admin/EventAdmin';
import Score from './components/score/Score';


class App extends Component {
  constructor(props) {
    super(props);
    this.isMountedValue = false;
    this.state = {
      isLoading: false,
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
    try {
      this.isMountedValue = true;
      this.setState({ isLoading: true });
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
      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }


  componentDidMount() {
    // console.log("Auth - ",this.state.isAuthenticated);
    this.getAuthenticatedUser();
  }



  // NEVER UPDATE STATE INSIDE COMPONENT DID UPDATE 
  // PROBLEM WITH THIS AS WELL 
  /*
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
  */

  componentWillUnmount() {
    // console.log("Appjs unmounted");
    this.isMountedValue = false;
    this.setState({ isAuthenticated: false });
  }
  render() {
    // console.log("Authenticated - " , this.state.isAuthenticated);
    return (
      <div className="App">
        <Menu authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/home"><Home /></Route>
          <Route exact path="/admin">
            {this.state.isAuthenticated === true ? <Redirect to="/admin/dashboard" /> : <Admin authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} />}
          </Route>
          <Route exact path="/admin/dashboard">
            {this.state.isAuthenticated === true ? <Dashboard authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} /> : <Redirect to="/admin" />}
          </Route>
          <Route exact path="/admin/dashboard/event/:id" >
            {/* {this.state.isLoading ? (<div className="text-center spinner-parent">
              <div className="spinner-border text-danger spinner-child" role="status">
              </div>
            </div>) : <React.Fragment>
              {this.state.isAuthenticated ? <EventAdmin isAuthenticated={this.state.isAuthenticated} /> : <Redirect to="/admin" />}
            </React.Fragment>} */}

            <EventAdmin isAuthenticated={this.state.isAuthenticated} /> 
          </Route>
          <Route exact path="/event/:id" >
            <Score admin={false} />
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






