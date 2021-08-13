import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import { Button } from 'react-bootstrap';
import { Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
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

export default App;
