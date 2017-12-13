import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './containers/Home';
import Login from './containers/Login';
import Spop from './containers/Spop';
import Lspop from './containers/Lspop';
import Admin from "./containers/Admin";
import CekStatus from './containers/CekStatus';
import DataPendaftaran from './containers/DataPendaftaran';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login} />
          <Route path="/spop" component={Spop} />
          <Route path="/lspop" component={Lspop} />
          <Route path="/cek_status" component={CekStatus} />
          <Route path="/data_pendaftaran/:jenis_surat/:nomor_pendaftaran" component={DataPendaftaran} />
          <Route path="/admin" component={Admin} />
        </div>
      </Router>
    );
  }
}

export default App;
