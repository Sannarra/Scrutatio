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
            let scrollable = document.getElementById("scrollable_body");
            if (this.openedCard) {
                if (scrollable !== null) {
                    if (
                        this.openedCard.cardRef.current.offsetTop <
                        sender.cardRef.current.offsetTop
                    ) {
                        let openedCardHeight =
                            this.openedCard.collapseRef.current.offsetHeight;

                        scrollable.scrollTo({
                            top:
                                sender.cardRef.current.offsetTop -
                                openedCardHeight -
                                scrollable.offsetTop,
                            behavior: "smooth",
                        });
                    } else {
                        scrollable.scrollTo({
                            top:
                                sender.cardRef.current.offsetTop -
                                scrollable.offsetTop,
                            behavior: "smooth",
                        });
                    }
                }
                this.openedCard.setExpanded(false);
            } else if (scrollable !== null) {
                scrollable.scrollTo({
                    top:
                        sender.cardRef.current.offsetTop - scrollable.offsetTop,
                    behavior: "smooth",
                });
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
                            editMode={this.props.editMode}
                        />
                    );
                })}
            </Stack>
        );
    }
}
