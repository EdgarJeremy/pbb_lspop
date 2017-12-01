import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './containers/Home';
import Login from './containers/Login';
import Spop from './containers/Spop';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/spop" component={Spop} />
        </div>
      </Router>
    );
  }
}

export default App;
