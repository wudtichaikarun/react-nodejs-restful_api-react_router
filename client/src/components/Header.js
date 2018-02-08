import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import {
  setPropTypes,
  withHandlers,
  branch,
  renderComponent,
  compose
} from 'recompose'
import { Auth } from '../lib'

const Nav = ({children}) => (
  <nav className='navbar navbar-toggleable-md navbar-light bg-faded md-3'>
    { children }
  </nav> 
)

const UserManu = ({logout}) => (
  <Nav>
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <a 
          href='#' 
          className='nav-link' 
          onClick={logout}>Logout</a>
      </li>
    </ul>
  </Nav>

)

const GuestManu = () => (
  <Nav>
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <Link to='/sign-in' className='nav-link'>Login</Link>
      </li>
      <li className='nav-item'>
        <Link to='/sign-up' className='nav-link'>Register</Link>
      </li>
    </ul>
  </Nav>
)

export default compose(
  withRouter,

  setPropTypes({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }),

  withHandlers({
    logout: ({
      history: { push }
    }) => _ => {
      Auth.removeToken()
      push('/')
    }
  }),

  branch(
    _ => Auth.getToken(),
    renderComponent(UserManu),
    renderComponent(GuestManu)
  )

)()