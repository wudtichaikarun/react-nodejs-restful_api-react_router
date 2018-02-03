import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className='navbar navbar-toggleable-md navbar-light bg-faded md-3'>
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <Link to='/sign-in' className='nav-link'>Login</Link>
      </li>
      <li className='nav-item'>
        <Link to='/sign-up' className='nav-link'>Register</Link>
      </li>
    </ul>
  </nav>
)

export default Header