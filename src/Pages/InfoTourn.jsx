import * as React from 'react';
import Typography from '@mui/material/Typography';


export default function CustomizedInputBase(props) {
  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', height: '90%', paddingTop:'10px' }}>
      <Typography variant="h5" align='center' color = 'black' fontWeight={'bold'}>
      Tournament Name:
      </Typography>
      {props.name}
      <Typography variant="h5" align='center' color = 'black' fontWeight={'bold'}>
      Game Choice:
      </Typography>
    </div>
  );
}
