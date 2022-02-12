import React from 'react';
import {
	Box,
	Button,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const Actions = ({
  isAddDisabled,
  isLoading,
  onAdd,
  onSearch
}) => {
  return (
    <Box display="flex" justifyContent="space-between" mt={2}>
      <Button
        disabled={isAddDisabled}
        onClick={() => onAdd()} variant="outlined"
      >
        <AddIcon />
      </Button>
      <Button
        disabled={isLoading}
        onClick={() => onSearch()}
        variant="outlined"
        startIcon={!isLoading && <SearchIcon />}
      >
        {isLoading ? <CircularProgress size={10} /> : 'Search'}
      </Button>
    </Box>
  );
};

export default Actions;
