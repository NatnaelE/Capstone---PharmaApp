import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { Container, Jumbotron, Row, Col, Form, Button, Tab, Nav, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { routes } from '../../constants/routes'

const Onboarding = () => {
  let auth = useAuth()

  
  // if (auth.loading || !auth.userData) {
  //   console.log("Onboarding still loading")
  //   return <div>Loading ...</div>
  // }
  return auth.loading || !auth.userData ? (
    <div>Loading ...</div>
  ) : auth.userData.onboarding ? (
    <Switch>
      <Route path={routes.onboarding.stage1} component={Stage1} />
      <Route path={routes.onboarding.stage2} component={Stage2} />
      <Route path={routes.onboarding.done} component={OnboardDone} />
      <Route path={routes.onboarding.base}
        render={() => <Redirect to={{pathname: routes.onboarding.stage1}} />} />
    </Switch>
  ) : <Redirect to={{pathname: routes.pharmacist.dashboard}} />

  // return <OnboardingContainer>
  //   <div>Onboarding</div>
  // </OnboardingContainer>
}

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const Stage1 = () => {
  let auth = useAuth()
  let history = useHistory()
  const [key, setKey] = useState("patient")

  const submit = async (data) => {
    // await sleep(2000)
    await auth.addPharmacy(data)
      .then(resp => {
        console.log(resp)
        history.push(routes.onboarding.stage2)
      })
      .catch(err => console.error(err))
  }

  return (
    <OnboardingContainer>
      <h1>Account created</h1>
      <h5>We just need a few more things!</h5>
      <hr />
      <Form.Text className="fs-1">How do you want to add your pharmacy info?</Form.Text>
        <Tab.Container activeKey={key} onSelect={k => setKey(k)} >
          <Nav variant="pills" fill justify id="signTabs" className="my-3">
            <Nav.Item>
              <Nav.Link eventKey="patient">Add a Pharmacy</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="pharmacist">Join Existing</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="patient">
              <OnboardForm fieldData={fieldData1} submit={submit} submitText="Add Pharmacy" />
            </Tab.Pane>
            <Tab.Pane eventKey="pharmacist">
              <Alert variant="warning">
                <Alert.Heading className="fs-1">Feature coming soon!</Alert.Heading>
                <p className="fs-09 mb-0">PharmaApp is still under development. We're working on linking to existing pharmacies next!</p>
              </Alert>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      
    </OnboardingContainer>
  )
}

const Stage2 = () => {
  let auth = useAuth()
  let history = useHistory()

  const submit = async (data) => {
    await auth.updateProfile(data)
      .then(history.push(routes.onboarding.done))
    
  }

  return (
    <OnboardingContainer>
      <OnboardForm fieldData={fieldData2} submit={submit} submitText="Save and continue"/>
    </OnboardingContainer>
  )
}

const OnboardDone = () => {
  let auth = useAuth()
  let history = useHistory()

  const finishOnboard = () => {
    auth.stopOnboarding()
      .then(history.push(routes.pharmacist.dashboard))
  }

  return (
    <OnboardingContainer>
      <h1>Sign Up Complete!</h1>
      <p>You can edit your settings at any time</p>
      <Button onClick={finishOnboard}>Go to Dashboard</Button>
    </OnboardingContainer>
  )
}

const OnboardForm = ({ fieldData, submit, submitText }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault()
    console.log(data)
    await submit(data)
  }

  const inputs = fieldData.map(d => {
    return <Form.Row key={d.key}>
      <Form.Group as={Col} >
        <Form.Label>{d.label}</Form.Label>
        <Form.Control
          {...register(d.key, { ...d.rules })}
          size="lg"
          name={d.key}
          type={d.type}
          placeholder={d.placeholder}
        />
        { errors[d.key] && (
          <Form.Text className="text-warning">{errors[d.key].message}</Form.Text>
        )}
          {d.subtext.map(d => {
            return <Form.Text key={d} className="text-muted">{d}</Form.Text>
          })
        }
      </Form.Group>
    </Form.Row>
  })

  return <Form onSubmit={handleSubmit(onSubmit)}>
    {inputs}
    <Form.Row>
      <Form.Group as={Col} className="d-flex">
        <Button type="submit" disabled={isSubmitting}
          size="lg" variant="green" className="flex-grow-1">
          {submitText ? submitText : 'Submit'}</Button>
      </Form.Group>
    </Form.Row>
  </Form>
}

const OnboardingContainer = ({ children }) => {
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

const fieldData2 = [
  {
    key: 'img',
    type: 'text',
    label: 'Do you want to add a Profile Picture?',
    placeholder: 'Enter a URL to an image',
    subtext: [
      'Optional! You can skip this step and add an image later'
    ],
    initial: '',
    rules: {
      
    }
  },
]

const fieldData1 = [
  {
    key: 'pharmacyName',
    type: 'text',
    label: 'Pharmacy Name',
    placeholder: 'What is the name of your pharmacy?',
    subtext: [
      ''
    ],
    initial: '',
    rules: {
      required: 'We need a name for your pharmacy!'
    }
    
  }, {
    key: 'location',
    label: 'Address',
    placeholder: `Where is your pharmacy located?`,
    subtext: [
      'Allow nearby customers to find your pharamacy'
    ],
    type: 'text',
    initial: '',
    rules: {
      required: 'We need a location for your pharmacy!'
    }
  }, {
    key: 'password',
    label: 'Pharmacy Password',
    placeholder: 'Set a secure password for your pharmacy',
    subtext: [
      'We use this password to secure your pharmacy data',
      'Your employees will use this to join your pharmacy when they sign up!'
    ],
    type: 'password',
    initial: '',
    rules: {
      required: 'Required'
    }
  }
]

export default Onboarding