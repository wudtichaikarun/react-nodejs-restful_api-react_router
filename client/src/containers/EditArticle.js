import React from 'react'
import PropTypes from 'prop-types'
import { numericString } from 'airbnb-prop-types'
import { withAuth, withAuthCheck } from '../lib'
import { ArticleForm } from '../components'
import {
 setPropTypes,
 withState,
 withHandlers,
 lifecycle,
 compose
} from 'recompose'

const EditAtricleContainer = ({
  article,
  editArticle
}) => (
  <ArticleForm
    { ...article }
    formType='Edit'
    onSubmit={ editArticle } />
)

export default compose(
  setPropTypes({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: numericString().isRequired
      }).isRequired
    }).isRequired
  }),

  withAuth,

  withAuthCheck,

  withState('article', 'setArticle', { title: '', content: ''}),

  withHandlers({
    editArticle: ({
      history: { push },
      match: { params: {id} },
      auth: { getToken }
    }) => article => {
      fetch(`/articles/${id}`,{
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': getToken()
        },
        body: JSON.stringify({
          ...article
        })
      })
      .then(res => res.json())
      .then(({ article: { id } }) => push(`/articles/${id}`))
    },

    loadArticle: ({
      match: { params: {id} },
      article,
      setArticle 
    }) => _ => {
      fetch(`/articles/${id}`)
      .then(res => res.json())
      .then(({ article }) => setArticle(article))
    }
  }),

  lifecycle({
    componentDidMount() {
      this.props.loadArticle()
    } 
  })

)(EditAtricleContainer)
