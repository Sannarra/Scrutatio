import JobCard from "./JobCard";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Component } from "react";

export default class CardsList extends Component {
    constructor(props) {
        super(props);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.createFab = this.createFab.bind(this);
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

    createFab() {
        if (this.props.edit_mode)
            return (
                <Fab
                    color="primary"
                    aria-label="add"
                    style={{ position: "sticky", bottom: "20px" }}
                    href="/create-post"
                >
                    <AddIcon />
                </Fab>
            );
        return null;
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
                            edit_mode={this.props.edit_mode ? +true : +false}
                        />
                    );
                })}
                {this.createFab()}
            </Stack>
        );
    }
}
