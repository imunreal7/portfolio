// ─── Entry point ─────────────────────────────────────────────────────
// Mounts the app. That's it. If something is broken, it is almost never here,
// which is exactly why this file gets blamed first.

import React from "react";
import ReactDOM from "react-dom/client";

// Self-hosted fonts: served from this origin with the hashed, long-cached build assets
// instead of a render-blocking Google Fonts stylesheet.
import "@fontsource/syne/500.css";
import "@fontsource/syne/600.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
