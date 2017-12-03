import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

const AlertPopup = ({title,content,onClose,open}) => (
    <Dialog
        actions={[
            <FlatButton
                label="OK"
                primary={true}
                onClick={onClose}
            />
        ]}
        modal={false}
        title={title}
        contentStyle={{ width: "20%" }}
        open={open}
        onRequestClose={onClose}>
        {content}
    </Dialog>
);

export default AlertPopup;