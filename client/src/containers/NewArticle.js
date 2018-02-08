import React from 'react'
import Proptype from 'prop-types'
import { numericString } from 'airbnb-prop-types'
import {
  setPropTypes,
  withHandlers,
  compose,
} from 'recompose'
import { Auth } from '../lib'
import ArticleForm from '../components/ArticleForm'

const NewArticleContainer = ({
  createArticle
}) => (
  <ArticleForm 
    formType='Create'
    onSubmit={createArticle} />
)

export default compose(
  setPropTypes({
    match: Proptype.shape({
      params: Proptype.shape({
        categoryId: numericString().isRequired
      }).isRequired
    }).isRequired
  }),

  withHandlers({
    createArticle: ({
      match: {params: { categoryId} },
      history: { push }
    }) => article => {
      fetch('/articles', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': Auth.getToken()
        },
        body: JSON.stringify({
          ...article, categoryId
        })
      })
      .then(res => res.json())
      .then(({ article: { id } }) => push(`/articles/${id}`)) 
    } 
  })
)(NewArticleContainer)
