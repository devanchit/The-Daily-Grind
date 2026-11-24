import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';
import '../../styleSheets/Blogs.css';

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
        <form className="create-post-form" onSubmit={createNewPost}>
            <h1>Create a new post</h1>
            <input type="text" placeholder="Title"
            value={title}
            onChange={ev => settitle(ev.target.value)}
            />
            <input type="text" placeholder="Summary"
            value={summary}
            onChange={ev => setsummary(ev.target.value)}
            />
            <input type="file"
            onChange = { ev => setfiles(ev.target.files)}
            />

            <Editor value={content} onChange={setcontent} />
            <button className="create-post-button">Create post</button>
             
        </form>
    );
}