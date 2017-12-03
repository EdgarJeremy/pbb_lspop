import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './containers/Home';
import Login from './containers/Login';
import Spop from './containers/Spop';
import Lspop from './containers/Lspop';
import Admin from "./containers/Admin";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login} />
          <Route path="/spop" component={Spop} />
          <Route path="/lspop" component={Lspop} />
          <Route path="/admin" component={Admin} />
        </div>
      </Router>
    );
  }
}

export default App;
