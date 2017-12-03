import React from "react";
import CircularProgress from "material-ui/CircularProgress";

const LoadingScreen = ({color,fromTop}) => (
    <div style={{ textAlign: "center", marginTop: (fromTop) ? fromTop : 0 }}>
        <CircularProgress size={60} thickness={7} color={color || "#000"} />
    </div>
);

export default LoadingScreen;