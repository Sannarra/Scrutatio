import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { StackedBarChartSharp } from '@mui/icons-material';
import { assertIdentifier } from '@babel/types';


function valuetext(value) {
  return `${value}$`; 
}

const handleClick = () => { console.info('You clicked the 1st Chip.');};



export default function RangeSlider() {
  const [valueS, setValueS] = React.useState([1200, 3000]);
  const [valueW, setValueW] = React.useState([20, 30]);


 
  const handleChangeS = (event, newValue) => {
    setValueS(newValue);
  };

  const handleChangeW = (event, newValue) => {
    setValueW(newValue);
  };

  return (
    
    <form action="POST">
        <label>
            <h2>Search</h2>
            <input type="text" name="name" />
        </label>
        <h2>Filter</h2>
        <label>
            <h3>Salary</h3>
       
            <Box sx={{ width: 170 }}>
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
       
            <Box sx={{ width: 170 }}>
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
            <Box  display="flex"  sx={{ width: '100vw' }}>
                <Grid container rowSpacing={1} justifyContent="center" columnSpacing={{ xs: 0, sm: 1, md: 2 }}>
                    <Grid >
                        <Grid>
                            <Chip label="type" onClick={handleClick} />
                            <Chip label="type1" onClick={handleClick} />
                        </Grid>

                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 1, md: 2 }}>
                            <Chip label="type2" onClick={handleClick} />
                            <Chip label="type3" onClick={handleClick} />
                        </Grid>
                    </Grid >
                </Grid>
            </Box>
        </label>

        <label> 
            <input type="button" value="Submit" />
        </label>

       
  </form>
  
  );
}