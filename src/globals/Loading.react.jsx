// Import from NPM
// -------------------------------------
import React from "react";

class Loading extends React.Component {
    render() {
        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh"
                }}
            >
                <img
                    src="assets/images/configurable/fploading.gif"
                    style={{
                        position: "absolute",
                        top: "65%",
                        left: "50%",
                        transform: "translate(-50%,-50%)"
                    }}
                    alt="Loading Gif"
                />
                <img
                    src="assets/images/configurable/logo.png"
                    style={{
                        position: "absolute",
                        top: "30%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        maxWidth: "80vw"
                    }}
                    alt="Logo"
                />
            </div>
        );
    }
}

export { Loading };
