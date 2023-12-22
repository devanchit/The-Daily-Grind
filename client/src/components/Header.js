import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {useState, useEffect } from 'react';
import { UserContext } from './UserContext';

export default function Header() {

  const {setUserInfo,userInfo} = useContext(UserContext);
  // const [username, setusername] = useState(null);
  useEffect(() => {
    
    fetch('http://localhost:4000/profile',{
      credentials: 'include',
    }).then(response =>{
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  
  }, []);
  
  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  return (
    <header>
          <Link to="/" className="logo">The Daily Grind</Link>
          <nav>
            {username && (
              <>
              <Link to = "/create">Create new post</Link>
              <a onClick={logout}>logout</a>
              </>
            )}
            {!username && (
              <>
              <Link to="/login" className="">Login</Link>
              <Link to="/register" className="">Register</Link>
              </>
            )}
          </nav>
    </header>
  )
}
