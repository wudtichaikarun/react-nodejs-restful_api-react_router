import React from 'react'
import PropTypes from 'prop-types'
import { numericString } from 'airbnb-prop-types'
import { Auth } from '../lib'
import { 
  setPropTypes,
  withState,
  withHandlers,
  withProps,
  lifecycle,
  compose 
} from 'recompose'
import Link from 'react-router-dom/Link'

/*#############################
Stateless Functional Component
##############################*/
const ArticleContainer = ({
  id,
  article: { title, content },
  backToPreviousUrl
}) => (
  <div>
    <h2>{title}</h2>
    <p>{content}</p>
    <div className='btn-group'>
      <button
        className='btn btn-sm btn-primary'
        onClick={backToPreviousUrl}>
          Back
      </button>
      {
        Auth.getToken() && (
          <Link
            to={`/articles/${id}/edit`}
            className='btn btn-sm btn-secondary'>
              Edit
          </Link>
        )
      }
    </div>
  </div>
)

export default compose(

  setPropTypes({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: numericString().isRequired
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired
  }),

  withState('article', 'setArticle', { title: '', content: ''}),

  withProps(props => ({ id: props.match.params.id })),

  withHandlers({
    loadArticle: ({ id, setArticle }) => _ => {
      fetch(`/articles/${id}`)
        .then(res => res.json())
        .then(({ article }) => setArticle(article))
    },

    backToPreviousUrl: ({ history : { goBack }}) => _ => {
      goBack()
    }
  }),

  lifecycle({
    componentDidMount() {
      this.props.loadArticle()
    }
  })

)(ArticleContainer)


