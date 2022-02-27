import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function CustomizedInputBase() {
  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', height: '90%' }}>
    <Paper
      component="form"
      sx={{ p: '6px 4px', display: 'flex', alignItems: 'left', width: 400 }}
    >
      <InputBase
        sx={{ ml: 8, flex: 1 }}
        placeholder="search tournaments"
        inputProps={{ 'aria-label': 'search tournaments' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>

    </Paper>
    </div>
  );
}
