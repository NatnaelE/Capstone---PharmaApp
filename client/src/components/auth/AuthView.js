import React from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

import { Container, Jumbotron, Button } from 'react-bootstrap'

const Authenticator = ({ from }) => {
  let auth = useAuth()

  console.log(!auth.user)

  return !auth.user ?
  (
    <AuthContent signIn={auth.signIn} />
  ) : <Redirect to={{pathname: '/pharmacist', state: {from: from}}} />
}

const AuthContent = ({ signIn }) => {
  return (
    <Container fluid className="vh-100 pt-5 px-3 abstract-bg bg-img-cover">
      <Jumbotron className="mt-4">
        <h1>Sign In / Sign Up Page</h1>
        <Button variant="ultra-blue" size=""
          onClick={e => {
            e.preventDefault()
            signIn()
        }}>Sign In</Button>
      </Jumbotron>
      
    </Container>
  )
}

export default Authenticator