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
import Login from "./Page/Login.jsx";
import Register from "./Page/Register.jsx";
import ManagePosts from "./Page/ManagePosts.jsx";
import EditPosts from "./Page/EditPosts.jsx";
import RegisterCompany from "./Page/RegisterCompany";
import Profile from "./Page/Profile";
import EditProfile from "./Page/EditProfile";
import CompanyProfile from "./Page/CompanyProfile";
import EditCompanyProfile from "./Page/EditCompanyProfile";
import AdminPanel from "./Page/AdminPanel.jsx";
import Message from "./Page/Message.jsx";

let with_sidebar = false;
let returnPage = undefined;

function getPage() {
    switch (pageName) {
        /// Misc
        case "home":
            with_sidebar = true;
            return () => <Home data={pageData} />;
        case "admin_panel":
            return () => <AdminPanel />;
        /// Authentication
        case "login":
            return () => <Login csrf_token={csrf_token} errors={errors} />;
        case "register_company":
            return () => (
                <RegisterCompany csrf_token={csrf_token} errors={errors} />
            );
        case "register":
            return () => <Register csrf_token={csrf_token} errors={errors} />;
        /// Profiles
        case "profile":
            return () => <Profile data={pageData} csrf_token={csrf_token} />;
        case "company_profile":
            return () => (
                <CompanyProfile data={pageData} csrf_token={csrf_token} />
            );
        case "edit_profile":
            return () => (
                <EditProfile
                    data={pageData}
                    csrf_token={csrf_token}
                    errors={errors}
                />
            );
        case "edit_company_profile":
            return () => (
                <EditCompanyProfile
                    data={pageData}
                    csrf_token={csrf_token}
                    errors={errors}
                />
            );
        /// Posts
        case "manage_posts":
            with_sidebar = true;
            return () => <ManagePosts data={pageData} />;
        case "create_post":
            returnPage = "/manage-posts";
            return () => (
                <EditPosts
                    creation_mode
                    data={pageData}
                    csrf_token={csrf_token}
                    errors={errors}
                />
            );
        case "edit_post":
            returnPage = "/manage-posts";
            return () => (
                <EditPosts
                    data={pageData}
                    csrf_token={csrf_token}
                    errors={errors}
                />
            );
        case "message":
            return () => <Message data={pageData} csrf_token={csrf_token} />;
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
            <Main
                content={getPage()}
                csrf_token={csrf_token}
                with_sidebar={with_sidebar}
                returnPage={returnPage}
            />
        </div>
    </ThemeProvider>
);
