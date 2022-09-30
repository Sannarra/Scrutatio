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
import StarIcon from "@mui/icons-material/StarBorder";
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
        return;
        <Chip
            label={this.props.name}
            size="small"
            sx={{
                backgroundColor: "#e1e5f2",
                marginLeft: "5px",
                marginRight: "5px",
            }}
        />;
    }
}

export default class JobCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.state = { expanded: props.expanded };
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

    render() {
        return (
            <Card
                ref={this.cardRef}
                sx={{ maxWidth: 345, border: 1, borderRadius: 3, boxShadow: 5 }}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="company_icon"
                            src={this.props.company_icon}
                        />
                    }
                    action={
                        <IconButton aria-label="save" sx={{ color: "#faaa00" }}>
                            <StarIcon />
                        </IconButton>
                    }
                    title={this.props.jobTitle}
                    subheader={`${this.props.companyName} ● ${this.props.city}`}
                    style={{ textAlign: "center" }}
                />
                <CardContent>
                    <Typography variant="body2" color="text.primary">
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginLeft: 1 }}
                    >
                        {this.props.publication_date}
                    </Typography>
                    <LearnMore
                        variant="contained"
                        style={{ backgroundColor: "#faaa00", color: "black" }}
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
                                sx={{ backgroundColor: "#e1e5f2" }}
                            />
                        </Divider>
                        <br />
                        <Typography>
                            Sectors:
                            {this.props.sectors.map((sector, index) => {
                                return <Sector name={sector} />;
                            })}
                        </Typography>
                        <br />
                        <Typography>
                            Contract Type: {this.props.contract_type}
                        </Typography>
                        <br />

                        <Typography paragraph>Description:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering,
                            add saffron and set aside for 10 minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a
                            large, deep skillet over medium-high heat. Add
                            chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes.
                            Transfer shrimp to a large plate and set aside,
                            leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt
                            and pepper, and cook, stirring often until thickened
                            and fragrant, about 10 minutes. Add saffron broth
                            and remaining 4 1/2 cups chicken broth; bring to a
                            boil.
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10
                            minutes, and then serve.
                        </Typography>

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
                            <Grid xs={5}>{this.props.salary}$</Grid>
                            <Grid xs={6}>{this.props.working_time}h</Grid>
                        </Grid>

                        <br />
                        <br />

                        <Button
                            variant="contained"
                            sx={{
                                width: "100%",
                                backgroundColor: "#faaa00",
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
