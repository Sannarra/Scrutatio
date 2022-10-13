import JobCard from "./JobCard";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Component } from "react";

export default function CardsList(props) {
    let openedCard = undefined;

    const handleExpandClick = (sender) => {
        /// Collapsing current card
        if (sender === openedCard) openedCard = undefined;
        else {
            let scrollable = document.getElementById("scrollable_body");
            if (openedCard) {
                if (scrollable !== null) {
                    if (
                        openedCard.cardRef.current.offsetTop <
                        sender.cardRef.current.offsetTop
                    ) {
                        let openedCardHeight =
                            openedCard.collapseRef.current.offsetHeight;

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
                openedCard.setExpanded(false);
            } else if (scrollable !== null) {
                scrollable.scrollTo({
                    top:
                        sender.cardRef.current.offsetTop - scrollable.offsetTop,
                    behavior: "smooth",
                });
            }
            openedCard = sender;
        }
    };

    const createFab = () => {
        if (props.edit_mode)
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
    };

    return (
        <Stack spacing={3} sx={{ alignItems: "center" }}>
            {props.data.jobs.map((job, index) => {
                return (
                    <JobCard
                        key={index}
                        data={{
                            ...job,
                            hasApply:
                                props.data.hasApply == undefined
                                    ? true
                                    : props.data.hasApply,
                        }}
                        onExpand={handleExpandClick}
                        edit_mode={props.edit_mode ? +true : +false}
                    />
                );
            })}
            {createFab()}
        </Stack>
    );
}
