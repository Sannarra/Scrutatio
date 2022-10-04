import CardsList from "../components/CardsList";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Component } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

export default class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div {...this.props}>
                <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                    <h1 style={{ justifyContent: "center", display: "flex" }}>
                        Register
                    </h1>
                    <form method="POST" action="/custom-registration">
                        <input
                            type="hidden"
                            name="_token"
                            value={this.props.csrf_token}
                        />
                        <FormGroup>
                            <Grid container spacing={4}>
                                <Grid xs={6}>
                                    <TextField
                                        label="First Name"
                                        name="firstname"
                                        variant="filled"
                                        style={{
                                            backgroundColor: "white",
                                            width: "100%",
                                        }}
                                    />
                                </Grid>
                                <Grid xs={6}>
                                    <TextField
                                        label="Last Name"
                                        name="lastname"
                                        variant="filled"
                                        style={{
                                            backgroundColor: "white",
                                            width: "100%",
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <TextField
                                label="Phone Number"
                                name="lastname"
                                variant="filled"
                                style={{
                                    backgroundColor: "white",
                                }}
                            />
                            <br />
                            <TextField
                                label="City"
                                name="city"
                                variant="filled"
                                style={{
                                    backgroundColor: "white",
                                }}
                            />
                            <br />
                            <TextField
                                label="Email"
                                variant="filled"
                                name="email"
                                style={{ backgroundColor: "white" }}
                            />
                            <br />
                            <TextField
                                type="password"
                                label="Password"
                                variant="filled"
                                name="password"
                                style={{ backgroundColor: "white" }}
                            />
                            <br />
                            <TextField
                                type="password"
                                label="Confirm Password"
                                variant="filled"
                                style={{ backgroundColor: "white" }}
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
                                Sign Up
                            </Button>
                        </FormGroup>
                    </form>
                </div>
                <br />
                <a
                    href="/login"
                    style={{ justifyContent: "center", display: "flex" }}
                >
                    Already registered ? log in
                </a>
            </div>
        );
    }
}
