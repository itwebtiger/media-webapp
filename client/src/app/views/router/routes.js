import React from 'react'

import Dashboard from 'views/pages/dashboard'
import SignIn from 'views/pages/sign-in'

export const otherwise = () => <h1>404</h1>

export default [
  {
    path: '/',
    exact: true,
    component: Dashboard
  },
  {
    path: '/sign-in',
    exact: true,
    component: SignIn
  }
]
