/**
 * Components
 */
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import { Link } from "react-router-dom";

import FormInputSpop from "../components/FormInputSpop";


export default class Spop extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Card className="card-wide">
                        <div className="heading-container">
                            <div className="left" style={{ display: "inline-block" }}>
                                <div style={{ width: "20%", float: "left" }}>
                                    <Link to="/">
                                        <IconButton
                                            tooltip="KEMBALI"
                                            tooltipPosition="top-left">
                                            <i className="material-icons">keyboard_arrow_left</i>
                                        </IconButton>
                                    </Link>
                                </div>
                                <div style={{ width: "80%", float: "left" }}>
                                    <h1>SPOP</h1>
                                    <h3><span>Surat Pemberitahuan Objek Pajak</span></h3>
                                </div>
                            </div>
                            <div className="right">
                                <img src={require("../assets/images/logo.png")} alt="Logo" />
                            </div>
                        </div>
                        <FormInputSpop />
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }

} 