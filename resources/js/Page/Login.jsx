import { Component } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div {...this.props}>
                <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                    <h1 style={{ justifyContent: "center", display: "flex" }}>
                        Login
                    </h1>
                    <form method="POST" action="/custom-login">
                        <input
                            type="hidden"
                            name="_token"
                            value={this.props.csrf_token}
                        />
                        <FormGroup>
                            <TextField
                                label="Email"
                                name="email"
                                variant="filled"
                                style={{ backgroundColor: "white" }}
                                autoComplete="email"
                            />
                            <br />
                            <TextField
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
}
