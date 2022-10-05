import CardsList from "../components/CardsList";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";
import { Component } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

export default function Register(props) {
    const [input, setInput] = useState({
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({
        password: "",
        confirmPassword: "",
    });

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
        validateInput(e);
    };

    const validateInput = (e) => {
        let { name, value } = e.target;
        setError((prev) => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (
                        input.confirmPassword &&
                        value !== input.confirmPassword
                    ) {
                        stateObj["confirmPassword"] =
                            "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = input.confirmPassword
                            ? ""
                            : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (input.password && value !== input.password) {
                        stateObj[name] =
                            "Password and Confirm Password does not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    };

    return (
        <div {...props}>
            <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                <h1 style={{ justifyContent: "center", display: "flex" }}>
                    Register
                </h1>
                <form method="POST" action="/custom-registration">
                    <input
                        type="hidden"
                        name="_token"
                        value={props.csrf_token}
                    />
                    <FormGroup>
                        <Grid container spacing={4}>
                            <Grid xs={6}>
                                <TextField
                                    label="First Name"
                                    name="firstname"
                                    variant="filled"
                                    required
                                    autoComplete="given-name"
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
                                    required
                                    autoComplete="family-name"
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
                            required
                            autoComplete="tel"
                            style={{
                                backgroundColor: "white",
                            }}
                        />
                        <br />
                        <TextField
                            label="City"
                            name="city"
                            variant="filled"
                            required
                            autoComplete="address-level1"
                            style={{
                                backgroundColor: "white",
                            }}
                        />
                        <br />
                        <TextField
                            label="Email"
                            variant="filled"
                            name="email"
                            required
                            autoComplete="email"
                            style={{ backgroundColor: "white" }}
                        />
                        <br />
                        <TextField
                            type="password"
                            label="Password"
                            variant="filled"
                            name="password"
                            value={input.password}
                            onChange={onInputChange}
                            onBlur={validateInput}
                            error={error.password != ""}
                            helperText={error.password}
                            required
                            autoComplete="new-password"
                            style={{ backgroundColor: "white" }}
                        />
                        <br />
                        <TextField
                            type="password"
                            label="Confirm Password"
                            variant="filled"
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={onInputChange}
                            onBlur={validateInput}
                            required
                            autoComplete="new-password"
                            error={error.confirmPassword != ""}
                            helperText={error.confirmPassword}
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
