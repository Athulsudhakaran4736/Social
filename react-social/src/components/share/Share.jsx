import React, { useContext, useRef, useState } from 'react';
import './share.css';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [files, setFiles] = useState(null);
  const desc = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    console.log(newPost);
    if (files) {
      const data = new FormData();
      const fileName = Date.now() + files.name;
      data.append('name', fileName);
      data.append('file', files);
      newPost.img = fileName;
      try {
        await axios.post('/uploads', data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post('/posts', newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareTopImage"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + '/person/noAvatar.png'
            }
            alt="shareimg"
          />
          <input
            placeholder={'What is in your mind ' + user.username + ' ?'}
            ref={desc}
            className="shareTopInput"
          />
        </div>
        <hr className="shareHr" />
        {files && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(files)} alt="" />
            <CloseIcon
              className="shareCancelIcon"
              onClick={() => {
                setFiles(null);
              }}
            />
          </div>
        )}
        <form className="shareBottom" method="post" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PhotoSizeSelectActualIcon
                htmlColor="tomato"
                className="shareOptionIcon"
              />
              <span className="shareOptionText">Photos or Videos</span>
              <input
                style={{ display: 'none' }}
                id="file"
                type="file"
                name="name"
                accept=".jpeg,.png,.jpg"
                onChange={(e) => setFiles(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LocalOfferIcon htmlColor="blue" className="shareOptionIcon" />
              <span className="shareOptionText">Tags</span>
            </div>
            <div className="shareOption">
              <LocationOnIcon htmlColor="green" className="shareOptionIcon" />
              <span className="shareOptionText">Locations</span>
            </div>
            <div className="shareOption">
              <AddReactionIcon
                htmlColor="goldenrod"
                className="shareOptionIcon"
              />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareOptionButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
