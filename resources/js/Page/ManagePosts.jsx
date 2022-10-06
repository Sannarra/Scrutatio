import CardsList from "../components/CardsList";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Component } from "react";

export default class ManagePosts extends Component {
    constructor(props) {
        super(props);
        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange(e, value) {
        let url = new URL(window.location.href);
        url.searchParams.set("page", value);
        window.location.href = url.href;
    }

    render() {
        return (
            <div>
                <CardsList edit_mode data={this.props.data} />
                <br />
                <div style={{ justifyContent: "center", display: "flex" }}>
                    <Pagination
                        count={this.props.data.page.count}
                        page={this.props.data.page.current}
                        color="primary"
                        onChange={this.onPageChange}
                    />
                </div>
            </div>
        );
    }
}
