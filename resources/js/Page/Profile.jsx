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

export default function Profile(props) {
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <div>
            <Grid container justifyContent="space-between">
                <Button
                    href={`/edit-profile/${
                        props.data.user.account_id
                            ? props.data.user.account_id
                            : ""
                    }`}
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
                        onClick={() => setDeleteOpen(true)}
                    />
                    <ConfirmDialog
                        title="Delete account ?"
                        open={deleteOpen}
                        setOpen={setDeleteOpen}
                        onConfirm={() => {
                            fetch("/api/users/" + props.data.user.id, {
                                method: "delete",
                            }).then((res) => {
                                if (!props.data.user.account_id)
                                    window.location.replace("/signout");
                            });
                        }}
                    >
                        Are you sure you want to delete this account?
                    </ConfirmDialog>
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
                    <UserInfo data={props.data.user} />
                </Box>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    sx={{ color: "black" }}
                    href="#"
                    variant="outlined"
                    startIcon={<StarIcon />}
                >
                    saved offers
                </Button>

                <Button
                    sx={{ color: "black" }}
                    href="/register-company"
                    variant="outlined"
                    startIcon={<AddCircleIcon />}
                >
                    Create company account
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
        </div>
    );
}
function UserInfo({ data }) {
    return (
        <div>
            Firstname: {data.firstname}
            <br />
            Lastname: {data.lastname}
            <br />
            Phone: {data.phone}
            <br />
            City: {data.city}
            <br />
            Email: {data.email}
            <br />
        </div>
    );
}
