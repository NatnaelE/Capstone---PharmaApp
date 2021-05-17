import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { SearchProvider } from '../../hooks/useSearch'

import NavTop from './components/NavTop'
import Authenticator from '../auth/Authenticator'
import PharmacistsPage from './pages/Pharmacists'
import LandingPage from './pages/Landing'
import SearchPage from './pages/Search'
import AboutPage from './pages/AboutUs'

import TestCloud from '../../dev/TestCloud'


const PatientApp = () => {
  return (
    <SearchProvider>
      <NavTop />
      <Switch>
        <Route path="/dev" component={TestCloud} />
        <Route path="/auth" render={props => <Authenticator from={props.location} id="patientApp" />} />
        <Route path="/pharmacists" component={PharmacistsPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/about" component={AboutPage} />
        <Route exact path="/" component={LandingPage} />
        <Route render={() => <Redirect to={{pathname: '/'}} />} />
      </Switch>
    </SearchProvider>
  )
}

export default PatientApp