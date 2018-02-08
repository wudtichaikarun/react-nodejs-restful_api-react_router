import React from 'react'
import PropTypes from 'prop-types'
import { numericString } from 'airbnb-prop-types'
import { withAuth, withAuthCheck } from '../lib'
import { ArticleForm } from '../components'
import {
 setPropTypes,
 withState,
 withProps,
 flattenProp,
 withHandlers,
 lifecycle,
 onlyUpdateForKeys,
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
  flattenProp('auth'),

  withAuthCheck,

  withState('article', 'setArticle', { title: '', content: ''}),

  withProps(props => ({ accessToken: props.auth.getToken() })),

  withHandlers({
    editArticle: ({
      history: { push },
      match: { params: {id} },
      accessToken
    }) => article => {
      fetch(`/articles/${id}`,{
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
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
  }),

  onlyUpdateForKeys(['accessToken', 'article'])

)(EditAtricleContainer)
