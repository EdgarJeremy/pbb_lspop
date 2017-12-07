import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Route, NavLink, Redirect } from "react-router-dom";
import Card from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Dialog from "material-ui/Dialog";
import FlatButton from 'material-ui/FlatButton';
import AdminApi from "../services/AdminApi";
import Api from "../services/Api";
import LoadingScreen from "../components/LoadingScreen";

/**
 * Pages
 */
import AdminHome from "./admin_pages/AdminHome";
import DaftarSpop from "./admin_pages/DaftarSpop";
import DaftarLspop from "./admin_pages/DaftarLspop";
import DaftarPengguna from "./admin_pages/DaftarPengguna";

export default class Admin extends React.Component {

    state = {
        logoutDialog: false,
        ready: false,
        is_logged_in: true,
        cek_count: 0
    }
    constructor(props) {
        super(props);
        this.match = props.match;
        this.onOpenLogoutDialog = this.onOpenLogoutDialog.bind(this);
        this.onCloseLogoutDialog = this.onCloseLogoutDialog.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentWillMount() {
        this.cekLogin();
    }

    componentWillUpdate(o, n) {
        console.log(o, n);
    }

    cekLogin() {
        Api.cek().then((response) => {
            this.setState({ ready: true, is_logged_in: response.status });
        });
    }

    onOpenLogoutDialog() {
        this.setState({
            logoutDialog: true
        });
    }

    onCloseLogoutDialog() {
        this.setState({
            logoutDialog: false
        });
    }

    onLogout() {
        AdminApi.logout().then((response) => {
            console.log(response);
            this.props.history.push("/login");
        });
    }

    render() {
        if (this.state.ready) {
            if (this.state.is_logged_in) {
                return (
                    <MuiThemeProvider>
                        <div>
                            <Card className="card-super-wide">
                                <div className="heading-container">
                                    <div className="left" style={{ display: "inline-block" }}>
                                        <div>
                                            <h1><span className="overlay black">Dashboard</span></h1>
                                            <h3><span>form pajak bumi & bangunan</span></h3>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <img src={require("../assets/images/logo.png")} alt="Logo" />
                                    </div>
                                </div>
                                <div className="body-container pages-container">
                                    <div className="navigation">
                                        <h2>Menu</h2>
                                        <List>
                                            <Divider />
                                            <ListItem leftIcon={<i className="material-icons">home</i>} containerElement={<NavLink activeClassName="active" to={`${this.match.path}/home`} />} primaryText="Beranda" />
                                            <ListItem leftIcon={<i className="material-icons">list</i>} containerElement={<NavLink to={`${this.match.path}/spop`} />} primaryText="Daftar masuk SPOP" />
                                            <ListItem leftIcon={<i className="material-icons">list</i>} containerElement={<NavLink to={`${this.match.path}/lspop`} />} primaryText="Daftar masuk LSPOP" />
                                            <Divider />
                                            <ListItem leftIcon={<i className="material-icons">playlist_add_check</i>} containerElement={<NavLink to={`${this.match.path}/spop_approved`} />} primaryText="Daftar SPOP Terverifikasi" />
                                            <ListItem leftIcon={<i className="material-icons">playlist_add_check</i>} containerElement={<NavLink to={`${this.match.path}/lspop_approved`} />} primaryText="Daftar LSPOP Terverifikasi" />
                                            <Divider />
                                            <ListItem leftIcon={<i className="material-icons">account_circle</i>} containerElement={<NavLink activeClassName="active" to={`${this.match.path}/pengguna`} />} primaryText="Pengaturan Pengguna" />
                                            <Divider />
                                            <ListItem onClick={this.onOpenLogoutDialog} leftIcon={<i className="material-icons">keyboard_backspace</i>} style={{ fontSize: "14px", color: "#c0392b", fontWeight: "bolder" }} primaryText="Logout" />
                                            <Divider />
                                        </List>
                                    </div>
                                    <div className="page">
                                        <Route path={`${this.match.path}/home`} component={AdminHome} />
                                        <Route path={`${this.match.path}/spop`} render={(props) => <DaftarSpop {...props} approved={0} />} />
                                        <Route path={`${this.match.path}/lspop`} render={(props) => <DaftarLspop {...props} approved={0} />} />
                                        <Route path={`${this.match.path}/spop_approved`} render={(props) => <DaftarSpop {...props} approved={1} />} />
                                        <Route path={`${this.match.path}/lspop_approved`} render={(props) => <DaftarLspop {...props} approved={1} />} />
                                        <Route path={`${this.match.path}/pengguna`} component={DaftarPengguna} />
                                    </div>
                                </div>
                            </Card>
                            <Dialog
                                actions={[
                                    <FlatButton
                                        label="Batal"
                                        primary={true}
                                        onClick={this.onCloseLogoutDialog}
                                    />,
                                    <FlatButton
                                        onClick={this.onLogout}
                                        secondary
                                        label="Ya"
                                    />
                                ]}
                                modal={false}
                                title="Konfirmasi logout"
                                contentStyle={{ width: "20%" }}
                                open={this.state.logoutDialog}
                                onRequestClose={this.onCloseLogoutDialog}>
                                Apa anda yakin ingin keluar?
                            </Dialog>
                        </div>
                    </MuiThemeProvider >
                );
            } else {
                return (<Redirect to="/login" />);
            }
        } else {
            return (
                <MuiThemeProvider>
                    <LoadingScreen fromTop="150px" />
                </MuiThemeProvider>
            )
        }

    }

}