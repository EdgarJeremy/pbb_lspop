import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

const AlertPopup = ({title,content,onClose,open,render,width}) => (
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
        contentStyle={{ width: width }}
        open={open}
        onRequestClose={onClose}>
        {content}
        <br /><br />
        {render}
    </Dialog>
);

export default AlertPopup;