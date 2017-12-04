import React from "react";
import AlertPopup from "./AlertPopup";

export default class Alert extends React.Component {

    state = {
        title: "Title",
        message: "Message",
        open: false
    };

    setTitle(title) {
        this.setState({title});
        return this;
    }

    setMessage(message) {
        this.setState({message});
        return this;
    }

    open() {
        this.setState({open: true});
        return this;
    }

    close() {
        this.setState({open: false});
        return this;
    }

    render() {
        return (
            <AlertPopup open={this.state.open} onClose={() => this.setState({ open: false })} title={this.state.title} content={this.state.message} />
        )
    }


}