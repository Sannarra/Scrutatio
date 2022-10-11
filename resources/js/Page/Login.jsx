import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Errors from "../components/Errors.jsx";

export default function Login(props) {
    return (
        <div {...props}>
            <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                <h1 style={{ justifyContent: "center", display: "flex" }}>
                    Login
                </h1>
                <form method="POST" action="/login">
                    <input
                        type="hidden"
                        name="_token"
                        value={props.csrf_token}
                    />
                    <FormGroup>
                        <TextField
                            label="Email"
                            name="email"
                            variant="filled"
                            required
                            style={{ backgroundColor: "white" }}
                            autoComplete="email"
                        />
                        <br />
                        <TextField
                            required
                            type="password"
                            label="Password"
                            variant="filled"
                            name="password"
                            style={{ backgroundColor: "white" }}
                            autoComplete="current-password"
                        />
                        <br />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Remember me"
                            name="remember"
                        />
                        {Errors(props.errors)}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                width: "200px",
                                alignSelf: "center",
                                backgroundColor: "var(--accent)",
                                color: "black",
                                borderRadius: 50,
                            }}
                        >
                            Sign In
                        </Button>
                    </FormGroup>
                </form>
                <br />
                <a
                    href="/register"
                    style={{ justifyContent: "center", display: "flex" }}
                >
                    No account ? Create one
                </a>
            </div>
        </div>
    );
}
