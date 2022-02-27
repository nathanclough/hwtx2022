import React from 'react';
import './index.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';
import Home from './Pages/HomePage';
import CreateTourn from './Pages/CreateTourn';
import FindTourn from './Pages/FindTourn';
import InfoTourn from './Pages/InfoTourn.jsx';
import JoinTourn from './Pages/JoinTourn';
import VerifyTourn from './Pages/VerifyTourn.jsx';

function App() {
  return (
    <div >
      <BrowserRouter>  
      <div className='App-Header'>
      <Navbar network="Ethereum-testnet" connected={true} className="App-Header"/>
      </div>
      <div className='App-Page'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/tournaments/create" element={<CreateTourn/>} />
          <Route path="/tournaments/find" element={<FindTourn/>} />
          <Route path="/tournaments/info" element={<InfoTourn/>} />
          <Route path="/tournaments/join" element={<JoinTourn/>}/>
          <Route path="/tournaments/verify" element={<VerifyTourn/>}/>
          <Route path="*" element={<div className='App-Page'>Invalid URL</div>}/>
        </Routes>
      </div>  
      </BrowserRouter>
    </div>
  );
}

export default App;
