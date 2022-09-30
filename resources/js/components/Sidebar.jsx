import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';




function valuetext(value) {
  return `${value}$`; 
}

const handleClick = () => { console.info('You clicked the 1st Chip.');};


export default function SwipeableTemporaryDrawer() {
  
  const handleChangeS = (event, newValue) => {
    setValueS(newValue);
  };

  const handleChangeW = (event, newValue) => {
    setValueW(newValue);
  };
  const [valueS, setValueS] = React.useState([1200, 3000]);
  const [valueW, setValueW] = React.useState([20, 30]);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const form = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, m: 2  }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
 <form action="POST" >
        <label>
            <h2>Search</h2>
            <input type="text" name="name" />
        </label>
        <h2>Filter</h2>
        <label>
            <h3>Salary</h3>
       
            <Box sx={{ width: 170, mt: 5 }}> 
            <Slider
                getAriaLabel={() => 'Salary range'}
                value={valueS}
                min={500}
                step={50}
                max={4000}
                onChange={handleChangeS}
                getAriaValueText={valuetext}
                valueLabelDisplay='on'
                color='grey'
            />
            </Box>
        </label>
        <label>
            <h3>Worktime</h3>
       
            <Box sx={{ width: 170,  mt: 5}}>
            <Slider
                getAriaLabel={() => 'Worktime range'}
                value={valueW}
                min={5}
                step={1}
                max={40}
                onChange={handleChangeW}
                getAriaValueText={valuetext}
                valueLabelDisplay='on'
                color='grey'
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
                      <Chip  sx={{ m: .5}} label="type" onClick={handleClick} />
                      <Chip sx={{ m: .5}} label="type1" onClick={handleClick} />
                      <Chip sx={{ m: .5}} label="type2" onClick={handleClick} />
                      <Chip sx={{ m: .5}} label="type3" onClick={handleClick} />
                      <Chip sx={{ m: .5}} label="type3" onClick={handleClick} />
                      <Chip sx={{ m: .5}} label="type3" onClick={handleClick} />
                      <Chip sx={{ m: .5}} label="type3" onClick={handleClick} />
                </Grid>
            </Box>
        </label>

        <label> 
            <input type="button" value="Submit" />
        </label>

  </form>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {form(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
