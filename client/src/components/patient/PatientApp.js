import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import NavTop from './components/NavTop'
import Authenticator from '../auth/Authenticator'
import PharmacistsPage from './pages/Pharmacists'
import LandingPage from './pages/Landing'
import SearchPage from './pages/Search'
import AboutPage from './pages/AboutUs'


const PatientApp = () => {
  return <div id="patientApp">
    <NavTop />
    <Switch>
      <Route path="/auth" render={props => <Authenticator from={props.location} />} />
      <Route path="/pharmacists" component={PharmacistsPage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/about" component={AboutPage} />
      <Route exact path="/" component={LandingPage} />
      <Route render={props => <Redirect to={{pathname: '/'}} />} />
    </Switch>
  </div>
}

export default PatientApp