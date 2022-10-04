import * as React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./Page/Home.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function Main(props) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <div style={{ display: "flex", flexDirection: "column" , flex: '1', height:'100vh'}}>
            <Header openSidebar={() => setSidebarOpen(true)}    
            />
            <div style={{ overflowY: 'auto', flex:'1', paddingTop:'10px' }}>
                <Home data={props.data} />
                <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />
                <Footer />
            </div>
        </div>
    );
}
