import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavTop from './components/NavTop'
import AuthView from '../auth/AuthView'
import LandingPage from './pages/Landing'
import SearchPage from './pages/Search'
import AboutPage from './pages/AboutUs'


const PatientApp = () => {
  return <div id="patientApp">
    <NavTop />
    <Switch>
      <Route path="/login" render={props => <AuthView from={props.location} />} />
      <Route path="/search" component={SearchPage}/>
      <Route path="/about" component={AboutPage} />
      <Route exact path="/" component={LandingPage} />
    </Switch>
  </div>
}

export default PatientApp