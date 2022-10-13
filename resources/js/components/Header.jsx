import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";


export default function Header({ with_sidebar, openSidebar }) {

    //open sidebar onclick
    const TopLeftButton = () => {
        if (with_sidebar)
            return (
                <IconButton
                    sx={{ color: "var(--light)" }}
                    onClick={() => openSidebar()}
                >
                    <SearchIcon />
                </IconButton>
            );
        else
            return (
                <IconButton sx={{ color: "var(--light)" }} href="/">
                    <HomeIcon />
                </IconButton>
            );
    };

    const [userStatus, setUserStatus] = useState(false);


    //fetch if account connected 
    const isConnected = () => {
        // Fetch user id from the API
        fetch("/status", {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setUserStatus(response.status);
            })
            .catch((error) => {
                console.log(error);
                setUserStatus(false);
            });
    };

    isConnected();

    return (
        <header
            style={{
                maxHeight: "5vh",
                backgroundColor: "var(--dark)",
                color: "var(--light)",
                display: "flex",
                justifyContent: "space-between",
                padding: "3vh",
            }}
        >
            {TopLeftButton()}
            <a
                href="/"
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                }}
            >
                <img
                    style={{ width: "100%", height: "auto", maxHeight: "100%" }}
                    src="/logo-white.png"
                    alt="logo"
                />
            </a>

            <div style={{ display: "flex" }}>
                <div style={{ margin: "0 1em" }}>
                    <a style={{ color: "var(--light)" }} href="/chat">
                        <ChatIcon />
                    </a>
                </div>
                <div>
                    <a style={{ color: "var(--light)" }} href="/profile">
                        {/* //change color icon account */}
                        <AccountCircleIcon color={userStatus ? 'primary' : undefined}/>
                    </a>
                    
                </div>
            </div>
        </header>
    );
}
