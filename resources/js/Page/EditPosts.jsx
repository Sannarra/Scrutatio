import CardsList from "../components/CardsList";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PostEdit from "../components/PostEdit.jsx";
import { Component } from "react";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PostEdit
                creation_mode={this.props.creation_mode ? +true : +false}
            />
        );
    }
}
