import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';

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

  const Form = () => (
    <Box sx={{ width: 250, m: 2 }}>
      <form>
        <label>
          <h2>Search</h2>
          <input type="text" name="name" />
        </label>
        <h2>Filter</h2>
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
              color='grey' // use graphic charter color
            />
          </Box>
        </label>
        <label>
          <h3>Worktime</h3>

          <Box sx={{ width: 170, mt: 5 }}>
            <Slider
              value={valueWorktime}
              min={5}
              step={1}
              max={40}
              onChange={(_event, newValue) => {
                setValueSalary(newValue);
              }}
              valueLabelDisplay='on'
              color='grey' // use graphic charter color
            />
          </Box>
        </label>
        <label>
          <h3>Localisation</h3>
          <input type="text" name="name" />
        </label>
        <label>
          <h3>Secteurs</h3>
          <input type="text" name="name" />
        </label>

        <label>
          <h3>Contract type</h3>
          <Box>
            <Grid container>
              <Chip sx={{ m: .5 }} label="type" onClick={() => {toggleChip(1)}} />
              <Chip sx={{ m: .5 }} label="AAAAAAA" onClick={() => {toggleChip(2)}} />
              <Chip sx={{ m: .5 }} label="type2" onClick={() => {toggleChip(3)}} />
              <Chip sx={{ m: .5 }} label="1" onClick={() => {toggleChip(4)}} />
              <Chip sx={{ m: .5 }} label="type1" onClick={() => {toggleChip(5)}} />
              <Chip sx={{ m: .5 }} label="type2" onClick={() => {toggleChip(6)}} />
              <Chip sx={{ m: .5 }} label="type3" onClick={() => {toggleChip(7)}} />
            </Grid>
          </Box>
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