import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Container, Jumbotron, Row, Col } from 'react-bootstrap'

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
      {/* <Route path={routes.onboarding.stage2} component={SignInView} /> */}
      <Route path={routes.onboarding.base}
        render={() => <Redirect to={{pathname: routes.onboarding.stage1}} />} />
    </Switch>
  ) : <Redirect to={{pathname: routes.pharmacist.dashboard}} />

  // return <OnboardingContainer>
  //   <div>Onboarding</div>
  // </OnboardingContainer>
}

const Stage1 = () => {

  return (
    <OnboardingContainer>
      <div>Onboarding S1</div>
    </OnboardingContainer>
  )
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

export default Onboarding