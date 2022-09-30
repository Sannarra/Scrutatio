import JobCard from "./JobCard";
import Stack from "@mui/material/Stack";
import { Component } from "react";

export default class CardsList extends Component {
    constructor(props) {
        super(props);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.openedCard = undefined;
    }

    handleExpandClick(sender) {
        /// Collapsing current card
        if (sender === this.openedCard) this.openedCard = undefined;
        else {
            if (this.openedCard) {
                if (
                    this.openedCard.cardRef.current.offsetTop <
                    sender.cardRef.current.offsetTop
                ) {
                    let diff = this.openedCard.collapseRef.current.offsetHeight;
                    // let maxVal = sender.cardRef.current.offsetTop - diff;
                    let maxVal = window.scrollY - diff;
                    window.scroll({
                        top: Math.max(window.scrollY - diff, maxVal),
                        left: 0,
                        behavior: "smooth",
                    });
                }
                this.openedCard.setExpanded(false);
            }
            this.openedCard = sender;
        }
    }

    render() {
        return (
            <Stack spacing={3} sx={{ alignItems: "center" }}>
                <JobCard
                    jobTitle="Shampooer"
                    companyName="Wolf PLC"
                    city="Boyletown"
                    publication_date="29 sept 2022"
                    sectors={["Public service"]}
                    contract_type="CDI"
                    salary="1542"
                    working_time="35"
                    company_icon="https://cdn.discordapp.com/icons/768816677491965973/89de8e72c08e16e921810da2a0fc5f19.webp"
                    onExpand={this.handleExpandClick}
                />

                <JobCard
                    jobTitle="Maintenance Worker"
                    companyName="Hermiston Inc"
                    city="Langton"
                    publication_date="27 sept 2022"
                    sectors={["Metal Production", "Mining"]}
                    contract_type="CDI"
                    salary="1342"
                    working_time="25"
                    onExpand={this.handleExpandClick}
                />
            </Stack>
        );
    }
}
