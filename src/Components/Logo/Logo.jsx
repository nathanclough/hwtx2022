import * as React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import GamingLogo from "../../glogo.png";
import Typography from '@mui/material/Typography';

function Logo(props) {
  return (
    <Box sx={{ '& button': { m: 1 } }}>
        <div>
            <CardMedia
            component="img"
            style={{backgroundColor: "cyan"}}
            image={GamingLogo}
            alt="logo"
            />
        </div>
        <div>
            <Typography variant="h2" component="div" gutterBottom align='center'>
            Secure Gaming
            </Typography>
        </div>
        
    </Box>
  );
}
export default Logo;