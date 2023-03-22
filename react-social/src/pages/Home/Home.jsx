import React from 'react';
import SideBar from '../../components/sidebar/SideBar';
import TopBar from '../../components/topbar/TopBar';
import RightBar from '../../components/rightbar/RightBar';
import Feed from '../../components/feed/Feed';
import './home.css';

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
}
