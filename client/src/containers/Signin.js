import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
 setPropTypes,
 withHandlers,
 compose 
} from 'recompose'
import { Auth } from '../lib'
import { AuthForm } from '../components'

const SigninContainer = ({
  onSubmit
}) => (
  <AuthForm
  formName='Signin'
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
      fetch('/sessions', {
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
)(SigninContainer)
