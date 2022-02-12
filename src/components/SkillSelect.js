import React from 'react';
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

const SkillSelect = ({
  idx,
  skills,
  onChange,
  onRemove,
  selectedSkill,
  value
}) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
      <Select
        fullWidth
        onChange={(e) => onChange(idx, 'key', e.target.value)}
        variant="outlined"
        value={selectedSkill}
        MenuProps={{ style: { height: 300 }}}
      >
        {
          skills?.map(skill => (
            <MenuItem key={skill.id} value={skill.slug}>
              {skill.name}
            </MenuItem>
          ))
        }
      </Select>
      <TextField
        InputProps={{ inputProps: { min: 0, max: 5 }}}
        type="number"
        onChange={(e) => onChange(idx, 'value', e.target.value)}
        variant="outlined"
        value={value}
        sx={{ width: 110, marginLeft: 2 }}
      />
      <IconButton onClick={() => onRemove(idx)}>
        <RemoveIcon />
      </IconButton>
    </Box>
  );
};

export default SkillSelect;
