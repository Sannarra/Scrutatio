import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

export default function Register(props) {
    const [input, setInput] = useState({
        ...props.data.user,
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

    const validateInputs = () => {
        // for (const [key, value] of Object.entries(error)) {
        //     if (value != "" || input[key] === "") return false;
        // }
        return true;
    };

    return (
        <div {...props}>
            <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                <h1 style={{ justifyContent: "center", display: "flex" }}>
                    Edit {props.data.user.firstname}'s profile
                </h1>
                <form method="POST" action="/edit-profile">
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
                            Edit
                        </Button>
                    </FormGroup>
                </form>
            </div>
        </div>
    );
}
