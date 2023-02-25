import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ textLabel, options }) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id='demo-simple-select-label'>{textLabel}</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={age}
        label='Age'
        onChange={handleChange}
      >
        {options.map((option) => {
          return <MenuItem value={option.value}>{option.option}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}
