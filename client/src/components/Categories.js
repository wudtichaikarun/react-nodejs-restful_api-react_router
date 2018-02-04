import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Articles, NewArticle } from '../containers'

const Categories = () => (
  <Switch>
    <Route
      path='/categories/:categoryId/articles/new'
      component={NewArticle} />
    <Route
      path='/categories/:categoryId/articles'
      component={Articles} />
    <Route
      path='/categories/:categoryId'
      render={props => (
        <Redirect 
          to={`/categories/${props.match.params.categoryId}/articles`} />
      )} /> 
    
  </Switch>
) 

export default Categories