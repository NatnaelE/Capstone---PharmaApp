import React, { useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import SideBar from './components/SideBar'
import { MobileSidebarBtn } from './components/DashUtils'
import { DashboardView, InventoryView, OrdersView, PharmacyView } from './views/AllViews'

const PharmacistApp = () => {
  const [toggled, setToggled] = useState(false)

  const openSidebar = e => {
    e.preventDefault()
    setToggled(true)
  }

  return (
    <Container fluid className={`bg-light vh-100 ${toggled ? 'toggled' : ''}`}>
      
      <Row className="h-100 flex-nowrap">
        <Col xs={"auto"} className="px-0">
          <SideBar toggled={toggled} handleToggle={value => setToggled(value)}/>
        </Col>
        <Col id="dashboardContent">
          <Row className="fixed-top w-100 justify-content-end">
                <Col>
                  <MobileSidebarBtn openSidebar={openSidebar} />
                </Col>
              </Row>
          <Switch>
            <Route path="/pharmacist/dashboard" component={DashboardView} />
            <Route path="/pharmacist/inventory" component={InventoryView} />
            <Route path="/pharmacist/orders" component={OrdersView} />
            <Route path="/pharmacist/pharmacy" component={PharmacyView} />
            <Route path="/pharmacist"
              render={props => <Redirect to={{pathname: '/pharmacist/dashboard', state: {from: props.location}}} />} />
          </Switch>
        </Col>
      </Row>
    </Container>
  )
}

export default PharmacistApp