import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from "@mui/material/IconButton";


export default function FilterSidebar({ isOpen, setOpen }) {
  
  const [valueSalary, setValueSalary] = React.useState([1200, 3000]);
  const [valueWorktime, setValueWorktime] = React.useState([20, 30]);
  const [selectedChips, setSelectedChips] = React.useState([]);

  const toggleChip = (chip) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((c) => c !== chip));  
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const filterAction = () => {
    console.log(
      valueSalary,
      valueWorktime,
      selectedChips
    );
    setOpen(false);
  }

  const crossClose = () => {
    setOpen(false);
  }

  const Form = () => (
    <Box sx={{ width: 250, m: 2 }}>
      <form>
      <IconButton title='Close' onClick={() => {crossClose()}}><CancelIcon/></IconButton>
      <h2>Search :</h2>
        <label>
          <TextField label="job, company name ..." />
        </label>
        <h2>Details</h2>
        <label>
          <h3>Salary</h3>

          <Box sx={{ width: 170, mt: 5 }}>
            <Slider
              value={valueSalary}
              min={500}
              step={50}
              max={4000}
              onChange={(_event, newValue) => {
                setValueSalary(newValue);
              }}
              valueLabelDisplay='on'
              color='grey' 
            />
          </Box>
        </label>
        <label>
          <h3>Working Time</h3>

          <Box sx={{ width: 170, mt: 5 }}>
            <Slider
              value={valueWorktime}
              min={5}
              step={1}
              max={40}
              onChange={(_event, newValue) => {
                setValueWorktime(newValue);
              }}
              valueLabelDisplay='on'
              color='grey' 
            />
          </Box>
        </label>
        <h3>Location</h3>
        <label>
          <TextField label="Houston, Chicago" />
        </label>
        <h3>Secteurs</h3>
        <label>
          <TextField label="Tourism, Agriculture " />
        </label>

        <label>
          <h3>Contract type</h3>
            <Grid container>
              <Chip sx={{m: .5 }} color={selectedChips.includes(1) ? 'primary' : 'default'} label="Fixed-term" onClick={() => {toggleChip(1)}} />
              <Chip sx={{m: .5 }} color={selectedChips.includes(2) ? 'primary' : 'default'} label="Permanent" onClick={() => {toggleChip(2)}} />
              <Chip sx={{m: .5 }} color={selectedChips.includes(3) ? 'primary' : 'default'} label="Internship" onClick={() => {toggleChip(3)}} />
              <Chip sx={{m: .5 }} color={selectedChips.includes(4) ? 'primary' : 'default'} label="Apprenticeship" onClick={() => {toggleChip(4)}} />
              <Chip sx={{m: .5 }} color={selectedChips.includes(5) ? 'primary' : 'default'} label="Seasonal" onClick={() => {toggleChip(5)}} />
            </Grid>
        </label>

        <label>
          <Button sx={{ mt: 5 }} variant="contained" endIcon={<SearchIcon />} onClick={() => {filterAction()}}>
            Filter
          </Button>
        </label>
      </form>
    </Box>
  );

  return (
    <>
      <SwipeableDrawer
        anchor={'left'}
        open={isOpen}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        {Form()}
      </SwipeableDrawer>
    </>
  );
}