import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/StarBorder";
import FilledStarIcon from "@mui/icons-material/Star";
import BusinessIcon from "@mui/icons-material/Business";
import PlaceIcon from "@mui/icons-material/Place";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Unstable_Grid2";
import ReactDOM from "react-dom/client";
import ConfirmDialog from "./Confirm.jsx";

const LearnMore = styled((props) => {
    const { ...other } = props;
    return <Button {...other} />;
})(({ theme }) => ({
    marginLeft: "auto",
    width: "130px",
    borderRadius: "50px",
}));

export default class JobCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
        this.cardAction = this.cardAction.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.setDeleteOpen = this.setDeleteOpen.bind(this);
        this.state = {
            edit_mode: props.edit_mode,
            expanded: Boolean(props.expanded),
            favorite: props.data.favorite,
            deleteOpen: false,
        };
        this.collapseRef = React.createRef();
        this.cardRef = React.createRef();
        this.avatarColor =
            "#" + Math.floor(Math.random() * 0xffffff).toString(16);
    }

    handleExpandClick() {
        this.setExpanded(!this.state.expanded);
        if (this.props.onExpand) this.props.onExpand(this);
    }

    setExpanded(state) {
        this.setState({
            expanded: state,
        });
    }

    setDeleteOpen(state) {
        this.setState({
            deleteOpen: state,
        });
    }

    handleFavoriteClick() {
        this.setState({
            favorite: !this.state.favorite,
        });
    }

    deleteCard() {
        fetch("/api/posts/" + this.props.data.id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        }).then((res) => {
            window.location.reload();
        });
    }

    cardAction() {
        if (this.state.edit_mode)
            return (
                <>
                    <IconButton
                        aria-label="save"
                        href={`/edit-post/${this.props.data.id}`}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="save"
                        onClick={() => this.setDeleteOpen(true)}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <ConfirmDialog
                        title="Delete Post ?"
                        open={this.state.deleteOpen}
                        setOpen={this.setDeleteOpen}
                        onConfirm={this.deleteCard}
                    >
                        Are you sure you want to delete this post?
                    </ConfirmDialog>
                </>
            );
        else
            return (
                <IconButton
                    aria-label="save"
                    sx={{ color: "var(--accent)" }}
                    onClick={this.handleFavoriteClick}
                >
                    {this.state.favorite ? <FilledStarIcon /> : <StarIcon />}
                </IconButton>
            );
    }

    render() {
        return (
            <Card
                ref={this.cardRef}
                sx={{ width: "90%", border: 1, borderRadius: 3, boxShadow: 5 }}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="company_icon"
                            style={{
                                backgroundColor: this.avatarColor,
                            }}
                        >
                            {this.props.data.company_name[0]}
                        </Avatar>
                    }
                    action={this.cardAction()}
                    title={this.props.data.title}
                    subheader={
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                <BusinessIcon />
                                <span>{this.props.data.company_name}</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                <PlaceIcon />
                                <span>{this.props.data.city}</span>
                            </div>
                        </div>
                    }
                    style={{ textAlign: "center" }}
                />
                <CardContent>
                    <Typography variant="body2" color="text.primary">
                        {this.props.data.short_brief}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginLeft: 1 }}
                    >
                        {this.props.data.publication_date}
                    </Typography>
                    <LearnMore
                        variant="contained"
                        style={{
                            backgroundColor: "var(--accent)",
                            color: "black",
                        }}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                    >
                        {this.state.expanded ? "Hide" : "Learn more"}
                    </LearnMore>
                </CardActions>
                <Collapse
                    ref={this.collapseRef}
                    in={this.state.expanded}
                    timeout="auto"
                    unmountOnExit
                >
                    <CardContent>
                        <Divider sx={{ marginBottom: "10px" }}>
                            <Chip
                                label="Details"
                                sx={{ backgroundColor: "var(--background)" }}
                            />
                        </Divider>
                        <br />
                        <Typography>
                            Contract Type: {this.props.data.contract_type}
                        </Typography>
                        <br />

                        <Typography paragraph>Description:</Typography>

                        {this.props.data.description
                            .split("\n")
                            .map((content, index) => {
                                return (
                                    <Typography paragraph key={index}>
                                        {" "}
                                        {content}
                                    </Typography>
                                );
                            })}

                        <br />
                        <br />

                        <Grid container spacing={2}>
                            <Grid xs={1} />
                            <Grid xs={5}>
                                <Typography variant="h6">Salary</Typography>
                            </Grid>
                            <Grid xs={6}>
                                <Typography variant="h6">
                                    Working Time
                                </Typography>
                            </Grid>
                            <Grid xs={1} />
                            <Grid xs={5}>
                                {this.props.data.salary
                                    ? `${this.props.data.salary}$`
                                    : "Not Defined"}
                            </Grid>
                            <Grid xs={6}>
                                {this.props.data.working_time
                                    ? `${this.props.data.working_time}h`
                                    : "Not Defined"}
                            </Grid>
                        </Grid>
                        {this.props.data.hasApply ? (
                            <>
                                <br />
                                <br />

                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "100%",
                                        backgroundColor: "var(--accent)",
                                        color: "black",
                                        borderRadius: 50,
                                    }}
                                    href={`/apply/${this.props.data.id}`}
                                >
                                    Apply
                                </Button>
                            </>
                        ) : null}
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}
