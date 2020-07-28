import React from 'react';
import './App.css';
import '@ionic/react/css/core.css';
import Previewer from './components/previewer';
import TypeSelector from './components/typeSelector';
import TypeSlides from './components/typeSlides';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Previewer />
        <TypeSelector />
        <TypeSlides />
      </header>
    </div>
  );
}

export default App;
