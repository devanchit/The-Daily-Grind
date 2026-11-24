import React from 'react'
import Post from '../Post'
import { useEffect } from 'react'
import { useState } from 'react'


const IndexPage = () => {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post').then(response =>{
      response.json().then(posts => {
        console.log(posts);
        setposts(posts);
      });
    });  
  }, []);
  
  return (
    <div className="post-container">
       {posts.length > 0 && posts.map(post => (
        <Post {...post}/>
        
       ))}
    </div>
  );
}

export default IndexPage