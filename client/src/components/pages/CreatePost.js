import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

export default function CreatePost(){
    const [title, settitle] = useState('')
    const [summary, setsummary] = useState('')
    const [content, setcontent] = useState('')
    const [files, setfiles] = useState('')
    const [redirect, setredirect] = useState(false);
    async function createNewPost(ev)
    {
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
        ev.preventDefault();
        console.log(files);
        const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
        });
        if(response.ok)
        {
            setredirect(true);
        }

    }
    if(redirect){
        return <Navigate to = {'/'}/>
    }
    return (
        <form onSubmit={createNewPost}>here is you new post
            <input type = "title" placeholder="Title" 
            value={title}
            onChange={ev => settitle(ev.target.value)}
            />
            <input type = "summary" placeholder="Summary"
            value={summary}
            onChange={ev => setsummary(ev.target.value)}
            />
            <input type = "file" 
            onChange = { ev => setfiles(ev.target.files)}
            />

            <Editor value={content} onChange={setcontent} />
            <button style={{marginTop:'13px'}}>Create post</button>
             
        </form>
    );
}