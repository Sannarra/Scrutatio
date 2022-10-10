import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function CompanyProfile(props) {
    return (
        <div>
            <Grid container justifyContent="space-between">
                <Button
                    href="/edit-profile"
                    variant="contained"
                    startIcon={<EditIcon />}
                >
                    Edit profile
                </Button>
                <div>
                    <Button
                        sx={{ backgroundColor: "lightgrey" }}
                        href="/signout"
                        variant="contained"
                        startIcon={<LogoutIcon />}
                    >
                        Sign Out
                    </Button>
                    <Button
                        sx={{ backgroundColor: "lightgrey" }}
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                            fetch("/api/companies/" + props.data.company.id, {
                                method: "delete",
                                headers: {
                                    "X-CSRF-TOKEN": props.csrf_token,
                                },
                                body: {
                                    _token: props.csrf_token,
                                },
                            }).then((res) => {
                                window.location.replace("/signout");
                            });
                        }}
                    ></Button>
                </div>
            </Grid>
            <Grid container sx={{ mt: 3, justifyContent: "center" }}>
                <Grid
                    sx={{
                        width: "20%",
                        height: "auto",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <img
                        src="/profile.png"
                        alt="test"
                        style={{ maxWidth: "100%" }}
                    />
                </Grid>

                <Box
                    sx={{
                        margin: 5,
                        border: "solid black 1px",
                        padding: 1,
                        width: "50%",
                        backgroundColor: "white",
                    }}
                >
                    <CompanyInfo data={props.data.company} />
                </Box>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    sx={{ color: "black" }}
                    href="/manage-posts"
                    variant="outlined"
                    startIcon={<StarIcon />}
                >
                    Manage offers
                </Button>
            </Box>
        </div>
    );
}
function CompanyInfo({ data }) {
    return (
        <div>
            Name: {data.name}
            <br />
            Creation date: {data.creation_date}
            <br />
            Size: {data.size} employees
            <br />
            Headquarter: {data.headquarter}
            <br />
            Website: <a href={data.website}>{data.website}</a>
            <br />
            Email: {data.email}
            <br />
        </div>
    );
}
