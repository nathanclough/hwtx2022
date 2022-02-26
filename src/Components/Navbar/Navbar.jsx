import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';


function Navbar(props) {
    const navigate = useNavigate();
    const redirect = (url) =>{
        navigate(url)
    }
    return( 
      <AppBar position="fixed">
        <Toolbar>
            <Typography onClick={() => {redirect("/")}} variant="h5" style={{paddingRight: "25px"}} component="div" sx={{ flexGrow: 1 }}>
                Secure Gaming
            </Typography> 
            <Grid container spacing={1}direction="row" alignItems="center" >
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