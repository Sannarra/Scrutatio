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
import MenuItem from '@mui/material/MenuItem';


export default function FilterSidebar({ isOpen, setOpen, csrf_token, SelectTextFields }) {

  const [order, setOrder] = React.useState('ascending');
  const [valueSalary, setValueSalary] = React.useState([500, 4000]);
  const [valueWorktime, setValueWorktime] = React.useState([5, 40]);
  const [selectedChips, setSelectedChips] = React.useState([]);

  const toggleChip = (chip) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((c) => c !== chip));  
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const filterAction = (e) => {
    
    setOpen(false);
  }

  const crossClose = () => {
    setOpen(false);
  }

  const sortBy = [
    {
      value: "ascending",
      name: "ascending",
      label: 'by date ascending',

    },
    {
      value: "desending",
      name: "desending",
      label: 'by date desending',
    },
  ];
  
    const handleChange = (event) => {
      setOrder(event.target.value);
    };


  const Form = () => (

    <Box sx={{ width: 250, m: 2, ml: 4}}>
      <form action="#" onSubmit={filterAction}>
      <input
          type="hidden"
          name="_token"
          value={csrf_token}
      />
      <input type="hidden" name="minSalary" value={valueSalary[0]}/>
      <input type="hidden" name="maxSalary" value={valueSalary[1]}/>

      <input type="hidden" name="minHours" value={valueWorktime[0]}/>
      <input type="hidden" name="maxHours" value={valueWorktime[1]}/>

      <IconButton title='Close' onClick={() => {crossClose()}}><CancelIcon/></IconButton>
     
      <h2>Search :</h2> {/*add search with all the others elements */}
        <label>
          <TextField name="name" label="job, company, description..." />
        </label>
          <h2>Sort by :</h2> {/*linked with back */}

          <TextField
          id="outlined-select-order"
          select
          label="Select"
          value={order}
          onChange={handleChange}
        >
          {sortBy.map((option) => (
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

          <Box sx={{ width: 225, mt: 5 }}>
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
          <TextField name="location" label="Houston, Chicago..." />
        </label>
        <h3>Field</h3>
        <label>
          <TextField name="field" label="Tourism, Agriculture..." />
        </label>

        <label>
          <h3>Contract type</h3> {/*linked with back */}
            <Grid container>
              <Chip sx={{m: .5 }} color={selectedChips.includes(1) ? 'primary' : 'default'} label="Fixed-term" onClick={() => {toggleChip(1)}} />
              <Chip sx={{m: .5 }} color={selectedChips.includes(2) ? 'primary' : 'default'} label="Permanent" onClick={() => {toggleChip(2)}} />
              <Chip sx={{m: .5 }} color={selectedChips.includes(3) ? 'primary' : 'default'} label="Internship" onClick={() => {toggleChip(3)}} />
              <Chip sx={{m: .5 }} color={selectedChips.includes(4) ? 'primary' : 'default'} label="Apprenticeship" onClick={() => {toggleChip(4)}} />
              <Chip sx={{m: .5 }} color={selectedChips.includes(5) ? 'primary' : 'default'} label="Seasonal" onClick={() => {toggleChip(5)}} />
            </Grid>
        </label>

        <label>
          <Button sx={{ mt: 5 }} type="submit" variant="contained" endIcon={<SearchIcon />} onClick={() => {filterAction()}}>
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