import React from 'react'
import {
  setDisplayName,
  compose
} from 'recompose'
import { Auth } from './'

const withAuth = WrappedComponent => props => (
  <WrappedComponent { ...props } auth={Auth} />
)

export default WrappedComponent => compose(
  setDisplayName('display_name-withAuth'),
  withAuth
)(WrappedComponent)