'use client'
import './css/auth-methods.css';
import './globals.css'
import { useState, useEffect, useRef } from 'react';

function ClubAuthMethods() {
  const [errorMessage, setErrorMessage] = useState({ times: 0, message: null });
  const [state, changeState] = useState({ type: null, data: {} });
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  async function login() {
    let urlParams = {};
    if (typeof document !== 'undefined') {
      const queryParams = new URLSearchParams(document.location.search);
      console.log("QUERYPARAMS", queryParams);
      urlParams = queryParams;
    }

    await fetch("https://api.staticfans.com/login", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
      body: JSON.stringify({
        username: username,
        password: password
      })
		})
		.then(res => res.json())
		.then(data => {
      if (data.ok == true) {
        const params = new URLSearchParams({ data: data.data, state: urlParams["state"] });
        window.location.href = `https://staticfans.motionfans.club/club/grant?${params.toString()}`;
      } else if (data.error == true) {
        alert(data.message);
      } else {
        alert("Something went wrong.");
      }
		})
  }

  return (
    <div className="AppLogin div">
      {errorMessage.message != null && <p style={{marginBottom:10}} className="errorMessage">{errorMessage.message} [{errorMessage.times}]</p>}
      {state.type == null && <div className="loginWindow secondaryDiv">
        <h1 style={{ fontSize: 20, alignSelf: "flex-start", marginBottom: 0 }}>Login Example</h1>
        <p className='greyText'>THIS IS AN EXAMPLE PAGE, NOT A REAL LOGIN. The security here is for demostration purposes, you should not use this in production. Valid credentials are "example" as username and "pass" as password. Anything else will trigger an invalid event.</p>
        <input value={username} onChange={(e) => { setUsername(e.target.value); }} className='loginExampleInput input' placeholder='Username' style={{ marginBottom: 0 }}/>
        <input value={password} onChange={(e) => { setPassword(e.target.value); }} className='loginExampleInput input' placeholder='Password' style={{ marginTop: -4 }}/>
        <button onClick={() => { login(); }} style={{ width: "100%" }} className='button loginButton'>Login</button>
      </div>}
    </div>
  );
}

export default ClubAuthMethods;