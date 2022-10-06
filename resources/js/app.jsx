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
import ManagePosts from "./Page/ManagePosts.jsx";
import EditPosts from "./Page/EditPosts.jsx";

function getPage() {
    switch (pageName) {
        case "home":
            return () => <Home data={pageData} />;
        case "create_post":
            return () => <EditPosts creation_mode data={pageData} />;
        case "edit_post":
            return () => <EditPosts data={pageData} />;
        case "manage_posts":
            return () => <ManagePosts data={pageData} />;
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
