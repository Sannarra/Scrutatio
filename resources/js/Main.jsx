import * as React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./Page/Home.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function Main(props) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                height: "100vh",
            }}
        >
            <Header
                with_sidebar={props.with_sidebar}
                returnPage={props.returnPage}
                openSidebar={() => setSidebarOpen(true)}
            />
            <div
                style={{
                    overflowY: "auto",
                    flex: "1",
                    paddingTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                }}
                id="scrollable_body"
            >
                <div style={{ flex: 1 }}>
                    {props.content()}
                    {props.with_sidebar && (
                        <Sidebar
                            isOpen={sidebarOpen}
                            setOpen={setSidebarOpen}
                            csrf_token={props.csrf_token}
                        />
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
}
