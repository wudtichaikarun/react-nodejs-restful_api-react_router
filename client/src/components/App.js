import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from './'

const App = () => (
  <div className="container">
    <Route path='/' component={Home} />
  </div>
)

export default App
