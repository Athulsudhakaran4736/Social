import React from 'react'

export default function Friends({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
           <li className='sideBarFriendListItem'>
                <img src={PF+user.profilePicture} alt='friendlist' className='sideBarFriendImg'/>
                <span className='sideBarFriendListText'>{user.username}</span>
            </li>
    </div>
  )
}
