import { useEffect,useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {formatISO9075} from 'date-fns';
import { UserContext } from '../UserContext';
import { Link } from "react-router-dom";

export default function PostPage(){
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();

    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            });
        });
    },[]);

    if(!postInfo) return 'Fetching ....';

    return(
    <div className="post-page">
        <div className="image">
            <img src={`http://localhost:4000/${postInfo.cover}`} />
        </div>

        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author">by @{postInfo.author.username}</div>
        {userInfo.id === postInfo.author._id && (
            <div className="edit-row">
            <Link className="edit-btn" to={`/edit/${postInfo._id}`}>Edit this post </Link>
            </div>
        )}

        <h1> {postInfo.title} </h1>
        <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
        <hr />
    </div>
    );
}