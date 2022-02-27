import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  timeout: 1000,
  headers: {'Referrer-Policy': 'no-referrer'}  });

export default function CustomizedInputBase() {
  const [inputs,updateInputs] = React.useState( {"name":null})
  const [apiResult,setApiResult] = React.useState([])
  const updateState = (name,value) =>{
    inputs[name] = value
    updateInputs(inputs)
}


  const submit = async () =>{
    instance.post('/tournaments/search', {
        name: inputs["name"]
      }).then(res => {
        setApiResult(res.data.result);
    })
  }

  return (
    <div>
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', height: '90%', paddingTop:'10px' }}>
    <Paper
      sx={{ p: '6px 4px', display: 'flex', alignItems: 'left', width: 400, backgroundColor:"lightgray" }}
    >
      <InputBase
        sx={{ ml: 8, flex: 1 }}
        placeholder="search tournaments"
        inputProps={{ 'aria-label': 'search tournaments' }}
        onChange={(e) => updateState("name",e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            submit()}
          }
        }
      />
      <IconButton sx={{ p: '10px', color:'black' }} aria-label="search" onClick={submit}>
        <SearchIcon />
      </IconButton>

    </Paper>

    </div>
    <div style={{display: 'flex', alignItems: 'center', flexDirection:"column" }}>{apiResult.map((apiResult, idx)=>(<p key={idx}>{apiResult[0]}</p> ))} </div>
    </div>
  );
}
