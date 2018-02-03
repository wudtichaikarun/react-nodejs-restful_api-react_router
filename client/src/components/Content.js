import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Home } from './'
import { Sidebar } from '../containers'

const Content = () => (
  <div className='row'>
    <Sidebar />
    <div className='col-7'>
      <Route path='/' component={Home} />
    </div>
  </div> 
)

Content.propTypes = {

}

Content.defaultProps = {

}

export default Content