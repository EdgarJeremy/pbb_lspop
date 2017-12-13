/**
 * Components
 */
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import { Card } from "material-ui/Card";
import { Link, Redirect } from "react-router-dom";
import TextField from "material-ui/TextField";
import LinearProgress from "material-ui/LinearProgress";
import LoadingScreen from "../components/LoadingScreen";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

/**
 * Services
 */
import Api from "../services/Api";

export default class CekStatus extends React.Component {

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
        this.onCekStatus = this.onCekStatus.bind(this);
        this.clearError = this.clearError.bind(this);
    }

    onChangeText(e, v) {
        const { form_data } = this.state;
        form_data[e.target.name] = v;
        this.setState({ form_data });
    }

    clearError(e) {
        const { error_fields } = this.state;
        error_fields[e.target.name] = undefined;
        this.setState({ error_fields });
    }

    clearErrorSelect(name) {
        const { error_fields } = this.state;
        error_fields[name] = undefined;
        this.setState({ error_fields });
    }

    onCekStatus() {
        Api.cek_status(this.state.form_data, (complete) => {
            this.setState({ progress_complete: complete });
            this.timeout = setTimeout(() => {
                this.setState({ progress_complete: 0 });
            }, 2000);
        }).then((response) => {
            if (response.status === "ERRORFIELDS") {
                const { error_fields } = this.state;
                for (let i = 0; i < response.fields.length; i++) {
                    error_fields[response.fields[i]] = `Field ${response.fields[i]} harus diisi!`;
                }
                this.setState({ error_fields });
            } else if (response.status === false) {
                this.setState({ error: `Pendaftaran dengan nomor ${this.state.form_data.nomor_pendaftaran} tidak ditemukan` });
            } else {
                this.props.history.push(`/data_pendaftaran/${this.state.form_data.jenis_surat}/${this.state.form_data.nomor_pendaftaran}`);
            }
        }).catch(err => console.log(err));
    }

    changeSelect(name) {
        return (e, i, v) => {
            const { form_data } = this.state;
            form_data[name] = v;
            this.setState({ form_data });
        }
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <Card className="container card-flat">
                    <div className="logo-container">
                        <img className="logo-image" src={require("../assets/images/logo.png")} alt="Logo" />
                    </div>
                    <hr style={{ borderWidth: 0, borderBottomWidth: 1, borderBottomColor: "#ddd", marginRight: 30, marginLeft: 30, marginTop: 20, marginBottom: 30 }} />
                    <div className="card-form">
                        <h3>Cek Status Pendaftaran</h3>
                        <SelectField
                            hintText="Jenis Surat"
                            style={{width: "100%"}}
                            onClick={() => this.clearErrorSelect("jenis_surat")}
                            errorText={this.state.error_fields.jenis_surat}
                            value={this.state.form_data.jenis_surat}
                            onChange={this.changeSelect("jenis_surat")}>
                            <MenuItem value="spop" primaryText="SPOP" />
                            <MenuItem value="lspop" primaryText="LSPOP" />
                        </SelectField>
                        <TextField
                            onKeyUp={e => (e.keyCode === 13) && this.onCekStatus()}
                            onFocus={this.clearError}
                            errorText={this.state.error_fields.nomor_pendaftaran}
                            name="nomor_pendaftaran"
                            onChange={this.onChangeText}
                            fullWidth
                            hintText="Nomor Pendaftaran (XXXXXXXX-XXXX)"
                        />
                        <RaisedButton
                            primary
                            onClick={this.onCekStatus}
                            fullWidth
                            label="CEK"
                        />
                    </div>
                    <LinearProgress
                        style={{ marginTop: 20, marginBottom: 20 }}
                        mode="determinate" value={this.state.progress_complete} />
                    <div className="foot-container">
                        <p className="error">{this.state.error}</p>
                        <p className="copy">Copyright 2017 all rights reserved</p><br />
                        <Link to="/">Beranda</Link>
                    </div>
                </Card>
            </MuiThemeProvider>
        );

    }

}