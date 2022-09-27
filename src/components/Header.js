import React, {useState} from 'react'
import "./header.css"

const Header = () => {
  const [username ]= useState(localStorage.getItem('username'))
  return (
    <div className='header'>
      <h2 className='headerTitle'>The Recipe Box</h2>
      <p className='loggedInState'>{username ? `Hi, ${username}`: "Hi"}</p>
      <p className='logout-Btn'>logout</p>

    </div>
  )
}

export default Header