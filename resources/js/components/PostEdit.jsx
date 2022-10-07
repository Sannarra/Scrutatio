import React, { useState } from "react";
import { Component } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import JobCard from "./JobCard.jsx";
import InputAdornment from "@mui/material/InputAdornment";

export default function PostEdit(props) {
    let now = new Date();
    const [input, setInput] = useState({
        title: props.title || "",
        city: props.city || "",
        contract_type: props.contract_type || "",
        short_brief: props.short_brief || "",
        description: props.description || "",
        salary: props.salary || "0",
        working_time: props.working_time || "0",

        publication_date:
            props.publication_date ||
            `${now.getMonth()}/${now.getDay()} ${now.getHours()}:${now.getMinutes()}`,
        company_icon: props.company_icon || "",
        company_name: props.company_name || "",
        sectors: props.sectors || undefined,
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

            if (!value) {
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
            required
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
            if (value != "" || input[key] === "") return false;
        }
        return true;
    };

    return (
        <div {...props}>
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
                                : `/edit-post/${props.post_id}`
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
                            {VerifiedTextField({
                                type: "text",
                                label: "Contract Type",
                                name: "contract_type",
                                autoComplete: "on",
                            })}
                            <br />
                            {VerifiedTextField({
                                type: "text",
                                label: "Short Brief",
                                name: "short_brief",
                                autoComplete: "on",
                                multiline: "true",
                                maxLength: 170,
                            })}
                            <br />
                            {VerifiedTextField({
                                type: "text",
                                label: "Description",
                                name: "description",
                                autoComplete: "on",
                                multiline: "true",
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
                                    })}
                                </Grid>
                            </Grid>
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
                    <JobCard
                        data={input}
                        expanded="true"
                        style={{ width: "100%" }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
