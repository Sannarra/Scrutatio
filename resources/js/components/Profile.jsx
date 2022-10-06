import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from '@mui/material/Grid';

export default function Footer() {
    return (
        <Grid container justifyContent="space-between">
            <Grid item xs={1}>
           <Button variant="contained" startIcon={<EditIcon />}>
                Edit profile
            </Button>
            </Grid>
            <Grid item xs={1}>
            <Button href="/signout" variant="contained" startIcon={<LogoutIcon />}>
                Sign Out
            </Button>
            </Grid>
        </Grid>

    )
}
