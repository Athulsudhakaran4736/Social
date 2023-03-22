import React, { useContext, useEffect, useState } from 'react';
import './rightbar.css';
import { Users } from '../../DummyData';
import Active from '../active/Active';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import RemoveIcon from '@mui/icons-material/Remove';
import { UnFollow } from '../../context/AuthActions';
export default function RightBar({ users }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getfriends = async () => {
      try {
        const friendList = await axios.get('/users/friends/' + users._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getfriends();
  }, [users]);

  const [followed, setFollowed] = useState(
    currentUser.followings.includes(users?.id)
  );

  const clickHandler = async () => {
    try {
      if (followed) {
        await axios.put('/users/' + users._id + '/unfollow', {
          userId: currentUser._id,
        });
        dispatch({ type: 'UnFollow', payload: users._id });
      } else {
        await axios.put('/users/' + users._id + '/follow', {
          userId: currentUser._id,
        });
        dispatch({ type: 'Follow', payload: users._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };
  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/person/gift.png" className="giftImg" alt="" />
          <span className="birthdayText">
            <b>Franklin</b> and <b>3 others</b> have a birthday today
          </span>
        </div>
        <img className="rightBarAd" src="assets/person/ad.png" alt="" />
        <h4 className="friendListHeader">Online Friends</h4>
        <ul className="rightBarFriendList">
          {Users.map((u) => (
            <Active key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightBar = () => {
    return (
      <>
        <div className="rightBarUser">
          <div className="rightBarUserInfo">
            {users.username !== currentUser.username && (
              <button className="rigthBarFollow" onClick={clickHandler}>
                {followed ? 'Unfollow' : 'Follow'}
                {followed ? <RemoveIcon /> : <AddIcon />}
              </button>
            )}
            <h4 className="rightBarUserInfoText"> User Information</h4>
            <div className="rigthBarInfoList">
              <span className="rightBarUserInfoKey">City:</span>
              <span className="rightBarUserInfoValue">{users.city}</span>
            </div>
            <div className="rigthBarInfoList">
              <span className="rightBarUserInfoKey">From:</span>
              <span className="rightBarUserInfoValue">{users.from}</span>
            </div>
            <div className="rigthBarInfoList">
              <span className="rightBarUserInfoKey">Relationship:</span>
              <span className="rightBarUserInfoValue">
                {users.relationship === 1 ? 'single' : 'committed'}
              </span>
            </div>
          </div>
          <h4 className="rightBarUserInfoText">Friends</h4>
          <div className="rightBarUserFollowings">
            {friends.map((friend) => (
              <div className="rightBarUserFollowing">
                <Link
                  to={'/profile/' + friend.username}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + '/person/noAvatar.png'
                    }
                    alt=""
                    className="rightBarUserFollowingImg"
                  />
                  <span className="rightBarUserFollowingText">
                    {friend.username}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightBar">
      <div className="rightBarWrapper">
        {users ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
