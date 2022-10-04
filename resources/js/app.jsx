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

ReactDOM.createRoot(document.getElementById("app")).render(
    <ThemeProvider theme={theme}>
        <Main
            data={JSON.parse(
                document.getElementById("app").getAttribute("data")
            )}
        />
    </ThemeProvider>
);
