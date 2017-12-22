import React from "react";
import IconButton from "material-ui/IconButton";
import { Link } from "react-router-dom";

import FormInputSpop from "../../../components/FormInputSpop";

export default class TambahSpop extends React.Component {

    render() {
        return (
            <div>
                <div className="content-head">
                    <div style={{ display: "inline-block", width: "100%" }}>
                        <div style={{ float: "left" }}>
                            <Link to={`${this.props.parent_url}`}>
                                <IconButton
                                    tooltip="KEMBALI"
                                    tooltipPosition="bottom-right">
                                    <i className="material-icons">keyboard_arrow_left</i>
                                </IconButton>
                            </Link>
                        </div>
                        <div style={{ float: "left",padding: "7px" }}>
                            <h2 className="content-title" style={{marginBottom: 0}}>Tambah SPOP</h2>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <FormInputSpop />
                </div>
            </div>
        );
    }

}