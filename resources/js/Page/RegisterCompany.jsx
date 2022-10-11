import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Errors from "../components/Errors.jsx";

export default function RegisterCompany(props) {
    const [input, setInput] = useState({
        name: "",
        creation_date: "",
        size: "",
        headquarter: "",
        website: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({
        name: "",
        creation_date: "",
        size: "",
        headquarter: "",
        website: "",
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
                case "name":
                    if (!value)
                        stateObj[name] =
                            "Please enter the name of your company.";
                    break;
                case "creationDate":
                    if (!value)
                        stateObj[name] =
                            "Please enter the creation date of your company.";
                    break;
                case "size":
                    if (!value)
                        stateObj[name] =
                            "Please enter the size of your company.";
                    break;
                case "headquarter":
                    if (!value)
                        stateObj[name] =
                            "Please enter the headquarter of your company.";
                    break;
                case "website":
                    if (!value)
                        stateObj[name] =
                            "Please enter the website of your company.";
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
            placeholder={props.placeholder}
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
            <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                <h1 style={{ justifyContent: "center", display: "flex" }}>
                    Create Company
                </h1>
                <div style={{ justifyContent: "center", display: "flex" }}>
                    <img
                        style={{ width: "20%" }}
                        src="/company.png"
                        alt="company-picture"
                    />
                </div>
                <form method="POST" action="/register-company">
                    <input
                        type="hidden"
                        name="_token"
                        value={props.csrf_token}
                    />
                    <FormGroup>
                        {VerifiedTextField({
                            type: "text",
                            label: "Your company name",
                            name: "name",
                            autoComplete: "on",
                        })}
                        <br />
                        {VerifiedTextField({
                            type: "date",
                            label: "Creation date",
                            name: "creation_date",
                            autoComplete: "on",
                        })}
                        <br />
                        {VerifiedTextField({
                            type: "number",
                            label: "Company's workforce",
                            name: "size",
                            autoComplete: "on",
                        })}
                        <br />
                        {VerifiedTextField({
                            type: "text",
                            label: "Headquarter",
                            name: "headquarter",
                            autoComplete: "on",
                        })}
                        <br />
                        {VerifiedTextField({
                            type: "url",
                            label: "website",
                            name: "website",
                            autoComplete: "on",
                            placeholder: "https://mycompany.com",
                        })}
                        <br />
                        {VerifiedTextField({
                            type: "email",
                            label: "Email for your company account",
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
            </div>
            <br />
        </div>
    );
}
