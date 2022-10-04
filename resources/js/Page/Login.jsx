import CardsList from "../components/CardsList";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Component } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                <h1 style={{ justifyContent: "center", display: "flex" }}>
                    Login
                </h1>
                <form>
                    <FormGroup>
                        <TextField label="Email" />
                        <br />
                        <TextField label="Password" />
                        <br />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ width: "200px", alignSelf: "center" }}
                        >
                            Sign In
                        </Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}
