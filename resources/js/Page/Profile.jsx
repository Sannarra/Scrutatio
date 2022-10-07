import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";



export default function Profile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch("api/users/1")
            .then((res) => res.json())
            .then((data) => setUserData(data));
    }, []
    );


    return (
        <div>
            <Grid container justifyContent="space-between">
                <Button href="#" variant="contained" startIcon={<EditIcon />}>
                    Edit profile
                </Button>
                <Button variant="contained" sx={{backgroundColor: "lightgrey"}} startIcon={<DeleteIcon />}></Button>
                <Button
                sx={{backgroundColor: "lightgrey"}}
                    href="/signout"
                    variant="contained"
                    startIcon={<LogoutIcon />}
                >
                    Sign Out
                </Button>
            </Grid>
            <Grid container sx={{mt: 3, justifyContent: "center"}} >

               <Grid sx={{width: "20%", height: "auto", display: "flex", alignItems: "center"}}>
                    <img src="/profile.png" alt="test" style={{  maxWidth: "100%"}}/>
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
    { userData === null
      ? <div>Loading...</div>  
      : <UserInfo data={userData} />
    }
</Box>
            </Grid>
            <Button sx={{color: "black"}} href="#" variant="outlined" startIcon={<StarIcon />}>
                saved offers
            </Button>
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