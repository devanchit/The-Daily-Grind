import { useEffect, useState } from "react";
import { Navigate,useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import Editor from "../Editor";
import '../../styleSheets/Blogs.css';

export default function EditPost(){
    const [title, settitle] = useState('')
    const [summary, setsummary] = useState('')
    const [content, setcontent] = useState('')
    const [files, setfiles] = useState('')
    const [redirect,setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(() =>{
        fetch('http://localhost:4000/post/'+id)
        .then(response => {
           response.json().then(postInfo =>{
            settitle(postInfo.title);
            setcontent(postInfo.content);
            setsummary(postInfo.summary);
           })
        });
    },[]);

    async function updatePost(ev){
        ev.preventDefault();

        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id', id);
        if (files?.[0]){
            data.set('file',files?.[0]);
        }

        const response = await fetch('http://localhost:4000/post',{
            method: 'PUT',
            body: data,
            credentials: "include",
        });

        if (response.ok){
            setRedirect(true)
        }
    }

    if(redirect){
        return <Navigate to = {'/post/'+id}/>
    }
    return (
        <form className="create-post-form" onSubmit={updatePost}>
            <h1>Edit post</h1>
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

            <Editor onChange={setcontent} value={content}/>

            <button className="create-post-button">Update post</button>
             
        </form>
    );
}