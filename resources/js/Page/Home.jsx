import CardsList from "../components/CardsList";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Component } from "react";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CardsList data={this.props.data} />
                <br />
                <div style={{ justifyContent: "center", display: "flex" }}>
                    <Pagination
                        count={this.props.data.page.count}
                        page={this.props.data.page.current}
                        color="primary"
                        onChange={(e, value) =>
                            (window.location.href =
                                window.location.href.split("?")[0] +
                                "?page=" +
                                value)
                        }
                    />
                </div>
            </div>
        );
    }
}
