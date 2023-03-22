import React from 'react';
import './active.css';

export default function Active({user}) {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(user);
  return (
    <div>
      <li className="rightBarFriendItem">
        <div className="rightBarFriendListContainer">
          <img
            className="rightBarFriendListImg"
            src={pf+user.profilePicture}
            alt=""
          />
          <span className="rightBarActiveOnline"></span>
        </div>
        <span className="rightBarFriendListText">{user.username}</span>
      </li>
    </div>
  );
}
