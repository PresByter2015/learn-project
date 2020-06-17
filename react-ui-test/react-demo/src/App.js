import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Switch} from 's-react-library';
// import { Switch } from "react-library";
import Demo from './demo';
function App () {
  const lists = [
    {
      id: '1',
      title: '我是i·1111',
    },
    {
      id: 2,
      title: '我是i·222',
    },
    {
      id: 3,
      title: '我是i-3333',
    },
  ];
  return (
    <div className="App">
      <Switch />
      <header className="App-header">
        <Demo data={lists} />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
