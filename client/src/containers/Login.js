import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import { Card } from "material-ui/Card";
import { Link } from "react-router-dom";
import TextField from "material-ui/TextField";

export default class Login extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
                <Card className="container card-flat">
                    <div className="logo-container">
                        <img className="logo-image" src={require("../assets/images/logo.png")} alt="Logo" />
                    </div>
                    <hr style={{ borderWidth: 0, borderBottomWidth: 1, borderBottomColor: "#ddd", marginRight: 30, marginLeft: 30, marginTop: 20, marginBottom: 30 }} />
                    <div className="card-form">
                        <h3>Administrator Login</h3>
                        <TextField
                            fullWidth
                            hintText="Masukkan username"
                            floatingLabelText="Username"
                        />
                        <TextField
                            fullWidth
                            hintText="Masukkan password"
                            floatingLabelText="Password"
                        />
                        <RaisedButton
                            primary
                            fullWidth
                            label="MASUK"
                        />
                    </div>
                    <hr style={{ borderWidth: 0, borderBottomWidth: 1, borderBottomColor: "#ddd", marginRight: 30, marginLeft: 30, marginTop: 30, marginBottom: 20 }} />
                    <div className="foot-container">
                        <p>Copyright 2017 all rights reserved</p><br />
                        <Link to="/">Public area</Link>
                    </div>
                </Card>
            </MuiThemeProvider>
        );
    }

}