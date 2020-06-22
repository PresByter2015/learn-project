import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Switch} from 's-react-library';
// import { Switch } from "react-library";
import Demo from './demo';
import requset from './lib/request';
import iFetch from './lib/reqest-fetch';
import iHttp from './lib/http';
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
    });
    localStorage.setItem ('dj-token', res2.data.data);
  };
  const handleFetchLogin = async () => {
    const res2 = await iFetch ({
      url: 'cats/login',
    });
    console.log ('fetch', res2);
    localStorage.setItem ('dj-token', res2.data.data);
  };
  const handleFetchRequest = async () => {
    const res1 = await iFetch ({
      url: 'cats/dd',
      method: 'POST',
      data: {
        a: 'fetch',
      },
    });
    console.log ('fetch', res1);
    // const res2 = await requset ({
    //   url: 'cats/ss/1',
    // });
    // console.log ('ppp-222', res2);
  };
  const handleFetch2Login = async () => {
    const res2 = await iHttp ({
      url: 'cats/login',
    });
    console.log ('fetch2', res2);

    localStorage.setItem ('dj-token', res2.data);
  };
  const handleFetch2Request = async () => {
    const res2 = await iHttp ({
      url: 'cats/ss/1',
    });
    console.log ('fetch2', res2);

    const res1 = await iHttp ({
      url: 'cats/dd',
      method: 'POST',
      data: {
        a: 'iHttp',
      },
    });
    console.log ('fetch2', res1);
  };
  const handleFetch2Form = async () => {
    let data = new FormData ();
    const res2 = await iHttp ({
      url: 'cats/form',
      method: 'POST',
      data: data.append('wwww','qwwqqeeq'),
    });
    console.log ('fetch2', res2);

    // localStorage.setItem ('dj-token', res2.data);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Switch />
        <button onClick={handleLogin}>登陆</button>
        <button onClick={handleRequest}>发起请求</button>
        <hr />
        <p>
          <button onClick={handleFetchLogin}>fetch-登陆</button>
          <br />
          <button onClick={handleFetchRequest}>fetch-发起请求</button>
        </p>
        <p>
          <button onClick={handleFetch2Login}>fetch-2-登陆</button>
          <br />
          <button onClick={handleFetch2Request}>fetch-2-发起请求</button>
          <button onClick={handleFetch2Form}>fetch-2-form-发起请求</button>
        </p>
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
