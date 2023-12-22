import React, { useContext } from 'react'
import { useState } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext';
export default function LoginPage() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setredirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
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
        setredirect(true);
      })
    }
    else{
      alert('wrong credentials');
    }
  }

  if(redirect) {
    return <Navigate to={'/'}/>
  }     

  return (
    <form action="" className='login' onSubmit={login}>
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
  )
}
