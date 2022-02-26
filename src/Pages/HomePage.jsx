import '../App.css';
import * as React from 'react';
import Logo from '../Components/Logo/Logo.jsx';
import Buttons from '../Components/HomeButtons/HomeButtons.jsx';

function HomePage() {

  return (
    <div className="App-Page">
      <header className="App-header">
        <Logo></Logo>
        <Buttons></Buttons>
      </header>
    </div>
  );

}
export default HomePage;