import { ethers } from 'ethers'
import TournamentPrizePool from '../artifacts/contracts/TournamentPrizePool.sol/TournamentPrizePool.json'
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function JoinTourn() {
    const [info,setInfo] = useState({})
    const navigate = useNavigate();

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
    
    const getInfo = async () =>{
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const   contract = new ethers.Contract(CONTRACT_ADDRESS,TournamentPrizePool.abi,provider)
            try{
                const name = await contract.name()
                const count = await contract.currentEntries()
                console.log(count)
                setInfo({"name":name,"count":parseInt(count)});
            }
            catch(err){
                console.log(err)
            }
        }
    }

    useEffect( () => {
        getInfo()
    }, [])

    const join = async () =>
    {
        await requestAccount()
        if(typeof window.ethereum !== 'undefined'){
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(CONTRACT_ADDRESS, TournamentPrizePool.abi, signer)
          const transaction = await contract.join({ value: ethers.utils.parseEther("5") })
          await transaction.wait()
        
        }
        navigate("/")
        
    }
    
    return (
        <div style={{display:'flex',marginTop:'25px',flexDirection:'column', alignItems:'center'}}>
            <h3>Tournament Name: {info["name"]}</h3>
            <h4>Entry Count: {info["count"]}</h4>   
            <Button onClick={join}>Join Tournament</Button>
        </div>
        );
}
