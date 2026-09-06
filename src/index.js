// ─── Entry point ─────────────────────────────────────────────────────
// Mounts the app. That's it. If something is broken, it is almost never here,
// which is exactly why this file gets blamed first.

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
