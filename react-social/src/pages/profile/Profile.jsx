import React, { useEffect, useState } from 'react';
import './profile.css';
import SideBar from '../../components/sidebar/SideBar';
import TopBar from '../../components/topbar/TopBar';
import RightBar from '../../components/rightbar/RightBar';
import Feed from '../../components/feed/Feed';
import axios from 'axios';
import { useParams } from 'react-router';
export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [users, setUsers] = useState({});
  const username = useParams().username;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUsers(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <TopBar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileTop">
            <div className="profileCoverPhoto">
              <img
                className="profileCover"
                src={users.coverPicture || PF + 'person/noCover.png'}
                alt=""
              />
              <img
                className="profileAvatar"
                src={users.profilePicture || PF + 'person/noAvatar.png'}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{users.username}</h4>
              <span className="profileInfoDesc"> {users.desc}</span>
            </div>
          </div>
          <div className="profileBottom">
            <Feed username={username} />
            <RightBar users={users} />
          </div>
        </div>
      </div>
    </>
  );
}
