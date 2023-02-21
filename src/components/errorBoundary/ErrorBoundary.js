

import { Component } from "react";
import ErrorMessage from "../errorMessage/errorMessage";

/// Fuse element (can catch errors, do not brake site and 
/// give info about errors that in future could send to server )

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;