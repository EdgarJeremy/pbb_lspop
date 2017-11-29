import React, { Component } from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import Grid from "material-ui/Grid";
import "./assets/css/styles.css";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="container card-flat">
          <div className="logo-container">
            <img className="logo-image" src={require("./assets/images/logo.png")} alt="Logo" />
          </div>
          <hr style={{ marginTop: 30, marginBottom: 30 }} />
          <Grid container spacing={8}>
            <Grid item lg={6}>
              <h2>tst</h2>
              {/* <Card>
                <h2>LSPOP</h2>
              </Card> */}
            </Grid>
            <Grid item lg={6}>
            <h2>tst</h2>
            {/* <Card>
              <h2>LSPOP</h2>
            </Card> */}
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
