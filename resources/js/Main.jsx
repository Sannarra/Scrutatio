import * as React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Button from "@mui/material/Button";
import Home from "./Page/Home.jsx";

export default function Main(props) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <>
            <Button onClick={() => setSidebarOpen(true)}>Hello</Button>
            <Home data={props.data} />
            <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />
        </>
    );
}
