import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Switch} from 's-react-library';
// import { Switch } from "react-library";
import Demo from './demo';
import requset from './lib/request';
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
  const handleRequest = async () => {
    const res1 = await requset ({
      url: 'cats/ss/12',
    });
    console.log ('ppp', res1);
    const res2 = await requset ({
      url: 'cats/ss/1',
    });
    console.log ('ppp-222', res2);
  };
  const handleLogin = async () => {
    const res2 = await requset ({
      url: 'cats/login',
      cancelToken: () => false,
    });
    localStorage.setItem ('dj-token', res2.data.data);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Switch />
        <button onClick={handleLogin}>登陆</button>
        <button onClick={handleRequest}>发起请求</button>
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
