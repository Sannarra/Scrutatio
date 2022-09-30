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
                {this.props.data.jobs.map((job, index) => {
                    return (
                        <JobCard
                            key={index}
                            data={job}
                            onExpand={this.handleExpandClick}
                        />
                    );
                })}
            </Stack>
        );
    }
}
