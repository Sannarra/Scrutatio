import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function FilterSidebar({
    isOpen,
    setOpen,
    csrf_token,
    SelectTextFields,
}) {
    const urlParams = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    const [searchWords, setSearchWords] = React.useState(
        urlParams.searchWords || ""
    );
    const [location, setLocation] = React.useState(urlParams.location || "");
    const [field, setField] = React.useState(urlParams.field || "");
    const [sortField, setSortField] = React.useState(
        urlParams.sortField || "created_at"
    );
    const [sortOrder, setSortOrder] = React.useState(
        urlParams.sortOrder || "desc"
    );
    const [valueSalary, setValueSalary] = React.useState([
        parseInt(urlParams.minSalary) || 0,
        parseInt(urlParams.maxSalary) || 4000,
    ]);
    const [valueWorktime, setValueWorktime] = React.useState([
        parseInt(urlParams.minHours) || 0,
        parseInt(urlParams.maxHours) || 40,
    ]);
    const [selectedChips, setSelectedChips] = React.useState(
        urlParams.contractTypes ? urlParams.contractTypes.split(",") : []
    );
    const [includeNull, setIncludeNull] = React.useState(
        urlParams.includeNull == "true"
    );

    const toggleChip = (chip) => {
        if (selectedChips.includes(chip)) {
            setSelectedChips(selectedChips.filter((c) => c !== chip));
        } else {
            setSelectedChips([...selectedChips, chip]);
        }
    };

    const filterAction = (e) => {
        setOpen(false);
    };

    const crossClose = () => {
        setOpen(false);
    };

    const sortFields = [
        {
            value: "created_at",
            label: "Date",
        },
        {
            value: "salary",
            label: "Salary",
        },
        {
            value: "working_time",
            label: "Working Time",
        },
    ];

    const sortOrders = [
        {
            value: "desc",
            label: "🠗",
        },
        {
            value: "asc",
            label: "🠕",
        },
    ];

    const contractTypes = [
        "Not Defined",
        "Fixed-term",
        "Permanent",
        "Internship",
        "Apprenticeship",
        "Seasonal",
    ];

    const Form = () => (
        <Box sx={{ width: 250, m: 2, ml: 4 }}>
            <form action="#" onSubmit={filterAction}>
                <input type="hidden" name="_token" value={csrf_token} />
                <input type="hidden" name="minSalary" value={valueSalary[0]} />
                <input type="hidden" name="maxSalary" value={valueSalary[1]} />
                <input type="hidden" name="minHours" value={valueWorktime[0]} />
                <input type="hidden" name="maxHours" value={valueWorktime[1]} />
                <input
                    type="hidden"
                    name="contractTypes"
                    value={selectedChips}
                />
                <input type="hidden" name="includeNull" value={includeNull} />
                <IconButton
                    title="Close"
                    onClick={() => {
                        crossClose();
                    }}
                >
                    <CancelIcon />
                </IconButton>
                <Button
                    variant="contained"
                    endIcon={<CancelIcon />}
                    onClick={() => {
                        setSearchWords("");
                        setSortField("created_at");
                        setSortOrder("desc");
                        setValueSalary([0, 4000]);
                        setValueWorktime([0, 40]);
                        setLocation("");
                        setField("");
                        setSelectedChips([]);
                        setIncludeNull(true);
                    }}
                    style={{ float: "right" }}
                >
                    Clear
                </Button>
                <h2>Search :</h2> {/*add auto-complete */}
                <label>
                    <TextField
                        name="searchWords"
                        label="job, company, description..."
                        value={searchWords}
                        onChange={(e) => {
                            setSearchWords(e.target.value);
                        }}
                    />
                </label>
                <h2>Sort by :</h2>
                <TextField
                    select
                    label="Field"
                    name="sortField"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                >
                    {sortFields.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Order"
                    name="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    {sortOrders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <h2>Details</h2>
                <label>
                    <h3>Salary</h3>

                    <Box sx={{ width: 225, mt: 5 }}>
                        <Slider
                            value={valueSalary}
                            min={0}
                            step={50}
                            max={4000}
                            onChange={(_event, newValue) => {
                                setValueSalary(newValue);
                            }}
                            valueLabelDisplay="on"
                            color="grey"
                        />
                    </Box>
                </label>
                <label>
                    <h3>Working Time</h3>

                    <Box sx={{ width: 225, mt: 5 }}>
                        <Slider
                            value={valueWorktime}
                            min={0}
                            step={1}
                            max={40}
                            onChange={(_event, newValue) => {
                                setValueWorktime(newValue);
                            }}
                            valueLabelDisplay="on"
                            color="grey"
                        />
                    </Box>
                </label>
                <h3>Location</h3>
                <label>
                    <TextField
                        name="location"
                        label="Houston, Chicago..."
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}
                    />
                </label>
                {/* <h3>Field</h3>
                <label>
                    <TextField
                        name="field"
                        label="Tourism, Agriculture..."
                        value={field}
                        onChange={(e) => {
                            setField(e.target.value);
                        }}
                    />
                </label> */}
                <label>
                    <h3>Contract type</h3>
                    <Grid container>
                        {contractTypes.map((contractType, index) => {
                            return (
                                <Chip
                                    key={index}
                                    sx={{ m: 0.5 }}
                                    color={
                                        selectedChips.includes(contractType)
                                            ? "primary"
                                            : "default"
                                    }
                                    label={contractType}
                                    onClick={() => {
                                        toggleChip(contractType);
                                    }}
                                />
                            );
                        })}
                    </Grid>
                    <FormControlLabel
                        sx={{ mt: 2 }}
                        control={<Checkbox />}
                        label="Include attributes not set"
                        checked={includeNull}
                        onChange={(e) => setIncludeNull(e.target.checked)}
                    />
                </label>
                <label>
                    <Button
                        sx={{ mt: 5 }}
                        type="submit"
                        variant="contained"
                        endIcon={<SearchIcon />}
                        onClick={() => {
                            filterAction();
                        }}
                    >
                        Filter
                    </Button>
                </label>
            </form>
        </Box>
    );

    return (
        <>
            <SwipeableDrawer
                anchor={"left"}
                open={isOpen}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                {Form()}
            </SwipeableDrawer>
        </>
    );
}
