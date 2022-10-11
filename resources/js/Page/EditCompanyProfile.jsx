import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

export default function RegisterCompany(props) {
    const [input, setInput] = useState({
        ...props.data.company,
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
                case "password":
                    if (!value) {
                        break;
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
                        break;
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
            style={{ backgroundColor: "white", width: "100%" }}
        />
    );

    return (
        <div {...props}>
            <Grid
                container
                style={{ display: "flex", justifyContent: "center" }}
            >
                <Grid xs={11} sm={9} md={7} lg={5}>
                    <h1 style={{ justifyContent: "center", display: "flex" }}>
                        Edit {props.data.company.name}'s profile
                    </h1>
                    <div style={{ justifyContent: "center", display: "flex" }}>
                        <img
                            style={{ width: "20%" }}
                            src="/company.png"
                            alt="company-picture"
                        />
                    </div>
                    <form
                        method="POST"
                        action={`/edit-profile/${props.data.company.account_id}`}
                    >
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
                                Edit
                            </Button>
                        </FormGroup>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}
