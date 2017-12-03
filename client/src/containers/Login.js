/**
 * Components
 */
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import { Card } from "material-ui/Card";
import { Link,Redirect } from "react-router-dom";
import TextField from "material-ui/TextField";
import LinearProgress from "material-ui/LinearProgress";
import LoadingScreen from "../components/LoadingScreen";

/**
 * Services
 */
import Api from "../services/Api";

export default class Login extends React.Component {

    state = {
        form_data: {},
        error_fields: {},
        progress_complete: 0,
        ready: false,
        is_logged_in: null
    }

    timeout = null;

    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.clearError = this.clearError.bind(this);
        this.cekLogin();
    }

    cekLogin() {
        Api.cek().then((response) => {
            this.setState({ready: true,is_logged_in: response.status});
        })
    }

    onChangeText(e,v) {
        const {form_data} = this.state;
        form_data[e.target.name] = v;
        this.setState({form_data});
    }

    clearError(e) {
        const {error_fields} = this.state;
        error_fields[e.target.name] = undefined;
        this.setState({error_fields});
    }

    onLogin() {
        console.log("onLogin");
        Api.login(this.state.form_data,(complete) => {
            this.setState({progress_complete: complete});
            this.timeout = setTimeout(() => {
                this.setState({progress_complete: 0});
            },2000);
        }).then((response) => {
            if(response.status === "ERRORFIELDS") {
                const {error_fields} = this.state;
                for(let i=0;i<response.fields.length;i++) {
                    error_fields[response.fields[i]] = `Field ${response.fields[i]} harus diisi!`;
                }
                this.setState({error_fields});
            } else if(response.status === false) {
                this.setState({error: "Username atau password anda salah"});
            } else {
                this.props.history.push("/admin");
            }
        }).catch(err => console.log(err));
    }

    componentWillUnmount() {
        console.log("Unmount!");
        if(this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    render() {
        if(this.state.ready) {
            if(!this.state.is_logged_in) {
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
                                    onKeyUp={e => (e.keyCode === 13) && this.onLogin()}
                                    onFocus={this.clearError}
                                    errorText={this.state.error_fields.username}
                                    name="username"
                                    onChange={this.onChangeText}
                                    fullWidth
                                    hintText="Masukkan username"
                                    floatingLabelText="Username"
                                />
                                <TextField
                                    onKeyUp={e => (e.keyCode === 13) && this.onLogin()}
                                    onFocus={this.clearError}
                                    errorText={this.state.error_fields.password}
                                    type="password"
                                    name="password"
                                    onChange={this.onChangeText}
                                    fullWidth
                                    hintText="Masukkan password"
                                    floatingLabelText="Password"
                                />
                                <RaisedButton
                                    primary
                                    onClick={this.onLogin}
                                    fullWidth
                                    label="MASUK"
                                />
                            </div>
                            <LinearProgress 
                                style={{marginTop: 20,marginBottom: 20}}
                                mode="determinate" value={this.state.progress_complete} />
                            <div className="foot-container">
                                <p className="error">{this.state.error}</p>
                                <p className="copy">Copyright 2017 all rights reserved</p><br />
                                <Link to="/">Public area</Link>
                            </div>
                        </Card>
                    </MuiThemeProvider>
                );
            } else {
                return (<Redirect to="/admin" />);
            }
        } else {
            return(
                <MuiThemeProvider>
                    <LoadingScreen fromTop="150px" />
                </MuiThemeProvider>
            )
        }
        
    }

}