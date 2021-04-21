import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'

import PharmacistApp from './components/pharmacist/PharmacistApp'
import PatientApp from './components/patient/PatientApp'

import { routes } from './constants/routes'

import './styles/custom.scss';
import './styles/App.css';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute path={routes.pharmacist.base} component={PharmacistApp} componentProps={{}} />
          <Route path={routes.landing} component={PatientApp} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

// PrivateRoute for pharmacist app that requires app
const PrivateRoute = ({component: Component, componentProps, ...rest}) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => auth.loading ?
        <div>Loading...</div> :
        auth.user ?
        <Component {...props} {...componentProps} /> :
        <Redirect to={{pathname: routes.auth.signin, state: {from: props.location}}} />}
    />
  )
}
