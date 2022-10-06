import "./bootstrap";
import "../css/app.css";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: "#faaa00",
        },
        secondary: {
            main: "#bfdbf7",
        },
        grey: {
            main: "#333745",
        },
    },
});

import ReactDOM from "react-dom/client";
import Main from "./Main";
import Home from "./Page/Home.jsx";

function getPage() {
    switch (pageName) {
        case "home":
            return () => <Home data={pageData} />;
        default:
            return () => <h1>Undefined page name </h1>;
    }
}

ReactDOM.createRoot(document.getElementById("app")).render(
    <ThemeProvider theme={theme}>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                height: "100vh",
            }}
        >
            <Main content={getPage()} />
        </div>
    </ThemeProvider>
);
