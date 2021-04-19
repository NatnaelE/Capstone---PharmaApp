import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import SideBar from './components/SideBar'
import { DashboardView, InventoryView, OrdersView, PharmacyView } from './views/AllViews'

const PharmacistApp = () => {
  return (
    <Container fluid className="bg-light vh-100">
      <Row className="h-100">
        {/* <Col xs={2} md={1} lg={4} xl={3} className="d-flex flex-column"> */}
        <Col xs={2} md={1} lg={"auto"} className="d-flex flex-column">
          <SideBar />
        </Col>
        <Col id="dashboardContent">
          <Switch>
            <Route path="/pharmacist/dashboard" component={DashboardView}/>
            <Route path="/pharmacist/inventory" component={InventoryView}/>
            <Route path="/pharmacist/orders" component={OrdersView} />
            <Route path="/pharmacist/pharmacy" component={PharmacyView} />
            <Route exact path="/pharmacist"
              render={props => <Redirect to={{pathname: '/pharmacist/dashboard', state: {from: props.location}}} />} />
          </Switch>
        </Col>
      </Row>
    </Container>
  )
}

export default PharmacistApp