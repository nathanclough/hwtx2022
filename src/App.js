import React from 'react';
import './index.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';
import Home from './Pages/HomePage';
import CreateTourn from './Pages/CreateTourn';

function App() {
  return (
    <div >
      <BrowserRouter>  
      <div className='App-Header'>
      <Navbar network="Etherium-testnet" connected={true} className="App-Header"/>
      </div>
      <div className='App-Page'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/tournaments/create" element={<CreateTourn/>} />
          <Route path="*" element={<div className='App-Page'>Invalid URL</div>}/>
        </Routes>
      </div>  
      </BrowserRouter>
    </div>
  );
}

export default App;
