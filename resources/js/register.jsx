import "./bootstrap";
import "../css/app.css";

import ReactDOM from "react-dom/client";
import Register from "./Page/Register";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

ReactDOM.createRoot(document.getElementById("app")).render(
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
        }}
    >
        <Header />
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Register
                style={{ flex: 1 }}
                csrf_token={document
                    .getElementById("app")
                    .getAttribute("csrf_token")}
            />
            <Footer />
        </div>
    </div>
);
