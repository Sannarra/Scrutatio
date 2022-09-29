import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function valuetext(value) {
    return `${value}°C`;
}

export default function Sidebar() {
    const [value, setValue] = React.useState([20, 37]);
    const handleChange = (event, newValue) => {
        setValue(newValue);


    return (
        <div className='sidebar'>
            <form>
                <h2>Search</h2>
                <label>
                    <input type="text" name="name" />
                </label>

                <label>
                    <h2>Filter</h2>
                    Salary: <br />
                    <Box sx={{ width: 300 }}>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                        />
                    </Box>
            </label>









            <input type="submit" value="Submit" />
            </form>
        </div>
    )
 } }