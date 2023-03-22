import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import './post.css';
import {format} from 'timeago.js'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
export default function Post({ posts }) {
  const [like, setLike] = useState(posts.like.length);
  const [users,setUsers] = useState({})
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const{user} = useContext(AuthContext)

useEffect(()=>{
  setIsLiked(posts.like.includes(user._id))
},[posts.like,user._id])

  useEffect(()=>{
    const fetchUser = async() =>{
      const res = await axios.get(`/users?userId=${posts.userId}`)
      setUsers(res.data)
    }
    fetchUser();
  },[posts.userId ])

  const clickHandler = () => {
    try {
      axios.put('/posts/'+posts._id+'/like',{userId:user._id  })
    } catch (error) {
      
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${users.username}`}>
            <img
              className="postTopImage"
              src={users.profilePicture || PF+'person/noAvatar.png'}
              alt=""
            />
            </Link>
            <span className="postTopText">
              {users.username}
            </span>
            <span className="postTopDate">{format(posts.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon className="postTopRightIcon" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postCenterText">{posts.desc}</span>
          <img src={ PF+posts.img} alt="" className="postCenterImage" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}/person/heart.png`}
              alt=""
              className="postBottomLeftImage"
              onClick={clickHandler}
            ></img>
            <img
              src={`${PF}/person/like.png`}
              alt=""
              className="postBottomLeftImage"
              onClick={clickHandler}
            ></img>
            <span className="likeCounter">{like} Likes</span>
          </div>
          <div className="postBottomRight">
            <span className="postBottomRightText">
              {posts.comment} Comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
