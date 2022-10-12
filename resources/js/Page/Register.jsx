import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Errors from "../components/Errors.jsx";

export default function Register(props) {
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        city: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        city: "",
        email: "",
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
                case "firstname":
                    if (!value)
                        stateObj[name] = "Please enter your First Name.";
                    break;
                case "lastname":
                    if (!value) stateObj[name] = "Please enter your Last Name.";
                    break;
                case "phone":
                    if (!value)
                        stateObj[name] = "Please enter your phone number.";
                    break;
                case "city":
                    if (!value) stateObj[name] = "Please enter your city.";
                    break;
                case "email":
                    if (!value) stateObj[name] = "Please enter your email.";
                    break;

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (value.length < 6) {
                        stateObj[name] =
                            "Password must be at least 6 characters wide.";
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

    const VerifiedTextField = (props) => (
        <TextField
            key={props.name}
            type={props.type}
            label={props.label}
            name={props.name}
            autoComplete={props.autoComplete}
            value={input[props.name]}
            error={error[props.name] != ""}
            helperText={error[props.name]}
            variant="filled"
            onChange={onInputChange}
            onBlur={validateInput}
            required
            style={{ backgroundColor: "white", width: "100%" }}
        />
    );

    const validateInputs = () => {
        for (const [key, value] of Object.entries(error)) {
            if (value != "" || input[key] === "") return false;
        }
        return true;
    };

    return (
        <div {...props}>
            <Grid
                container
                style={{ display: "flex", justifyContent: "center" }}
            >
                <Grid xs={11} sm={9} md={7} lg={5}>
                    <h1
                        style={{
                            justifyContent: "center",
                            display: "flex",
                        }}
                    >
                        Register
                    </h1>
                    <form method="POST" action="/register">
                        <input
                            type="hidden"
                            name="_token"
                            value={props.csrf_token}
                        />
                        <FormGroup>
                            <Grid container spacing={4}>
                                <Grid xs={6}>
                                    {VerifiedTextField({
                                        type: "text",
                                        label: "First Name",
                                        name: "firstname",
                                        autoComplete: "given-name",
                                    })}
                                </Grid>
                                <Grid xs={6}>
                                    {VerifiedTextField({
                                        type: "text",
                                        label: "Last Name",
                                        name: "lastname",
                                        autoComplete: "family-name",
                                    })}
                                </Grid>
                            </Grid>
                            <br />
                            {VerifiedTextField({
                                type: "text",
                                label: "Phone Number",
                                name: "phone",
                                autoComplete: "tel",
                            })}
                            <br />
                            {VerifiedTextField({
                                type: "text",
                                label: "City",
                                name: "city",
                                autoComplete: "address-level1",
                            })}
                            <br />
                            {VerifiedTextField({
                                type: "email",
                                label: "Email",
                                name: "email",
                                autoComplete: "email",
                            })}
                            <br />
                            {VerifiedTextField({
                                type: "password",
                                label: "Password",
                                name: "password",
                                autoComplete: "new-password",
                            })}
                            <br />
                            {VerifiedTextField({
                                type: "password",
                                label: "Confirm Password",
                                name: "confirmPassword",
                                autoComplete: "new-password",
                            })}

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
                                disabled={!validateInputs()}
                            >
                                Sign Up
                            </Button>
                        </FormGroup>
                    </form>
                    <br />
                    <a
                        href="/login"
                        style={{ justifyContent: "center", display: "flex" }}
                    >
                        Already registered ? log in
                    </a>
                </Grid>
            </Grid>
        </div>
    );
}
