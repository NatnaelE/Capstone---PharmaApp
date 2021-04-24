import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { routes } from '../../constants/routes'
import queryString from 'query-string'
// import { useUserData } from '../../hooks/useRTD'

import { Container, Jumbotron, Row, Col, Button, Alert } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Tab, Nav } from 'react-bootstrap'

const Authenticator = ({ from }) => {
  let auth = useAuth()
  return auth.loading ? (
    <div>Please wait...</div>
  ) : !auth.user ? (
    <Switch>
      <Route path={routes.auth.signup} component={SignUpView} />
      <Route path={routes.auth.signin} component={SignInView} />
      <Route path={routes.auth.base}
        render={() => <Redirect to={{pathname: auth.signin}} />} />
    </Switch>
  ) : auth.onboarding? (
      <Redirect to={{pathname: routes.onboarding.base, state: {from: from}}} />
  ) : <Redirect to={{pathname: routes.pharmacist.dashboard, state: {from: from}}} />
}

const SignUpView = ({ location }) => {
  let params = queryString.parse(location.search)
  const [key, setKey] = useState(params.view || '')

  return <AuthContainer>
    <h1>Create Account</h1>
    <hr />
    <Form.Text>Join World's Pharmacy as a ...</Form.Text>
    <Tab.Container activeKey={key} onSelect={k => setKey(k)} >
      <Nav variant="pills" fill justify id="signTabs" className="my-3">
        <Nav.Item>
          <Nav.Link eventKey="patient">Patient</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="pharmacist">Pharmacist</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="patient">
          <Alert variant="warning">
            <Alert.Heading className="fs-1">Feature coming soon!</Alert.Heading>
            <p className="fs-0-9 mb-0">PharmaApp is still under development. Patient logins are next on our feature list</p>
          </Alert>
        </Tab.Pane>
        <Tab.Pane eventKey="pharmacist">
          <PharmacistSignUp />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>

    <Form.Text className="text-muted">
      Have an account already? <a href={routes.auth.signin}>Sign in</a>
    </Form.Text>
  </AuthContainer>
}

const PharmacistSignUp = () => {
  let auth = useAuth()
  const fieldData = [
    {
      key: 'name',
      type: 'text',
      label: 'Full Name',
      subText: 'What should we call you?',
      initial: ''
    }, {
      key: 'email',
      label: 'Email address',
      subText: `We'll never share your email with anyone else`,
      type: 'email',
      initial: ''
    }, {
      key: 'password',
      label: 'Password',
      subText: 'Enter a secure password (minimum 8 characters)',
      type: 'password',
      initial: ''
    }, {
      key: 'passwordConf',
      label: 'Confirm password',
      subText: 'Enter password again',
      type: 'password',
      initial: ''
    }
  ]

  return (
    <SignForm
      fieldData={fieldData}
      submit={values => {
        // const { name, email, password, passwordConf } = values
        if (values.password !== values.passwordConf) {
          console.error("Passwords must match")
        }
        auth.signUp(values.email, values.password, values.name)
        console.log("Signed up")
      }}
      submitText="Create Account" />
  )
}

const SignInView = () => {
  let auth = useAuth()
  const fieldData = [
    {
      key: 'email',
      label: 'Email address',
      subText: `Enter the email you used to sign up`,
      type: 'email',
      initial: ''
    }, {
      key: 'password',
      label: 'Password',
      subText: 'Enter password',
      type: 'password',
      initial: ''
    }
  ]

  return <AuthContainer>
    <h1>Log In</h1>
    <hr />
    <SignForm 
      fieldData={fieldData}
      submit={values => {
        const { email, password } = values
        auth.signIn(email, password)
        console.log("Signed in")
      }}
      submitText="Sign In"
    />
    <Form.Text className="text-muted">
      Need an account? <a href={routes.auth.signup}>Sign up</a>
    </Form.Text>
  </AuthContainer>
}

const SignForm = ({ fieldData, submit, submitText }) => {
  const [values, setState] = useState(
    Object.fromEntries( fieldData.map(d => [d.key, d.initial]) )
  )

  const handleSubmit = e => {
    e.preventDefault()
    submit(values)
  }

  const inputs = fieldData.map(d => {
    return <Form.Row key={d.key}>
      <Form.Group as={Col} >
        {/* <Form.Label>{d.label}</Form.Label> */}
        <Form.Control size="lg" name={d.key} value={values[d.key]} type={d.type} placeholder={d.label} onChange={e => {
          setState({ ...values, [e.target.name]: e.target.value })
        }} />
        <Form.Text className="text-muted">{d.subText}</Form.Text>
      </Form.Group>
    </Form.Row>
  })

  return <Form onSubmit={handleSubmit}>
    {inputs}
    <Form.Row>
      <Form.Group as={Col} className="d-flex">
        <Button type="submit" size="lg" variant="green" className="flex-grow-1">
          {submitText ? submitText : 'Submit'}</Button>
      </Form.Group>
    </Form.Row>
  </Form>
}

const AuthContainer = ({ children }) => {
  return (
    <Container fluid className="vh-100 pt-5 px-3 abstract-bg bg-img-cover">
      <Row className="h-100 pt-3 justify-content-center ">
        <Col xs={16} md={10} lg={8} xl={6} >
          <Jumbotron className="m-0 pt-4 pt-sm-5 pb-3">
            {children}
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  )
}

export default Authenticator