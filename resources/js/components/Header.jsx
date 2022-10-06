import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";

export default function Header({ openSidebar }) {
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
            <IconButton
                sx={{ color: "var(--light)" }}
                onClick={() => openSidebar()}
            >
                <SearchIcon />
            </IconButton>

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
                    <a style={{ color: "var(--light)" }} href="#">
                        <ChatIcon />
                    </a>
                </div>
                <div>
                    <a style={{ color: "var(--light)" }} href="#">
                        <AccountCircleIcon />
                    </a>
                </div>
            </div>
        </header>
    );
}
