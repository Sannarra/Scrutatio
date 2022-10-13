export default function Footer() {
    return (
        <footer
            style={{
                backgroundColor: "var(--dark)",
                color: "var(--light)",
                bottom: "0px",
                height: "8%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <img
                src="/logo-white.png"
                alt="logo"
                style={{ width: "100px", margin: "10px" }}
            />
            © 2022 All Rights Reserved
        </footer>
    );
}
