import React, { useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import SideBar from './components/SideBar'
import { MobileSidebarBtn } from './components/DashUtils'
import { DashboardView, InventoryView, OrdersView, PharmacyView, SettingsView } from './views/AllViews'

import { routes } from '../../constants/routes'

const PharmacistApp = () => {
  const [toggled, setToggled] = useState(false)

  const openSidebar = e => {
    e.preventDefault()
    setToggled(true)
  }

  return (
    <Container fluid className={`bg-light vh-100 ${toggled ? 'toggled' : ''}  abstract-bg-2 bg-img-cover`}>
      
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
            <Route path={routes.pharmacist.dashboard} component={DashboardView} />
            <Route path={routes.pharmacist.inventory} component={InventoryView} />
            <Route path={routes.pharmacist.orders} component={OrdersView} />
            <Route path={routes.pharmacist.pharmacy} component={PharmacyView} />
            <Route path={routes.pharmacist.settings} component={SettingsView} />
            <Route path={routes.pharmacist.base}
              render={() => <Redirect to={routes.pharmacist.dashboard} />} />
          </Switch>
        </Col>
      </Row>
    </Container>
  )
}

export default PharmacistApp