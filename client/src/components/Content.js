import React from 'react'
import { Route } from 'react-router-dom'
import { Home, Categories, Articles } from './'
import { Sidebar } from '../containers'

const Content = () => (
  <div className='row'>
    <Sidebar />
    <div className='col-7'>
      <Route exact path='/' component={Home} />
      <Route path='/categories' component={Categories} />
      <Route path='/articles' component={Articles} />
    </div>
  </div> 
)

export default Content