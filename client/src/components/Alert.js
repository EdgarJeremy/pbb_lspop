import React from "react";
import LinearProgress from "material-ui/LinearProgress";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

export default class Alert extends React.Component {

    state = {
        title: "Title",
        message: "Message",
        open: false,
        render: null,
        width: "20%",
        progress: 0,
        withLoading: false,
        cancelable: true,
        buttons: []
    };

    cancelable(c) {
        this.setState({cancelable: c});
        return this;
    }

    setButtons(buttons) {
        this.setState({buttons});
        return this;
    }

    withLoading(c) {
        this.setState({ withLoading: c });
        return this;
    }

    setProgress(progress) {
        this.setState({ progress });
        return this;
    }

    setRender(jsx) {
        this.setState({ render: jsx });
        return this;
    }

    setTitle(title) {
        this.setState({ title });
        return this;
    }

    setMessage(message) {
        this.setState({ message });
        return this;
    }

    open() {
        this.setState({ open: true });
        return this;
    }

    close() {
        this.setState({ open: false });
        return this;
    }

    render() {
        let actions = []
        if (this.state.cancelable) {
            actions.push(<FlatButton
                label="OK"
                primary={true}
                onClick={() => this.close()}
            />);
        }
        if(this.state.buttons.length > 0) {
            actions = this.state.buttons;
        }
        return (
            <Dialog
                actions={actions}
                modal={false}
                title={this.state.title}
                contentStyle={{ width: this.state.width }}
                open={this.state.open}
                onRequestClose={() => (this.state.cancelable && this.close())}>
                {this.state.message} <b>{(this.state.progress > 0 && this.state.progress < 100) && (Math.floor(this.state.progress) + "%")}</b>
                <br /><br />
                {
                    (this.state.withLoading) &&
                    <LinearProgress
                        style={{ marginTop: 20, marginBottom: 20 }}
                        mode="determinate" value={this.state.progress} />
                }
            </Dialog>
            // <AlertPopup width="20%" render={this.state.render} open={this.state.open} onClose={() => this.setState({ open: false })} title={this.state.title} content={this.state.message} />
        )
    }


}