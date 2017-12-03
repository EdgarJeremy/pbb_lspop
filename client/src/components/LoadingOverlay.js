import React from "react";
import LoadingScreen from "./LoadingScreen";

const LoadingOverlay = ({ loadingColor,title,visible }) => (
    <div className="loading-overlay" style={{ display: (visible) ? "block" : "none"}}>
        <h1>{title}</h1><br />
        <LoadingScreen color={loadingColor || "#000"} />
    </div>
);

export default LoadingOverlay;