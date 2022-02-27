import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { ethers } from 'ethers'
import TournamentPrizePool from '../artifacts/contracts/TournamentPrizePool.sol/TournamentPrizePool.json'

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    timeout: 1000,
    headers: {'Referrer-Policy': 'no-referrer'}  });

async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }



export default function FormPropsTextFields() {
    const [inputs,updateInputs] = React.useState({ "name":null,"game":null,"size":null,"fee":null,"description":null})
    const [value, setValue] = React.useState(null);
    const updateState = (name,value) =>{
        inputs[name] = value
        updateInputs(inputs)
    }
  
    const submit = async () =>{

        console.log(inputs)
        await requestAccount()

        if(typeof window.ethereum !== 'undefined'){
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, TournamentPrizePool.abi, signer)
          const transaction = await contract.start(parseInt(inputs["size"]),parseInt(inputs["fee"]))
          await transaction.wait()

        }

        instance.post('/tournaments/create', {
            name: inputs["name"],
            game: inputs["game"],
            entryCount: parseInt(inputs["size"]),
            entryFee: parseFloat(inputs["fee"]),
            startTime: value,
            description: inputs["description"]
          }).then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

  return (
      
<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', height: '90%' }}>
    <Typography variant="h5" align='center' color = 'black'>
    Tournament registration form
    </Typography>
        <TextField
          required
          id="standard-required"
          label="Name of tournament"
          defaultValue=""
          variant="standard"
          value={inputs["name"]}
          onChange={(e) => updateState("name",e.target.value)}
        />
        <TextField
          required
          id="standard-required"
          label="Game choice"
          color="info"
          defaultValue=""
          variant="standard"
          value={inputs["game"]}
          onChange={(e) => updateState("game",e.target.value)}
        />
        <TextField
        
          required
          id="standard-number"
          label="Participant size"
          color="info"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={inputs["size"]}
          onChange={(e) => updateState("size",e.target.value)}
        />
        <TextField
          required
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          id="standard-required"
          label="Entry Fee"
          type = "number"
          color="info"
          defaultValue=""
          variant="standard"
          value={inputs["fee"]}
          onChange={(e) => updateState("fee",e.target.value)}
        />
        <TextField
          id="standard-helperText"
          label="Tournament Description"
          color="info"
          defaultValue=""
          variant="standard"
          value={inputs["description"]}
          onChange={(e) => updateState("description",e.target.value)}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Tournament Date and Time"
                value={value}
                onChange={(newValue) => {
                setValue(newValue);
                }}
            />
            </LocalizationProvider>

      <Button onClick={submit} variant="outlined" justifyContent= 'flex-end'>Submit</Button>
    </div>
  );
  
}
