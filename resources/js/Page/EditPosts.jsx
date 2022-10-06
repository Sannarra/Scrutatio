import CardsList from "../components/CardsList";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PostEdit from "../components/PostEdit.jsx";
import { Component } from "react";

export default class EditPosts extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PostEdit
                job_title={this.props.data.post.job_title}
                city={this.props.data.post.city}
                contract_type={this.props.data.post.contract_type}
                short_brief={this.props.data.post.short_brief}
                description={this.props.data.post.description}
                salary={this.props.data.post.salary}
                working_time={this.props.data.post.working_time}
                publication_date={this.props.data.post.publication_date}
                creation_mode={this.props.creation_mode ? +true : +false}
            />
        );
    }
}
