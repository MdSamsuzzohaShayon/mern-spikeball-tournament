// ⛏️⛏️ MAIN APP FILE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/home"><Home /></Route>
          <Route path="/admin"><Admin /></Route>
        </Switch>
      </div>
    );
  }
}

export default App;






