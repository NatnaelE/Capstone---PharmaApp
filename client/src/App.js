import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'

import PharmacistApp from './components/pharmacist/PharmacistApp'
import PatientApp from './components/patient/PatientApp'

import './styles/custom.scss';
import './styles/App.css';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/pharmacist" component={PharmacistApp} componentProps={{}} />
          <Route path="/" component={PatientApp} />
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
      render={(props) => auth.user ?
        <Component {...props} {...componentProps} /> :
        <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
