import CardsList from "../components/CardsList";
import Stack from "@mui/material/Stack";
import { Component } from "react";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CardsList data={this.props.data} />;
    }
}
