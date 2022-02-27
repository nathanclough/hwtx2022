import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import GamingLogo from "../../glogo.png";
import Avatar from '@mui/material/Avatar';


function Navbar(props) {
    const navigate = useNavigate();
    const redirect = (url) =>{
        navigate(url)
    }
    return( 
      <AppBar position="fixed">
        <Toolbar>
            <Avatar src={GamingLogo} onClick={() => {redirect("/")}} sx={{cursor:'pointer'}} variant="square"/>
            <Typography onClick={() => {redirect("/")}} variant="h5" style={{paddingLeft: "10px"}} component="div" sx={{ flexGrow: 1, cursor:'pointer'}} fontWeight={'bold'}>
                TournaNet
            </Typography> 
            <Grid width={150} container direction={'row'} spacing={1}>
                <Grid item>
                    <CloudIcon fontSize="small"/>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" component="div">
                    {props.network}
                    </Typography>
                </Grid>
            </Grid>
                
        </Toolbar>
      </AppBar>
    );

}export default Navbar