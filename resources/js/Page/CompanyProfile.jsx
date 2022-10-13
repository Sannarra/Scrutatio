import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ConfirmDialog from "../components/Confirm.jsx";

export default function CompanyProfile(props) {
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <div>
            <Grid container justifyContent="space-between">
                {props.data.canEdit ? (
                    <Button
                        href={`/edit-profile/${
                            props.data.company.account_id
                                ? props.data.company.account_id
                                : ""
                        }`}
                        variant="contained"
                        startIcon={<EditIcon />}
                    >
                        Edit profile
                    </Button>
                ) : null}
                <div>
                    {props.data.isCurrentProfile ? (
                        <Button
                            sx={{ backgroundColor: "lightgrey" }}
                            href="/signout"
                            variant="contained"
                            startIcon={<LogoutIcon />}
                        >
                            Sign Out
                        </Button>
                    ) : null}

                    {props.data.canEdit ? (
                        <>
                            <Button
                                sx={{ backgroundColor: "lightgrey" }}
                                variant="contained"
                                startIcon={<DeleteIcon />}
                                onClick={() => setDeleteOpen(true)}
                            />
                            <ConfirmDialog
                                title="Delete account ?"
                                open={deleteOpen}
                                setOpen={setDeleteOpen}
                                onConfirm={() => {
                                    fetch(
                                        "/api/companies/" +
                                            props.data.company.id,
                                        {
                                            method: "delete",
                                        }
                                    ).then((res) => {
                                        if (!props.data.company.account_id)
                                            window.location.replace("/signout");
                                    });
                                }}
                            >
                                Are you sure you want to delete this account?
                            </ConfirmDialog>
                        </>
                    ) : null}
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
                        src="/company_profile.png"
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

            {props.data.isCurrentProfile ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        sx={{ color: "black" }}
                        href="/manage-posts"
                        variant="outlined"
                        startIcon={<StarIcon />}
                    >
                        Manage offers
                    </Button>
                    {props.data.isAdmin ? (
                        <Button
                            sx={{ color: "black" }}
                            href="/admin-panel"
                            variant="outlined"
                        >
                            Admin Panel
                        </Button>
                    ) : null}
                </Box>
            ) : null}
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
            <br />
            Description: {data.description}
        </div>
    );
}
