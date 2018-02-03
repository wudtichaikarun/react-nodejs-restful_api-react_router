import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Home, Categories } from './'
import { Sidebar } from '../containers'

const Content = () => (
  <div className='row'>
    <Sidebar />
    <div className='col-7'>
      <Route path='/' component={Home} />
      <Route path='/categories/*' component={Categories} />
    </div>
  </div> 
)

Content.propTypes = {

}

Content.defaultProps = {

}

export default Content