import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './topbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';


export default function TopBar() {
  const { user } = useContext(AuthContext);
  console.log(user)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbar-container">
      <div className="left-side">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">FaceLook</span>
        </Link>
      </div>
      <div className="center-side">
        <div className="searchbar-input">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search posts"
            className="search-input"
          />
        </div>
      </div>
      <div className="right-side">
        <div className="topbar-links">
          <span className="topbarlink">Homepage</span>
          <span className="topbarlink">Timeline</span>
        </div>
        <div className="topbar-icons">
          <div className="topbar-icon-items">
            <PersonIcon />
            <span className="BadgeIcon">1</span>
          </div>
          <div className="topbar-icon-items">
            <ChatIcon />
            <span className="BadgeIcon">2</span>
          </div>
          <div className="topbar-icon-items">
            <NotificationsIcon />
            <span className="BadgeIcon">3</span>
          </div>
        </div>
        {user?(
           <Link to={`/profile/${user.username}`}>
           <img
             src={
               user.profilePicture
                 ? PF + user.profilePicture
                 : PF + 'person/noAvatar.png'
             }
             alt="newimage"
             className="topbar-img"
           />
         </Link>
        ):null}
       
      </div>
    </div>
  );
}
