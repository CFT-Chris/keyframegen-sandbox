import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@ionic/react/css/core.css';
import TypeSelector from './components/typeSelector';
import TypeSlides from './components/typeSlides';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TypeSelector />
        <TypeSlides />
      </header>
    </div>
  );
}

export default App;
