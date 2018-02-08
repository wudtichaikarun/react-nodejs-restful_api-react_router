import React from 'react'
import PropTypes from 'prop-types'
import {
 setPropTypes,
 withHandlers,
 compose 
} from 'recompose'
import { Auth } from '../lib'
import { AuthForm } from '../components'

const SignupContainer = ({
  onSubmit
}) => (
  <AuthForm
  formName='Signup'
  onSubmit={onSubmit}/>
)

export default compose(
  setPropTypes({
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired
  }),

  withHandlers({
    onSubmit: ({ history: { goBack } }) => credential => {
      fetch('/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credential)
      })
        .then(({headers}) => Auth.setToken(headers))
        .then(() => goBack())
    }
  })
)(SignupContainer)
