import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({currentUser}) => {
  return (
    <div className='bg-gray-600 py-3 sm:px-20 px-5'>
      <div className='flex justify-between items-center text-white max-w-6xl m-auto'>
        <h1 className='font-semibold text-2'>AUTH</h1>
        <ul className='flex flex-row gap-5 sm:gap-10'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About Us</Link></li>
          {
            currentUser.username? <li><Link to='/profile'><img className='rounded-full w-6 h-6 object-cover' src={currentUser.profilePicture} alt=""/></Link></li> : <li><Link to='/sign-in'>Sign in</Link></li>
          }

        </ul>
      </div>
    </div>
  )
}

export default Header
