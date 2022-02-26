import React from 'react';
import './index.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';
import Home from './Pages/HomePage';

function App() {
  return (
    <div >
      <BrowserRouter>  
      <div>
      <Navbar network="Etherium-testnet" connected={true}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="*" element={<div className='App-Page'>Invalid URL</div>}/>
        </Routes>
        </div>  
      </BrowserRouter>
    </div>
  );
}

export default App;
