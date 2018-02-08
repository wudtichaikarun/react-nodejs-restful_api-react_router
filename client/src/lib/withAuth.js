import React from 'react'
import {
  compose
} from 'recompose'
import { Auth } from './'

const withAuth = WrappedComponent => props => (
  <WrappedComponent { ...props } auth={Auth} />
)

export default withAuth