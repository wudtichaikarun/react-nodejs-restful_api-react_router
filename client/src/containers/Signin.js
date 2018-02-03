import React, { Component } from 'react'
import { AuthForm } from '../components'

class SigninContainer extends Component {
  handleFormSubmit = credential => {
    fetch('/sessions',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credential)
    })
  }
  render() {
    return(
      <AuthForm
        formName='Signin'
        onSubmit={this.handleFormSubmit} />
    )
  }
}

export default SigninContainer