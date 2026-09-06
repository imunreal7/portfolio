import { Component } from "react";

/**
 * Keeps a failure inside one interactive widget (a canvas, a simulation) from
 * taking the whole page down. Renders `fallback` (or nothing) in its place.
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { failed: false };
    }

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error, info) {
        if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.error("Widget failed to render", error, info);
        }
    }

    render() {
        const { failed } = this.state;
        const { children, fallback = null } = this.props;
        return failed ? fallback : children;
    }
}

export default ErrorBoundary;
