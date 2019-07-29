import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This should now be changed in the django template too.
        </p>
        <p>
          This is another paragraph with some fake content.
        </p>
      </header>
    </div>
  );
}

export default App;
