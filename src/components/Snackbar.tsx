import React from "react";
import {SnackbarProps} from "../../typings/components/Snackbar";
import ReactDOM from "react-dom";

export class Snackbar extends React.Component<SnackbarProps, any> {
    constructor(props: SnackbarProps) {
        super(props);
    }

    componentDidMount() {
        setTimeout(
            () => ReactDOM.render(<div />, document.getElementById("snackbar")),
            1000);
    }

    render() {
        return (
            <div style={{background: this.props.color}} className="snackbar">
                {this.props.message}
            </div>
        );
    }
}
