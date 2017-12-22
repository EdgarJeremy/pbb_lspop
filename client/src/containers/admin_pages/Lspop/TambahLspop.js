import React from "react";
import IconButton from "material-ui/IconButton";
import { Link } from "react-router-dom";

import FormInputLspop from "../../../components/FormInputLspop";

export default class TambahLspop extends React.Component {

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
                            <h2 className="content-title" style={{marginBottom: 0}}>Tambah LSPOP</h2>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <FormInputLspop />
                </div>
            </div>
        );
    }

}