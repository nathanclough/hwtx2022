import { ethers } from 'ethers'
import TournamentPrizePool from '../artifacts/contracts/TournamentPrizePool.sol/TournamentPrizePool.json'
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { CONTRACT_ADDRESS } from '../constants';

export default function VerifyTourn() {
    const [winner, setWinner] = useState("")

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }

    const verify = async () =>{
        await requestAccount()
        if(typeof window.ethereum !== 'undefined'){
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(CONTRACT_ADDRESS, TournamentPrizePool.abi, signer)
          const transaction = await contract.determineWinners(winner)
          await transaction.wait()
        }
    }
    
    return (
        <div style={{display:'flex',marginTop:'25px',flexDirection:'column', alignItems:'center'}}>
            <TextField  label={"First Place Address"} value={winner} onChange={(e) => setWinner(e.target.value)}></TextField> 
            <Button onClick={verify}>Submit Winner</Button>
        </div>
    );
}