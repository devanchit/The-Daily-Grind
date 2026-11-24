import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext';
import '../../styleSheets/Blogs.css';
export default function LoginPage() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setredirect] = useState(false);
  const [showCredentialsDialog, setShowCredentialsDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  useEffect(() => {
    if (!showSuccessDialog) return;

    const timeoutId = setTimeout(() => {
      setShowSuccessDialog(false);
      setredirect(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [showSuccessDialog]);

  async function login(ev){
    ev.preventDefault();
    // const response = 
    const response = await fetch('http://localhost:4000/login',{
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });
    
    if(response.ok)
    {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setShowSuccessDialog(true);
      })
    }
    else{
      setShowCredentialsDialog(true);
    }
  }

  if(redirect) {
    return <Navigate to={'/'}/>
  }     

  return (
    <>
      <form className="login login-form" onSubmit={login}>
          <h1>Login</h1>
          <input type="text"
                placeholder='username'
                value={username}
                onChange={ev => setusername(ev.target.value)} />
          <input type="password"
                placeholder='password'
                value={password}
                onChange={ev => setpassword(ev.target.value)} />
          <button>Login</button>
      </form>
      {showCredentialsDialog && (
        <div className="dialog-backdrop">
          <div
            className="auth-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="credentials-dialog-title"
          >
            <h2 id="credentials-dialog-title">Login failed</h2>
            <p>Wrong username or password. Please try again.</p>
            <button autoFocus onClick={() => setShowCredentialsDialog(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      {showSuccessDialog && (
        <div className="dialog-backdrop">
          <div
            className="auth-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-success-title"
          >
            <h2 id="login-success-title">Login successful</h2>
            <p>You are now signed in.</p>
          </div>
        </div>
      )}
    </>
  )
}
