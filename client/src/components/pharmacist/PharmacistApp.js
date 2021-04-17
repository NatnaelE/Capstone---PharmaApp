import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Container, Jumbotron, Row, Col, Button } from 'react-bootstrap'

const PharmacistApp = () => {

  return (
    <Container fluid className="bg-light vh-100">
      <Row className="h-100">
        <Col xs={2} md={1} lg={4} xl={3} className="d-flex flex-column">
          <SideBar />
        </Col>
        <Col id="dashboardContent">
          <Switch>
            <Route path="/pharmacist/dashboard" component={Dashboard}/>
            <Route path="/pharmacist/inventory" component={Inventory}/>
            <Route path="/pharmacist/orders" component={Orders} />
            <Route path="/pharmacist/pharmacy" component={Pharmacy} />
            <Route exact path="/pharmacist"
              render={props => <Redirect to={{pathname: '/pharmacist/dashboard', state: {from: props.location}}} />} />
          </Switch>
        </Col>
      </Row>
    </Container>
  )
}

const SideBar = () => {
  let auth = useAuth()
  return <Jumbotron id="sideBar"
            className="bg-sky-blue text-light h-100 my-3 p-4" >
    <Row className="h-100 flex-column">
      <Col xs={"auto"} className="flex-grow-0">
        <h1 className="fw-200">PharmaApp</h1>
      </Col>
      <Col xs={5} className="my-3 d-flex flex-column justify-content-around">
        <a href="/pharmacist/dashboard"><h2>Dashboard</h2></a>
        <a href="/pharmacist/inventory"><h2>Inventory</h2></a>
        <a href="/pharmacist/orders"><h2>Orders</h2></a>
        <a href="/pharmacist/pharmacy"><h2>My Pharmacy</h2></a>
      </Col>
      <Col xs={"auto"} className="mt-auto d-flex flex-column">
        <a href="/" className=""><h3>Back to Home</h3></a>
        <hr />
        <Button variant="dark-red" className="mt-2" onClick={e => {
            e.preventDefault()
            auth.signOut()
          }}>Sign Out</Button>
      </Col>
    </Row>
    
  </Jumbotron>
}

const Inventory = () => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    <DashboardHeader title="Inventory Tracker"
      subtitle="View, add and update medications" />
  </Container>
}

const Orders = () => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    <DashboardHeader title="Orders"
      subtitle="View orders and history" />
  </Container>
}

const Pharmacy = () => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    <DashboardHeader title="My Pharmacy"
      subtitle="View or update your pharmacy's information" />
  </Container>
}

const Dashboard = () => {
  return <DashboardContent />
}

const DashboardContent = () => {
  return <Container fluid className="h-100 d-flex flex-column px-0">
    <DashboardHeader
      title="Dashboard" subtitle="Your pharmacy at a glance"/>

    <DashboardRow>
      <WidgetCol hasNeighbor>
        <DashboardRow>
          <WidgetCol>
            <WidgetContainer />
          </WidgetCol>
        </DashboardRow>
        <DashboardRow>
          <WidgetCol>
            <WidgetContainer />
          </WidgetCol>
        </DashboardRow>
      </WidgetCol>
      <WidgetCol xs={4} md={5} lg={6}>
        <WidgetContainer />
      </WidgetCol>
    </DashboardRow>

    <DashboardRow>
      <WidgetCol hasNeighbor>
        <WidgetContainer />
      </WidgetCol>
      <WidgetCol>
        <WidgetContainer />
      </WidgetCol>
    </DashboardRow>
  </Container>
}

const DashboardHeader = ({ title, subtitle }) => {
  let auth = useAuth()
  return <>
    <Row className="align-items-baseline mt-3">
      <Col xs={12} xl={"auto"}>
        <h1 className="fw-800 mb-1 mb-xl-2">{title ? title : 'Provide title'}</h1>
      </Col>
      <Col xs={12} xl={"auto"}>
        <h2 className="fw-200">{subtitle ? subtitle : 'Provide subtitle'}</h2>
      </Col>
    </Row>
  </>
}

const DashboardRow = ({children, css, ...rest}) => {
  return <Row {...rest}
    className={"flex-grow-1 " + (css ? css : '')}>{children}</Row>
}

const WidgetCol = ({children, css, hasNeighbor, ...rest}) => {
  const style =
    // {} 
    { paddingRight: hasNeighbor ? '0' : '15px' }
  return <Col {...rest} style={style}
    className={"d-flex flex-column " + (css ? css : '')}>{children}</Col>
}

const WidgetContainer = ({children, css, ...rest}) => {
  const style = { marginBottom: '15px' }
  // const style = {}
  return <Jumbotron {...rest} style={style}
    className={"h-100 p-3 " + (css ? css : '')}>{children}</Jumbotron>
}

export default PharmacistApp