import React from 'react';
import './sidebar.css';
import Friends from '../friends/Friends';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import { Users } from '../../DummyData';
export default function SideBar() {
  return (
    <div className="sideBar">
      <div className="sideBarWrapper">
        <ul className="sidebarList">
          <li className="sideBarItem">
            <RssFeedIcon className="sideBarIcon" />
            <span className="sidebarItemText">Feeds</span>
          </li>
          <li className="sideBarItem">
            <ChatIcon className="sideBarIcon" />
            <span className="sidebarIconText">Chats</span>
          </li>
          <li className="sideBarItem">
            <PlayCircleIcon className="sideBarIcon" />
            <span className="sidebarIconText">Videos</span>
          </li>
          <li className="sideBarItem">
            <GroupIcon className="sideBarIcon" />
            <span className="sidebarIconText">Groups</span>
          </li>
          <li className="sideBarItem">
            <BookmarkIcon className="sideBarIcon" />
            <span className="sidebarIconText">Bookmarks</span>
          </li>
          <li className="sideBarItem">
            <HelpOutlineIcon className="sideBarIcon" />
            <span className="sidebarIconText">Questions</span>
          </li>
          <li className="sideBarItem">
            <WorkIcon className="sideBarIcon" />
            <span className="sidebarIconText">Jobs</span>
          </li>
          <li className="sideBarItem">
            <EventIcon className="sideBarIcon" />
            <span className="sidebarIconText">Events</span>
          </li>
          <li className="sideBarItem">
            <SchoolIcon className="sideBarIcon" />
            <span className="sidebarIconText">Courses</span>
          </li>
        </ul>
        <button className="sideBarButton">Show More</button>
        <hr className="sideBarHr" />
        <ul className="sideBarFriendList">
          {Users.map((u) => (
            <Friends key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
