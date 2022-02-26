import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function HomeButtons(props) {
    const navigate = useNavigate();
    const redirect = (url) =>{
        navigate(url)}
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <div>
            <Button onClick={() => {redirect("/tournaments/create")}} size="large" variant="contained" align='center'>Create Tournament</Button>
            </div>
            <div>
            <Button size="large" variant="contained" align='center'>Find Tournament</Button>
            </div>
        </Box>
    );
}export default HomeButtons;