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

const LearnMore = styled((props) => {
    const { ...other } = props;
    return <Button {...other} />;
})(({ theme }) => ({
    marginLeft: "auto",
    width: "130px",
    borderRadius: "50px",
}));

class Sector extends React.Component {
    render() {
        return (
            <Chip
                label={this.props.name}
                size="small"
                sx={{
                    backgroundColor: "var(--background)",
                    marginLeft: "5px",
                    marginRight: "5px",
                    marginTop: "2px",
                    marginBottom: "2px",
                }}
            />
        );
    }
}

export default class JobCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
        this.cardAction = this.cardAction.bind(this);
        this.state = {
            edit_mode: props.edit_mode,
            expanded: Boolean(props.expanded),
            favorite: props.data.favorite,
        };
        this.collapseRef = React.createRef();
        this.cardRef = React.createRef();
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

    handleFavoriteClick() {
        this.setState({
            favorite: !this.state.favorite,
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
                    <IconButton aria-label="save">
                        <DeleteIcon />
                    </IconButton>
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
                {...this.props}
                ref={this.cardRef}
                sx={{ width: "90%", border: 1, borderRadius: 3, boxShadow: 5 }}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="company_icon"
                            src={this.props.data.company_icon}
                        />
                    }
                    action={this.cardAction()}
                    title={this.props.data.job_title}
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
                        <Typography component={"span"}>
                            Sectors:
                            {this.props.data.sectors &&
                                this.props.data.sectors.map((sector, index) => {
                                    return <Sector name={sector} key={index} />;
                                })}
                        </Typography>
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
                            <Grid xs={5}>{this.props.data.salary}$</Grid>
                            <Grid xs={6}>{this.props.data.working_time}h</Grid>
                        </Grid>

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
                        >
                            Apply
                        </Button>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}
