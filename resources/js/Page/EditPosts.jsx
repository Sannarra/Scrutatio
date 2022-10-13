import React, { useState } from "react";
import { Component } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import JobCard from "../components/JobCard.jsx";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Errors from "../components/Errors.jsx";

export default function EditPosts(props) {
    const contractTypes = [
        { value: "Not Defined", label: "Not Defined" },
        {
            value: "Fixed-term",
            label: "Fixed-term",
        },
        {
            value: "Permanent",
            label: "Permanent",
        },
        {
            value: "Internship",
            label: "Internship",
        },
        {
            value: "Apprenticeship",
            label: "Apprenticeship",
        },
        {
            value: "Seasonal",
            label: "Seasonal",
        },
    ];

    let now = new Date();
    const [input, setInput] = useState({
        title: props.data.post.title || "",
        city: props.data.post.city || "",
        contract_type: props.data.post.contract_type || "",
        short_brief: props.data.post.short_brief || "",
        description: props.data.post.description || "",
        salary: props.data.post.salary || "",
        working_time: props.data.post.working_time || "",

        publication_date:
            props.data.post.publication_date ||
            `${now.getMonth()}/${now.getDay()} ${now.getHours()}:${now.getMinutes()}`,
        company_name: props.data.company.company_name || "",
    });

    const [error, setError] = useState({
        title: "",
        city: "",
        contract_type: "",
        short_brief: "",
        description: "",
        salary: "",
        working_time: "",
    });

    const handleContractChange = (event) => {
        setInput((prev) => ({ ...prev, contract_type: event.target.value }));
    };

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

            if (!value && name != "salary" && name != "working_time") {
                stateObj[name] = "This field is required.";
                return stateObj;
            }
            return stateObj;
        });
    };

    const VerifiedTextField = (props) => (
        <TextField
            {...props}
            key={props.name}
            value={input[props.name]}
            error={error[props.name] != ""}
            helperText={error[props.name]}
            variant="filled"
            onChange={onInputChange}
            onBlur={validateInput}
            required={!(props.notrequired || false)}
            style={{ backgroundColor: "white", width: "100%" }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {props.unit}
                    </InputAdornment>
                ),
            }}
            inputProps={{
                maxLength: props.maxLength ? props.maxLength : null,
                min: props.min,
                max: props.max,
            }}
        />
    );

    const validateInputs = () => {
        for (const [key, value] of Object.entries(error)) {
            if (
                (value != "" || input[key] === "") &&
                key != "salary" &&
                key != "working_time"
            )
                return false;
        }
        return true;
    };

    return (
        <Grid
            container
            style={{
                paddingLeft: "10%",
                paddingRight: "10%",
            }}
        >
            <Grid xs={12} md={6} paddingRight={{ xs: 0, md: 3 }}>
                <h1 style={{ justifyContent: "center", display: "flex" }}>
                    {props.creation_mode ? "Create" : "Edit"} post
                </h1>
                <form
                    method="POST"
                    action={
                        props.creation_mode
                            ? "/create-post"
                            : `/edit-post/${props.data.post.id}`
                    }
                >
                    <input
                        type="hidden"
                        name="_token"
                        value={props.csrf_token}
                    />
                    <FormGroup>
                        {VerifiedTextField({
                            type: "text",
                            label: "Title",
                            name: "title",
                            autoComplete: "on",
                        })}
                        <br />
                        {VerifiedTextField({
                            type: "text",
                            label: "City",
                            name: "city",
                            autoComplete: "address-level1",
                        })}
                        <br />

                        <TextField
                            select
                            label="Contract Type"
                            name="contract_type"
                            value={input.contract_type}
                            onChange={handleContractChange}
                            autoComplete="on"
                            error={error.contract_type != ""}
                            helperText={error.contract_type}
                            variant="filled"
                            onBlur={validateInput}
                            required
                            style={{
                                backgroundColor: "white",
                                width: "100%",
                            }}
                        >
                            {contractTypes.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <br />
                        {VerifiedTextField({
                            type: "text",
                            label: "Short Brief",
                            name: "short_brief",
                            autoComplete: "on",
                            multiline: true,
                            maxLength: 170,
                        })}
                        <br />
                        {VerifiedTextField({
                            type: "text",
                            label: "Description",
                            name: "description",
                            autoComplete: "on",
                            multiline: true,
                        })}

                        <br />
                        <Grid container spacing={4}>
                            <Grid xs={6}>
                                {VerifiedTextField({
                                    type: "number",
                                    label: "Salary (month)",
                                    name: "salary",
                                    autoComplete: "on",
                                    unit: "$",
                                    min: 0,
                                    notrequired: "true",
                                })}
                            </Grid>
                            <Grid xs={6}>
                                {VerifiedTextField({
                                    type: "number",
                                    label: "Working Time (month)",
                                    name: "working_time",
                                    autoComplete: "on",
                                    unit: "h",
                                    min: 0,
                                    notrequired: "true",
                                })}
                            </Grid>
                        </Grid>
                        <br />
                        {Errors(props.errors)}
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
                                marginBottom: "10px",
                            }}
                            disabled={!validateInputs()}
                        >
                            {props.creation_mode ? "Create" : "Edit"}
                        </Button>
                    </FormGroup>
                </form>
            </Grid>
            <Grid xs={12} md={6} paddingLeft={{ xs: 0, md: 3 }}>
                <div style={{ width: "100%" }}>
                    <JobCard
                        data={{ ...input, hasApply: false }}
                        expanded="true"
                    />
                </div>
            </Grid>
        </Grid>
    );
}
